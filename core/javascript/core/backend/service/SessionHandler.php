<?php

namespace core\backend\service;

/**
 * Class SessionHandler segédosztály session kezeléséhez
 * @package core\backend\service
 */
class SessionHandler
{
    /**
     * egy Session paraméter beállítása
     * @param string $name a session változó beve
     * @param mixed $value a session változó értéke
     * @return mixed a beállított érték
     */
    static public function set(string $name, mixed $value): mixed
    {
        $_SESSION[$name]=$value;
        return $_SESSION[$name];
    }

    /**
     * @param string $name egy Session paraméter kiolvasása
     * @return mixed a kiolvasott paraméter értéke
     */
    static public function get(string $name)  : mixed
    {
        if (isset($_SESSION[$name])) return $_SESSION[$name];
        return null;
    }

    /**
     * egy session paraméter törlése
     * @param string $name paraméter neve
     * @return bool false, ha a paraméter nem létezik, true ha törlődött
     */
    static public function deleteValue(string $name) :bool
    {
        if (isset($_SESSION[$name]))
        {
            unset($_SESSION[$name]);
            return true;
        }
        else return false;
    }

    /**
     * egy Session paraméter beállítása tömbben
     * @param string $arrayName a tömb paraméter neve
     * @param string $indexName a indexnév
     * @param mixed $value a beállítandó érték
     * @return mixed
     */
    static public function setArrayValue(string $arrayName, string $indexName, mixed $value): mixed
    {
        if (!isset($_SESSION[$arrayName]))
            $_SESSION[$arrayName]=[];
        $_SESSION[$arrayName][$indexName]=$value;
        return  $_SESSION[$arrayName][$indexName];
    }

    /**
     * visszaad egy értéket egy sessionben található tömbből
     * @param string $arrayName az array neve
     * @param string $indexName az index neve
     * @return mixed a kért érték
     */
    static public function getArrayValue(string $arrayName, string $indexName): mixed
    {
        if (isset($_SESSION[$arrayName][$indexName])) return $_SESSION[$arrayName][$indexName];
        return null;
    }

    /**
     * egy érték törlése egy SESSION tömbből
     * @param string $arrayName a session tömb neve
     * @param string $indexName az index neve
     * @return bool sikerült e a törlés
     */
    static public function deleteArrayValue(string $arrayName, string $indexName) : bool
    {
        if (isset($_SESSION[$arrayName][$indexName]))
        {
            unset($_SESSION[$arrayName][$indexName]);
            return true;
        }
        else return false;
    }

    /**
     * session elindítása
     * @return bool sikerült e elínditani a sessiont
     */
    static public function sessionStart(): bool
    {
        if (!isset($_SESSION))
        {
            return session_start();
        }
        return false;
    }

    /**
     * session leállítása
     * @return bool sikerült-e
     */
    static public function sessionStop(): bool
    {
        return session_unset() && session_destroy();
    }

}
