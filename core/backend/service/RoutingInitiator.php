<?php

namespace core\backend\service;

use Exception;

/**
 * Class RoutingInitiator megvizsgálja a requestet, megkeresi a hozzás tartozó restet, létrehozza
 * és elindítja a routert
 * @package core\backend\service
 */
class RoutingInitiator
{
    /**
     * @var RoutingInitiator|null $instance a RequestHandler egyke példánya
     */
    private static ?RoutingInitiator $instance = null;

    /**
     * @var array a request alapján megállapitott meghívandó requestkezelő és paraméterei
     */
    private array $target = [];

    /**
     * @var array|string[] ha nincs megadva paraméter ez töltődik be
     */
    private array $defaultTarget = ['loadPage', 'index'];

    /**
     * a RequestHandler egyke példányát adja vissza
     * @return RoutingInitiator a requestHandler példány
     */
    public static function getInstance(): RoutingInitiator
    {
        if (self::$instance === NULL) {
            self::$instance = new RoutingInitiator();
        }
        return self::$instance;
    }

    /**
     * elindítja a request elemzést
     */
    public function run()
    {
        $this->analyzeRequest();
        $this->initRouter();
    }

    /**
     * a megvizsgált request (target) alapján betölti a requestkezelőt
     * betölti a Routert - az első paraméterből
     * meghívja a route validitás ellenőrzését
     *  ha valid volt, feldolgozza
     *  ha nem hiba response-t küld
     */
    private function initRouter()
    {
        try {
            $rest = ucfirst($this->target[0]);
            $rest = $this->restExists($rest);
            $rest = new $rest();
            $routing = Routing::getInstance();
            $routing->addRoutes($rest);
            $routing->setCors("*", "origin, content-type, accept, authorization");
            $routing = $routing->processRoutingRequest($this->target);
            if (!$routing) {
                header($_SERVER['SERVER_PROTOCOL'] . ' 400 Hiba');
                header("Content-Type: application/json");
                echo json_encode(array("errorCode" => 'ROUTER_NOT_FOUND'));
                die();
            }
        } catch (Exception $e) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Vegzetes hiba');
            die(json_encode($e->getMessage()));
        }
    }

    /**
     * ellenőrzi hogy a http paraméterekhez tartozik e REST feldolgozó
     * @param string $restName a rest feldolgozó neve
     * @return string rest feldolgozó osztály neve
     * @throws Exception ha a rest feldolgozó nem létezik
     */
    private function restExists(string $restName): string
    {
        if ($restName === "LoadPage") {
            $rest = 'core\backend\rest\\' . $restName . 'Rest';
        } else
            $rest = 'project\backend\rest\\' . $restName . 'Rest';
        if (!file_exists(ROOT . '\\' . $rest . '.php')) {
            throw new Exception('requesthandler ' . $restName . 'Rest not exists');
        }
        return $rest;
    }

    /**
     * megvizsgálja a requestet, és összeszedi az elinditandó függvény url paramétereit (a célt)
     */
    private function analyzeRequest()
    {
        $separator = $_SERVER['REQUEST_URI'][0];
        $urlStripper = str_replace($_SERVER['CONTEXT_DOCUMENT_ROOT'], "", ROOT);
        $request = explode($separator, (str_replace($urlStripper, "", $_SERVER['REQUEST_URI'])));
        foreach ($request as $value) {
            if ($value !== '') {
                $this->target[] = $value;
            }
        }
        if (empty($this->target)) $this->target = $this->defaultTarget;
    }
}
