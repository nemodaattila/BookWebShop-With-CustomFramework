<?php

namespace core\backend\service;

use core\backend\model\RequestParameters;
use core\backend\model\WebPageConfig;
use core\frontend\service\JavaScriptInitiator;
use core\frontend\service\ViewHandler;

/**
 * Class WebPageGenerator egy weboldal összeállíátásért felelős osztály, összegyüjti az összes projekthez szükséges fájlt
 * megjeleníti a view-t,betölti a css-t, beálítástól függően sedédfájlokat tölt be, javascript műveleteket is elindít
 * @package core\backend\service
 */
class WebPageGenerator
{
    /**
     * az oldal amit be kell tölteni
     * pl.: www.localhost:/index/3 -> index
     * @var string oldalnév
     */
    private string $pageToLoad;

    /**
     * @var array betöltendő stílusfájlok tömbe (string)
     */
    private array $styleFiles = [];

    /**
     * @var RequestParameters a request paraméterei
     */
    private RequestParameters $requestParameters;

    /**
     * @var ViewHandler|null a view-ot megvalósító szolgáltatás
     */
    private ?ViewHandler $viewHandler;

    public function __construct(RequestParameters $requestParameters)
    {
        $this->requestParameters = $requestParameters;
        $this->pageToLoad = $requestParameters->getUrlParameters()[0];
        $this->loadProjectConfigFiles();
        $this->processAdditionsBasedOnPageConfig();
    }

    /**
     * a projekt konfig fájlokból betölti a beállításokat |
     * globális: project\config\webPageConfig.php |
     * oldalra vonatkozó: project\frontend\pages\<oldalNév>\config.php')
     * nem kötelezőek
     */
    private function loadProjectConfigFiles(): void
    {
        require_once 'project\config\webPageConfig.php';
        if (file_exists('project\frontend\pages\\' . $this->pageToLoad . '\config.php'))
            require_once 'project\frontend\pages\\' . $this->pageToLoad . '\config.php';
    }

    /**
     * WebPageConfig egyke objektum beállításai alapján, betölt és elindít szokgáltatásokat
     * pl: session, javascript, view
     */
    private function processAdditionsBasedOnPageConfig(): void
    {
        $config = WebPageConfig::getInstance();
        $this->loadSessionHelper($config->isSessionEnabled());
        $this->loadViewHandler($config->isSessionEnabled(), $config->getLayout());

        $this->initiateJavaScript($config->isJavaScriptEnabled(), $config->isAjaxEnabled(), $config->isPassRequestParametersToJs());
        $this->loadPageStructure();
    }

    /**
     * session elindítása, ha szükséges
     * @param bool $enabled engedélyezett e
     */
    private function loadSessionHelper(bool $enabled): void
    {
        if ($enabled === true)
            SessionHandler::sessionStart();
    }

    /**
     * ha engedélyezett elindítja a JS kezelő szolgálltatást
     * @param bool $jsEnabled engedélyezett a js
     * @param bool $ajaxEnabled engedélyezett e az ajax
     * @param bool $passParams átadja e a request paramétereket a js-nek
     */
    private function initiateJavaScript(bool $jsEnabled, bool $ajaxEnabled, bool $passParams): void
    {
        $params = null;
        if ($passParams === true)
            $params = $this->requestParameters;
        if ($jsEnabled === true) {
            $jsC = new JavaScriptInitiator($this->pageToLoad, $params);
            $jsC->prepare();
            $jsC->loadAjaxFiles($ajaxEnabled);
            $jsC->passParamsToJS($passParams);
            $jsC->initJSCore();
        }
    }

    /**
     * style és főcontroller betöltése (ha van beckend oldali MVC)
     */
    private function loadPageStructure(): void
    {
        $this->loadStyle();
        $this->loadMainPHPController();
        $this->viewHandler->render($this->pageToLoad, 'pages');
    }

    /**
     * style fileok betöltése |
     * globálisan: project\frontend\globals\style\style.css |
     * és oldalszinten: project\frontend\pages\<oldalNév>\style.css
     * nem kötelezőek
     */
    private function loadStyle(): void
    {
        if (file_exists('project\frontend\globals\style\style.css')) {
            $this->styleFiles[] = 'project\frontend\globals\style\style.css';
        }
        if (file_exists('project\frontend\pages\\' . $this->pageToLoad . "\style.css")) {
            $this->styleFiles[] = 'project\frontend\pages\\' . $this->pageToLoad . "\style.css";
        }
        $this->viewHandler->setStyleFiles($this->styleFiles);
    }

    /**
     * a viewKezelő betöltése
     * @param bool $isSessionEnabled engedélyezett e a session
     * @param string $layout a betöltendő layout neve
     */
    private function loadViewHandler(bool $isSessionEnabled, string $layout = 'default')
    {
        $this->viewHandler = ViewHandler::getInstance();
        $this->viewHandler->setSessionEnabled($isSessionEnabled);
        $this->viewHandler->setLayout($layout);
    }

    /**
     * main controller betöltése - project\frontend\pages\<oldalNév>\main.php |
     * nem kötelező
     */
    private function loadMainPHPController()
    {
        if (file_exists('project\frontend\pages\\' . $this->pageToLoad . "\main.php")) {
            require_once 'project\frontend\pages\\' . $this->pageToLoad . "\main.php";
        }
    }

}
