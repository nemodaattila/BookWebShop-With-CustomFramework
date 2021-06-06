<?php

namespace core\frontend\service;

/**
 * Class ViewHandler
 * @package frontend
 * a MVC modell View-jának kezelésére szolgáló SINGLETON class
 */
class ViewHandler
{

    /**
     * A Viewkezelohoz Singleton
     * a ViewHandler egyke pédánya
     */
    private static ?ViewHandler $instance = NULL;

    /**
     * Az adott layout neve, amit rendereleskor hasznalunk majd
     * @var string $layout
     */
    private string $layout = 'default';

    /**
     * változók amit a view-nak át akarunk adni
     * @var array $variables
     */
    private array $variables = array();

    /**
     * A jelenlegi view, ami megadja hogy melyik nezet lesz az aktualis
     * @var ?string $actualView
     */
    private ?string $actualView = null;

    /**
     * Pufferert tartalom minden nezetreszhez
     * @var array $viewContents
     */
    private array $viewContents = array();

    /**
     * @var bool engedélyezett e a session
     */
    private bool $sessionEnabled;

    /**
     * @var array betöltendő stílusfájlok
     */
    private array $styleFiles = [];

    public function getStyleFiles(): string
    {
        return implode('<br/>', $this->styleFiles);
    }

    public function setStyleFiles(array $styleFiles): void
    {
        foreach ($styleFiles as $value) {
            $this->styleFiles[] = '<link rel="stylesheet" type="text/css" href=' . ROOTURL . '/' . $value . '>';
        }
    }

    public function getSessionEnabled()
    {
        return $this->sessionEnabled;
    }

    public function setSessionEnabled($sessionEnabled): void
    {
        $this->sessionEnabled = $sessionEnabled;
    }

    public function __construct($sessionEnabled = false)
    {
        $this->sessionEnabled = $sessionEnabled;
        ob_start();
    }

    /**
     * vissza adja a ViewHandler példányát, ha nincs létrehoz egyet
     * @return ViewHandler
     */
    public static function getInstance(): ViewHandler
    {
        if (self::$instance === NULL) {
            self::$instance = new ViewHandler();
        }
        return self::$instance;
    }

    /**
     * Beallitja a layoutot, amit a renderelesnel hasznalni fogunk
     * @param string $layout A hasznalni kivant layoyt
     * @return void
     */
    public function setLayout(string $layout)
    {
        $this->layout = $layout;
    }

    /**
     * view beolvasása
     * két helyen kereshet:
     * project/frontend/view/<path>.php/html
     * vagy
     * project/frontend/pages/<$path>/view.php/html
     * @param string $pageName betöltendő oldal neve
     * @param string $pathRoot view fájlok gyökérkönyvtára projekt/frontend-ben
     */
    public function render(string $pageName, string $pathRoot = 'view')
    {

        if (file_exists('project\frontend\\' . $pathRoot . '\\' . $pageName . "\\view.php")) {
            require_once 'project\frontend\\' . $pathRoot . '\\' . $pageName . "\\view.php";
        } else
            if (file_exists('project\frontend\\' . $pathRoot . '\\' . $pageName . ".php")) {
                require_once 'project\frontend\\' . $pathRoot . '\\' . $pageName . ".php";
            } else
                if (file_exists('project\frontend\\' . $pathRoot . '\\' . $pageName . "\\view.html")) {
                    require_once 'project\frontend\\' . $pathRoot . '\\' . $pageName . "\\view.html";
                } else
                    if (file_exists('project\frontend\\' . $pathRoot . '\\' . $pageName . ".html")) {
                        require_once 'project\frontend\\' . $pathRoot . '\\' . $pageName . ".html";
                    }
        $this->renderLayout($pathRoot);
    }
//
//    /**
//     * visszaadja a view megadott változóit
//     * @param array $variables a kért változók listája
//     * @return array a kért értékek
//     */
//    public function getVariableArray(array $variables): array
//    {
//        $result=[];
//        foreach ($variables as $name) {
//            $result[]=$this->getVariable($name);
//        }
//        return $result;
//    }

    /**
     * A beallitott ertekek lekerese
     * Ha a valtozo a munkamenetben van tarolva, akkor azt toroljuk
     * @param string $name A valtozo neve
     * @param mixed|null $default A valtozo erteke amit visszaadunk ha a valtozo nem letezik
     * @return mixed A valtozo erteke
     */
    public function getVariable(string $name, mixed $default = null): mixed
    {
        if (!isset($this->variables[$name])) {
            if (isset($_SESSION['viewhandler_variables']) && isset($_SESSION['viewhandler_variables'][$name])) {
                $ertek = $_SESSION['viewhandler_variables'][$name];
                unset($_SESSION['viewhandler_variables'][$name]);
                return $ertek;
            }
            return $default;
        }
        return $this->variables[$name];
    }

    /**
     * A megadott layout renderelese
     * @param string $pathRoot view fájlok gyökérkönyvtára projekt/frontend-ben
     */
    private function renderLayout(string $pathRoot)
    {
        $this->newView("layout");
        if (file_exists('project\frontend\\' . $pathRoot . '\layout\\' . $this->layout . ".php")) {
            require_once 'project\frontend\\' . $pathRoot . '\layout\\' . $this->layout . ".php";
        } else
            if (file_exists('project\frontend\\' . $pathRoot . '\layout\\' . $this->layout . "view.html")) {
                require_once 'project\frontend\\' . $pathRoot . '\layout\\' . $this->layout . "view.html";
            }
        ob_flush();
    }

    /**
     * A valtozas elott le kell tarolni az outputot. Abban az esetben fogjuk meghivni ha az adott nezet vagy nezetresz megvaltozik
     * @param string $name Nezetresz neve
     */
    public function newView(string $name)
    {
        $this->actualView = $name;
        $this->saveActualView();
    }

    /**
     * A nezetet mentjuk a kimeneti pufferbol az adott nezetreszhez
     * Muvelet vegen a puffert toroljuk
     */
    private function saveActualView()
    {
        $this->viewContents[$this->actualView] .= ob_get_contents();
        ob_clean();
    }

    /**
     * A sessionbe mentettüzenet lekérése
     * @return array|null Az uzenet és a typus
     */
    public function getMessageSession(): ?array
    {
        if ($this->sessionEnabled === true) {
            $message = ($this->getVariable('_messageencoded') === true) ? json_decode($this->getVariable('_message')) : $this->getVariable('_message');
            if ($message !== null) {
                $type = $this->getVariable('_messagetype');
                unset($_SESSION['_messagetype']);
                unset($_SESSION['_messageencoded']);
                unset($_SESSION['_message']);
                return ['message' => $message, "type" => $type];
            }
        }
        return null;
    }

    /**
     * visszaadja a mentett view-t
     */
    public function getView(): string
    {
        return $this->viewContents[$this->actualView];
    }
//
//    /**
//     * 302-es atiranyitas
//     * @param string $controller A controller neve
//     * @param string $action A muvelet neve
//     * @param array $parameters Opcionalisan parameterek (pl.: querystringek)
//     */
//    public function redirect(string $controller='category', string $action='readlimited', array $parameters = [])
//    {
//        $params = (!empty($parameters)?'/'.implode('/',$parameters):'');
//        header("Location: ".FRONTENDURL.$controller.'/'.$action.$params);
//        die();
//    }
//
//    /**
//     * sessionbe rak bármilyen értéket, ha tömb json_encode
//     * @param mixed $message az átadandó érték
//     * @param string $type az üzenet típusa success/error
//     */
//    public function setMessageSession($message, string $type = 'success')
//    {
//        $encoded = false;
//        if (isset($message['errorMessage'])) $type = 'error';
//        if (gettype($message === 'array')) {
//            if ($type === 'error') {
//                $message = json_encode($message['errorMessage']);
//                $encoded = true;
//            }
//            if ($type === 'success') {
//                $message = json_encode($message['successMessage']);
//                $encoded = true;
//            }
//        }
//        $this->setVariable('_messageencoded', $encoded, true);
//        $this->setVariable('_message', $message, true);
//        $this->setVariable('_messagetype', $type, true);
//    }
//
//    /**
//     * Egy 302-es atiranyitas arrra az oldalra amelyiken a user elozoleg volt a request elott
//     */
//    public function backToReferer()
//    {
//        if (isset($_SERVER['HTTP_REFERER'])) {
//            header("Location: " . $_SERVER['HTTP_REFERER']);
//        }
//        else
//            $this->redirect();
//    }
}
