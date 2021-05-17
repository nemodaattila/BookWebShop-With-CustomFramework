<?php


namespace core\frontend\service;


use core\backend\helper\VariableHelper;
use core\backend\model\RequestParameters;
use core\backend\helper\DirectoryHelper;
use core\frontend\model\JavascriptInitiatorModel;

class JavaScriptInitiator
{
    private ?RequestParameters $requestParameters=null;

    private JavascriptInitiatorModel $model;



    /**
     * JavaScriptInitiator constructor.
     */
    public function __construct(string $pageToLoad, ?RequestParameters $params=null)
    {
        $this->requestParameters=$params;
        $this->model = new JavascriptInitiatorModel();
        $this->model->setPage($pageToLoad);
    }

    public function prepare()
    {
        $this->model->addFilesToLoad(DirectoryHelper::getFileList(ROOT.'/core/javascript/core/',true));
//        $this->model->setHelperScripts(Dir::getFileList(HELPERSCRIPT, ['withPath' => false, 'excludedFiles' => ['AjaxCaller.js']]));

        $this->searchForModulLoadersInSourceCode();
        $this->searchForInitiatortsInSourceCode();
    }

    private function searchForModulLoadersInSourceCode()
    {

        $this->model->setModulLoader([
            file_exists(ROOT.'project/javascript/modulloader/modulloader.js'),
            file_exists(ROOT.'/project/frontend/pages/'.$this->model->getPage()."/modulloader.js")
        ]);
    }

    private function searchForInitiatortsInSourceCode()
    {
        $this->model->setInitiator([
            file_exists(ROOT.'project/javascript//initiator/initiator.js'),
            file_exists(ROOT.'/project/frontend/pages/'.$this->model->getPage()."/initiator.js")]);
    }


    public function loadAjaxFiles(bool $enabled)
    {
        if ($enabled === true) {
            $this->model->addFilesToLoad([ROOTURL.'/core/javascript/helper/AjaxCaller.js']);
        }
    }

    public function passParamsToJS(bool $passParams)
    {
        if ($passParams === true)
        {
            $this->model->setRequestParameters($this->requestParameters);
        }
    }

    public function initJSCore()
    {
        $corefiles = $this->model->getFilesToLoad();
        foreach ($corefiles as $value)
        {
            ?>
            <script type="text/javascript" src="<?php echo $value; ?>"></script>
            <?php
        }
        $JSData = VariableHelper::convertClassToArray($this->model);
        ?>
        <script>
            let JSModel = new JSCoreModel(<?php echo json_encode($JSData)?>);
            let JSCore = new JSCoreController();
            JSCore.model=JSModel;
            JSCore.initCore();
        </script>
        <?php
    }
}
