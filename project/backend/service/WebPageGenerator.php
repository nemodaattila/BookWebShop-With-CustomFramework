<?php


namespace project\backend\service;


use core\backend\model\RequestParameters;
use core\backend\model\WebPageConfig;
use core\backend\service\SessionHandler;
use core\frontend\service\JavaScriptInitiator;
use core\frontend\service\ViewHandler;

class WebPageGenerator
{
    private string $pageToLoad;
    private array $styleFiles = [];
    private RequestParameters $requestParameters;
    private ?ViewHandler $viewHandler;
    /**
     * webPageGenerator constructor.
     */
    public function __construct(RequestParameters $requestParameters)
    {
        $this->requestParameters=$requestParameters;
        $this->pageToLoad=$requestParameters->getUrlParameters()[0];
        $this->loadProjectConfigFiles();
        $this->processAdditionsBasedOnPageConfig();

    }

    private function loadProjectConfigFiles(): void                        //konfigurációs fájlok behívása
    {
        require_once 'project\config\webPageConfig.php';
        if (file_exists('project\frontend\pages\\'.$this->pageToLoad.'\config.php'))
            require_once 'project\frontend\pages\\'.$this->pageToLoad.'\config.php';
    }

    private function processAdditionsBasedOnPageConfig(): void
    {
        $config = WebPageConfig::getInstance();
        $this->loadSessionHelper($config->isSessionEnabled());
        $this->loadViewHandler($config->isSessionEnabled(),$config->getLayout());

        $this->initiateJavaScript($config->isJavaScriptEnabled(),$config->isAjaxEnabled(), $config->isPassRequestParametersToJs());
        $this->loadPageStructure();
//        $this->loadDataBaseFiles();
    }

    private function loadSessionHelper(bool $enabled): void
    {
        if ($enabled === true)
            SessionHandler::sessionStart();
    }

    private function initiateJavaScript(bool $jsEnabled, bool $ajaxEnabled, bool $passParams): void
    {
        $params=null;
        if ($passParams === true)
            $params = $this->requestParameters;
        if ($jsEnabled === true)
        {
            $jsC=new JavaScriptInitiator($this->pageToLoad, $params);
            $jsC->prepare();
            $jsC->loadAjaxFiles($ajaxEnabled);
            $jsC->passParamsToJS($passParams);
            $jsC->initJSCore();
        }
//        if ((defined("JSENABLED"))&&(JSENABLED===true))
//        {
//            require_once(COREMODEL.'/JavaScriptInitiatorModel.php');
//            require_once(CORECONTROLLER.'/JavaScriptInitiatorController.php');
//
//            $javascriptInitiatorModel = new JavaScriptInitiatorModel();
//            $this->javascriptInitiatorController = new JavaScriptInitiatorController($javascriptInitiatorModel);
//            $this->javascriptInitiatorController->setJSCoreProperties($this->webPageModel->getTargetUrl());
//            if ((defined("PASSREQUESTPARAMSTOJS"))&&(PASSREQUESTPARAMSTOJS===true))
//            {
//                $this->javascriptInitiatorController->passRequestParameters($this->webPageModel->getRequestData());
//            }
//        }
    }

    private function loadPageStructure(): void
    {
        $this->loadStyle();
        $this->loadMainPHP();
        $this->viewHandler->render([$this->pageToLoad],'pages');
//        $this->loadJS();

    }

    private function loadStyle(): void
    {
        if(file_exists('project\frontend\globals\style\style.css'))
        {
            $this->styleFiles[]='project\frontend\globals\style\style.css';
//            ?>
<!--            <link rel="stylesheet" type="text/css" href='--><?php //echo "./pages/shared/frontend/style/style.css"?><!--' />-->
<!--            --><?php
        }
        if (file_exists('project\frontend\pages\\'.$this->pageToLoad."\style.css"))
        {
            $this->styleFiles[]='project\frontend\pages\\'.$this->pageToLoad."\style.css";
//            ?>
<!--            <link rel="stylesheet" type="text/css" href='--><?php //echo $pagePath."/style.css"?><!--' />-->
<!--            --><?php
        }
        $this->viewHandler->setStyleFiles($this->styleFiles);
    }

    private function loadViewHandler(bool $isSessionEnabled, string $layout='default')
    {
        $this->viewHandler = ViewHandler::getInstance();
        $this->viewHandler->setSessionEnabled($isSessionEnabled);
        $this->viewHandler->setLayout($layout);
    }

    private function loadMainPHP()
    {
        if (file_exists('project\frontend\pages\\'.$this->pageToLoad."\main.php"))
        {
            require_once 'project\frontend\pages\\'.$this->pageToLoad."\main.php";
        }
    }

}
