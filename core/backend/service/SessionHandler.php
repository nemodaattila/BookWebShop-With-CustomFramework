<?php


namespace core\backend\service;


class SessionHandler
{
    static public function set($name,$value)    //session érték beállítása
    {
        if (!isset($_SESSION[$name])){
            $_SESSION[$name]=$value;
            return $value;
        }
        return null;
    }

    static public function get($name)           //session érték lekérdezése
    {
        if (isset($_SESSION[$name])) return $_SESSION[$name];
        return null;
    }

    static public function deleteValue($name) :bool              //session érték törlés
    {
        if (isset($_SESSION[$name]))
        {
            unset($_SESSION[$name]);
            return true;
        }
        else return false;
    }

    static public function setArrayValue($name1,$name2,$value)      //session tömb érték létrehozása
    {
        if (isset($_SESSION[$name1]))
        {
            $_SESSION[$name1][$name2]=$value;
            return $value;
        }
        return null;
    }

    static public function getArrayValue($name1,$name2)                 //session tömb érték lekérdezése
    {
        if (isset($_SESSION[$name1][$name2])) return $_SESSION[$name1][$name2];
        return null;
    }

    static public function deleteArrayValue($name1,$name2) : bool            //session tömb érték törlése
    {
        if (isset($_SESSION[$name1][$name2]))
        {
            unset($_SESSION[$name1][$name2]);
            return true;
        }
        else return false;
    }

    static public function sessionStart(): bool
    {
        if (!isset($_SESSION))                              //session indítása
        {
            return session_start();
        }
        return false;
    }

    static public function sessionStop(): bool
    {
        return session_unset() && session_destroy();
    }

}
