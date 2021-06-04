<?php

namespace core\backend\model;

use core\backend\service\WebPageGenerator;

/**
 * Class WebPageConfig weboldal betöltéséhez, megjelenítéséhez szükséges fájlokneveket, adatokat tároló segédosztály
 * @package core\backend\model
 * @see WebPageGenerator
 */
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

    /**
     * @var string megjelenítendő layout view
     */
    private string $layout = 'default';

    public function getLayout(): string
    {
        return $this->layout;
    }

    public function setLayout(string $layout): void
    {
        $this->layout = $layout;
    }

    /**
     * @var bool betötse e javascript-tel kapcsolatos fájlokat
     */
    private bool $javaScriptEnabled = false;

    /**
     * @var bool ha van javascript, betöltse e a javascript ajax/httprequest kezelőt kezelőt
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


    public function isDataBaseEnabled(): bool
    {
        return $this->dataBaseEnabled;
    }

    public function setDataBaseEnabled(bool $dataBaseEnabled): void
    {
        $this->dataBaseEnabled = $dataBaseEnabled;
    }

    public function getDataBaseType(): string
    {
        return $this->dataBaseType;
    }

    public function setDataBaseType(string $dataBaseType): void
    {
        $this->dataBaseType = $dataBaseType;
    }

    public function isJavaScriptEnabled(): bool
    {
        return $this->javaScriptEnabled;
    }

    public function setJavaScriptEnabled(bool $javaScriptEnabled): void
    {
        $this->javaScriptEnabled = $javaScriptEnabled;
    }

    public function isAjaxEnabled(): bool
    {
        return $this->ajaxEnabled;
    }

    public function setAjaxEnabled(bool $ajaxEnabled): void
    {
        $this->ajaxEnabled = $ajaxEnabled;
    }

    public function isSessionEnabled(): bool
    {
        return $this->sessionEnabled;
    }

    public function setSessionEnabled(bool $sessionEnabled): void
    {
        $this->sessionEnabled = $sessionEnabled;
    }

    public function isPassRequestParametersToJs(): bool
    {
        return $this->passRequestParametersToJs;
    }

    public function setPassRequestParametersToJs(bool $passRequestParametersToJs): void
    {
        $this->passRequestParametersToJs = $passRequestParametersToJs;
    }


}
