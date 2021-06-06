<?php

namespace core\frontend\service;

use core\backend\helper\VariableHelper;
use core\backend\model\RequestParameters;
use core\backend\helper\DirectoryHelper;
use core\frontend\model\JavascriptInitiatorModel;

/**
 * Class JavaScriptInitiator kötelező JavaScript fájlok összegyüjtéséért , és betöltéséért felelős osztály
 * @package core\frontend\service
 */
class JavaScriptInitiator
{
    /**
     * @var RequestParameters|null http request paraméterek
     */
    private ?RequestParameters $requestParameters;

    /**
     * @var JavascriptInitiatorModel adat és konfigurációs modell
     */
    private JavascriptInitiatorModel $model;

    public function __construct(string $pageToLoad, ?RequestParameters $params = null)
    {
        $this->requestParameters = $params;
        $this->model = new JavascriptInitiatorModel();
        $this->model->setPage($pageToLoad);
    }

    /**
     * Javascript fájlok feltéréképezése
     */
    public function prepare()
    {
        $this->model->addFilesToLoad(DirectoryHelper::getFileList(ROOT . '/core/javascript/core/', true));
        $this->searchForModulLoadersInSourceCode();
        $this->searchForInitiatortsInSourceCode();
    }

    /**
     * modulLoader JS fájlok keresése (ezek a fájlok tartalmazzák, hogy melyik további jsavascript fájlokat kell betölteni)
     */
    private function searchForModulLoadersInSourceCode()
    {
        $this->model->setModulLoader([
            file_exists(ROOT . 'project/javascript/modulloader/modulloader.js'),
            file_exists(ROOT . '/project/frontend/pages/' . $this->model->getPage() . "/modulloader.js")
        ]);
    }

    /**
     * initiator JS fájlok betöltése (ezek a fájlok tartalmazzák a modeulloaderben felsorolt fájlhoz tartozó
     * inicializációs és értékadó műveleteket)
     */
    private function searchForInitiatortsInSourceCode()
    {
        $this->model->setInitiator([
            file_exists(ROOT . 'project/javascript//initiator/initiator.js'),
            file_exists(ROOT . '/project/frontend/pages/' . $this->model->getPage() . "/initiator.js")]);
    }

    /**
     * betölti az ajax/Httprrequest fájlt , ha engedélyezett
     * @param bool $enabled betöltse e
     */
    public function loadAjaxFiles(bool $enabled)
    {
        if ($enabled === true) {
            $this->model->addFilesToLoad([ROOTURL . '/core/javascript/helper/AjaxCaller.js']);
        }
    }

    /**
     * átadja a JS-nek a http request paramétereket, ha engetélyezett
     * @param bool $passParams átadja -.e
     */
    public function passParamsToJS(bool $passParams)
    {
        if ($passParams === true) {
            $this->model->setRequestParameters($this->requestParameters);
        }
    }

    /**
     * betöltendő JS fájlokat betölti (hozzáadja a script tag-et a html-kódhoz)
     * elindít a kliensoldali JS motort
     */
    public function initJSCore()
    {
        $corefiles = $this->model->getFilesToLoad();
        foreach ($corefiles as $value) {
            ?>
            <script type="text/javascript" src="<?php echo $value; ?>"></script>
            <?php
        }
        $JSData = VariableHelper::convertObjectToArray($this->model);
        ?>
        <script>
            let JSModel = new JSCoreModel(<?php echo json_encode($JSData)?>);
            let JSCore = new JSCoreController();
            JSCore.model = JSModel;
            JSCore.initCore();
        </script>
        <?php
    }
}
