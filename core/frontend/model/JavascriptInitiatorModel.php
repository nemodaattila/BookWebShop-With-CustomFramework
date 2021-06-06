<?php

namespace core\frontend\model;

use core\backend\helper\VariableHelper;
use core\backend\interfaces\IConvertableToArrayInterface;
use core\backend\model\RequestParameters;

/**
 * Class JavascriptInitiatorModel a JavaScript betöltő motor konfigurációját, betöltendő fájlok neveit tartalmazza
 * @package core\frontend\model
 */
class JavascriptInitiatorModel implements IConvertableToArrayInterface
{

    /**
     * @var array azokat a fájlokat tartalmazza amiket a JS-nek majd be kell töltenie
     */
    private array $filesToLoad = [];

    /**
     * @var string a projekt url-je
     */
    private string $root;

    public function __construct()
    {
        $this->root = ROOTURL;
    }

    public function getFilesToLoad(): array
    {
        return $this->filesToLoad;
    }

    /**
     * @var array léteznek e azok a fájlok amelyek a betöltendő JS fájlokat listázzák
     * globális/ oldal [<bool>,<bool>]
     */
    private array $modulLoader;

    /**
     * @var string az oldal neve | pl. index
     */
    private string $page;

    /**
     * @var array léteznek e azok a fájlok melyek JS inicialiációs utasításokat tartalmaznak
     * globális/ oldal [<bool>,<bool>]
     */
    private array $initiator;

    /**
     * @var RequestParameters|null requestből származó paraméterek
     */
    private ?RequestParameters $requestParameters = null;

    public function getRequestParameters(): ?RequestParameters
    {
        return $this->requestParameters;
    }

    public function setRequestParameters(RequestParameters $requestParameters): void
    {
        $this->requestParameters = $requestParameters;
    }

    public function getInitiator(): array
    {
        return $this->initiator;
    }

    public function setInitiator(array $initiator): void
    {
        $this->initiator = $initiator;
    }

    public function getPage(): string
    {
        return $this->page;
    }

    public function setPage(string $page): void
    {
        $this->page = $page;
    }

    public function getModulLoader(): array
    {
        return $this->modulLoader;
    }

    public function setModulLoader(array $modulLoader): void
    {
        $this->modulLoader = $modulLoader;
    }

    public function addFilesToLoad(array $files)
    {
        $this->filesToLoad = array_merge($this->filesToLoad, $files);
    }

    /**
     * összes adat visszadása (kivéve filesToLoad)
     * @return array objekt mint asszociativ tömb
     */
    public function getAllData(): array
    {
        $variables = get_object_vars($this);
        unset($variables['filesToLoad']);
        $variables['requestParameters'] = VariableHelper::convertObjectToArray($this->getRequestParameters());
        return $variables;
    }
}
