<?php


namespace core\backend\helper;

use core\backend\interfaces\IConvertableToArrayInterface;
use stdClass;

class VariableHelper
{
    /**
     * strClass-t asszocitiv tömbbé alakít
     * @param stdClass $class átalakítandó class
     * @return array az asszociativ  tömb
     */
    public static function convertStdClassToArray(stdClass $class): array
    {
        return json_decode(json_encode($class), true);
    }

    public static function convertClassToArray(?IConvertableToArrayInterface $class)
    {
        if ($class === null) return '';
        return $class->getAlldata();
    }

    public static function sumDump($input)
    {
        echo '<pre>';print_r($input);echo '</pre>';
    }

    public static function sumDumpWithLine($input)
    {
        $trace = debug_backtrace();
        $caller = $trace[0];
        echo '<pre>';
        print_r($caller["file"]);
        print_r("<br/>");
        print_r($caller["line"]);
        print_r("<br/>");
        print_r($input);
        print_r("<br/>");
        echo '</pre>';
    }
}
