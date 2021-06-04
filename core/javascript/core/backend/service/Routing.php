<?php
namespace core\backend\service;
use core\backend\helper\VariableHelper;
use core\backend\model\RequestParameters;
use core\backend\model\RequestResultException;
use core\backend\interfaces\IRestInterface;
use Error;
use Exception;
use JetBrains\PhpStorm\NoReturn;
use JetBrains\PhpStorm\Pure;

/**
 * Class Routing a request alapján az útvonal ellenőrzését, betöltését és meghívását valósítja meg
 * SINGLETON class
 * @package backend
 */
final class Routing
{
    /**
     * @var Routing|null a Routing egyke példánya
     */
    private static ?Routing $instance = null;

    /**
     * @var bool engedélyezett-e a CORS policy
     */
    private bool $cors;

    /**
     * @var RestParent a requestfeldolgozó a request alapján
     */
    private IRestInterface $rest;

    /**
     * @var array a felvett útvonalak
     */
    private array $routes = array();

    /**
     * @var string|null CORS engedélyezett küldők
     */
    private ?string $allowedOrigin;

    /**
     * @var string|null CORS engedélyezett fejléc tipusok
     */
    private ?string $allowedHeaders;

    /**
     * @var RequestParameters requestből származó paraméterek
     */
    private RequestParameters $reqestParameters;

    /**
     * visszadja a Routing egyke példányát, ha nem létezik létrehozza
     * @return Routing|null a példány
     */
    public static function getInstance() :?Routing
    {
        if (self::$instance == null) {
            self::$instance = new Routing();
        }
        return self::$instance;
    }

    #[Pure] private function __construct()
    {
        $this->cors = false;
        $this->reqestParameters=new RequestParameters();
    }

    /**
     * menti a requestfeldolgozót
     * lekéri belőle a lehetséges Routokat tömbösen és átadja felvételre
     * @param RestParent $rest a RequestFeldolgozó -> a request első paramétere
     */
    public function addRoutes(IRestInterface $rest)
    {
        $this->rest = $rest;
        $routes = $this->rest->getRoutes();
        foreach ($routes as $value)
        {
            $this->addRoute(...$value);
        }

    }

    /**
     * hozzáadja a routerhez a megadott útvonalat
     * @param string $httpMethod request tipusa - get/post/put/delete
     * @param string $url - a request url-je pl: user/$1
     * @param string $task  - a meghívandó függvény
     * @param bool $authRequired - kell e authentikáció - default false
     * @param bool $isJson - a requestben van-e json fejléc/adat
     */
    private function addRoute(string $httpMethod, string $url, string $task, bool $authRequired=false,
                              bool $isJson = true, bool $responsIsJson = true)
    {
        array_push($this->routes, array(
            "http_method" => $httpMethod,
            "url" => $url,
            "task" => $task,
            "auth_required" => $authRequired,
            'is_json' => $isJson,
            'response_is_json'=>$responsIsJson
        ));
    }

    /**
     * CORS policy beállítása/engedélyezése
     * @param string $allowedOrigin engedélyezett küldők
     * @param string $allowedHeader engedélyezett fejléc típusok
     */
    public function setCors(string $allowedOrigin, string $allowedHeader)
    {
        $this->cors = true;
        $this->allowedOrigin = $allowedOrigin;
        $this->allowedHeaders = $allowedHeader;
    }

    /**
     * megállapítja hogy a megadott adatokkal létezik-e route a Routerben
     * url paramétereket átadja
     * @param $httpMethod - a http method
     * @param $url - a kért url
     * @return bool az url route létezik-e
     * @example GET /user/admin/ => /user/$1/
     */
    private function identifyHeader($httpMethod, $url,$path): bool
    {
        if ($_SERVER['REQUEST_METHOD'] !== strtoupper($httpMethod) && ($this->cors === false || $_SERVER['REQUEST_METHOD'] !== 'OPTIONS')) {
            return false;
        }
        $url = explode('/', $url);
        if (count($path) !== count($url)) {
            return false;
        }
        $length = count($path);
        for ($i = 0; $i < $length; $i++) {
            if ($path[$i] !== $url[$i]) {
                if (preg_match('/\$([0-9]+?)/', $url[$i]) !== 1) {
                    $this->reqestParameters->reset();
                    return false;
                }
                $this->reqestParameters->addUrlParameter(filter_var($path[$i],FILTER_SANITIZE_STRING));
            }
        }
        return true;
    }

    /**
     * a request alapján megkeresi a megfelelő route-ot, össszeszedi a request paramétereket, és elküldi feldolgozásra a kérést
     * @return bool ha hiba van vagy nem jó a route visszaad egy bool-t, egyébként meghívja a route-ban található függvényt
     */
    public function processRoutingRequest(array $urlTarget): bool {
        $supportedHeaders = array();
        foreach ($this->routes as $route)
        {
            if ($this->identifyHeader($route['http_method'], $route['url'],$urlTarget)) {

                if ($this->cors == true && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
                    array_push($supportedHeaders, strtoupper($route['http_method']));
                } else {
                    if ($route['is_json'] && isset($_SERVER['CONTENT_TYPE']) && str_contains($_SERVER['CONTENT_TYPE'], 'application/json')) {
                        if ($_SERVER['REQUEST_METHOD'] == 'PUT')
                        {
                            $putvars=[];
                            parse_str(file_get_contents("php://input"),$putvars);
                            $this->reqestParameters->setRequestData($putvars);
                        }
                        else
                            $this->reqestParameters->setRequestData(VariableHelper::convertStdClassToArray(json_decode(file_get_contents('php://input'))));
                    }
                    if ($this->cors === true) {
                        header('Acces-Control-Allow-Origin:', $this->allowedOrigin);
                    }
                    if ($route['auth_required'] === true)
                    {
                        $this->rest->authenticateUser();
                    }
                    $task = $route['task'];
                    try {
                        $this->rest->$task($this->reqestParameters);
                    }
                    catch (RequestResultException $e)
                    {
                        [$code, $data] = $e->getResult();
                        $this->sendResponse($code, $data, $route['response_is_json']);
                    }
                    catch (Exception $e)
                    {
                        $this->sendResponse(500, $e->getMessage(), $route['response_is_json']);

                    }
                    catch (Error $e)
                    {
                        $this->sendResponse(500, $e->getMessage(), $route['response_is_json']);
                    }
                    return true;
                }
            }
        }
        if ($this->cors) {
            header('Acces-Control-Allow-Origin:', $this->allowedOrigin);
            header('Acces-Control-Allow-Headers:', $this->allowedHeaders);
            header('Acces-Control-Allow-Methods:', implode(',', $supportedHeaders) . ',OPTIONS');
            header($_SERVER['SERVER_PROTOCOL'].' 500');
            echo ('NO MATCHING ROOT FOUND');
            return true;
        }
        return false;
    }

    /**
     * html response-t állít össze és küld el
     * @param int $httpCode http response kód
     * @param mixed $data a response adat
     * @param bool $responseIsJSon ha true az adatot json-né alakítja
     */
    #[NoReturn] private function sendResponse(int $httpCode, mixed $data, bool $responseIsJSon)
    {
        header($_SERVER['SERVER_PROTOCOL'].' '.$httpCode);
        if ($responseIsJSon === true)
        {
            header('Content-Type: application/json');
            echo json_encode($data);
//            echo json_encode([$data,debug_backtrace()]);
        }
        else
            echo $data;
        die();
    }
}
