<?php


namespace core\backend\model;


class WebPageConfig
{
    private static ?WebPageConfig $instance=null;

    public static function getInstance(): WebPageConfig
    {
        if (self::$instance === NULL) {
            self::$instance = new WebPageConfig();
        }
        return self::$instance;
    }

    private string $layout = 'default';

    /**
     * @return string
     */
    public function getLayout(): string
    {
        return $this->layout;
    }

    /**
     * @param string $layout
     */
    public function setLayout(string $layout): void
    {
        $this->layout = $layout;
    }

    /**
     * @var bool betötse e javascript-tel kapcsolatos fájlokat
     */
    private bool $javaScriptEnabled = false;

    /**
     * @var bool ha van javascript, betötlse e a javascript ajax kezelőt
     */
    private bool $ajaxEnabled = false;

    /**
     * @var bool ha van javascript átadja e a request paramétereket
     */
    private bool $passRequestParametersToJs = false;

    /**
     * @var bool engedélyezett e a sessionkezelés
     */
    private bool $sessionEnabled = false;

    /**
     * @var bool engedélyezett e a adatbáziskezelés
     */
    private bool $dataBaseEnabled = false;

    /**
     * @var string db kezelő tipusa
     */
    private string $dataBaseType = 'PDO';


    /**
     * @return bool
     */
    public function isDataBaseEnabled(): bool
    {
        return $this->dataBaseEnabled;
    }

    /**
     * @param bool $dataBaseEnabled
     */
    public function setDataBaseEnabled(bool $dataBaseEnabled): void
    {
        $this->dataBaseEnabled = $dataBaseEnabled;
    }

    /**
     * @return string
     */
    public function getDataBaseType(): string
    {
        return $this->dataBaseType;
    }

    /**
     * @param string $dataBaseType
     */
    public function setDataBaseType(string $dataBaseType): void
    {
        $this->dataBaseType = $dataBaseType;
    }



    /**
     * @return bool
     */
    public function isJavaScriptEnabled(): bool
    {
        return $this->javaScriptEnabled;
    }

    /**
     * @param bool $javaScriptEnabled
     */
    public function setJavaScriptEnabled(bool $javaScriptEnabled): void
    {
        $this->javaScriptEnabled = $javaScriptEnabled;
    }

    /**
     * @return bool
     */
    public function isAjaxEnabled(): bool
    {
        return $this->ajaxEnabled;
    }

    /**
     * @param bool $ajaxEnabled
     */
    public function setAjaxEnabled(bool $ajaxEnabled): void
    {
        $this->ajaxEnabled = $ajaxEnabled;
    }

    /**
     * @return bool
     */
    public function isSessionEnabled(): bool
    {
        return $this->sessionEnabled;
    }

    /**
     * @param bool $sessionEnabled
     */
    public function setSessionEnabled(bool $sessionEnabled): void
    {
        $this->sessionEnabled = $sessionEnabled;
    }

    /**
     * @return bool
     */
    public function isPassRequestParametersToJs(): bool
    {
        return $this->passRequestParametersToJs;
    }

    /**
     * @param bool $passRequestParametersToJs
     */
    public function setPassRequestParametersToJs(bool $passRequestParametersToJs): void
    {
        $this->passRequestParametersToJs = $passRequestParametersToJs;
    }


}
