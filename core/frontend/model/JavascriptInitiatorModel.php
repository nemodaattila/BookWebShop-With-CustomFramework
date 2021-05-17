<?php


namespace core\frontend\model;


use core\backend\helper\VariableHelper;
use core\backend\interfaces\IConvertableToArrayInterface;
use core\backend\model\RequestParameters;

class JavascriptInitiatorModel implements IConvertableToArrayInterface
{
    private array $filesToLoad =[];

    private string $root;

    public function __construct()
    {
        $this->root = ROOTURL;
    }

    /**
     * @return array
     */
    public function getFilesToLoad(): array
    {
        return $this->filesToLoad;
    }

    private array $modulLoader;

    private string $page;

    private array $initiator;

    private ?RequestParameters $requestParameters=null;

    /**
     * @return RequestParameters
     */
    public function getRequestParameters(): ?RequestParameters
    {
        return $this->requestParameters;
    }

    /**
     * @param RequestParameters $requestParameters
     */
    public function setRequestParameters(RequestParameters $requestParameters): void
    {
        $this->requestParameters = $requestParameters;
    }

    /**
     * @return array
     */
    public function getInitiator(): array
    {
        return $this->initiator;
    }

    /**
     * @param array $initiator
     */
    public function setInitiator(array $initiator): void
    {
        $this->initiator = $initiator;
    }

    /**
     * @return string
     */
    public function getPage(): string
    {
        return $this->page;
    }

    /**
     * @param string $page
     */
    public function setPage(string $page): void
    {
        $this->page = $page;
    }

    /**
     * @return array
     */
    public function getModulLoader(): array
    {
        return $this->modulLoader;
    }

    /**
     * @param array $modulLoader
     */
    public function setModulLoader(array $modulLoader): void
    {
        $this->modulLoader = $modulLoader;
    }

    public function addFilesToLoad(array $files)
    {
        $this->filesToLoad= array_merge($this->filesToLoad, $files);
    }

    public function getAllData(): array
    {
        $variables = get_object_vars($this);
        unset($variables['filesToLoad']);
        $variables['requestParameters']=VariableHelper::convertClassToArray($this->getRequestParameters());
        return $variables;
    }
}
