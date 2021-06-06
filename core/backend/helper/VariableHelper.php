<?php

namespace core\backend\helper;

use core\backend\interfaces\IConvertableToArrayInterface;
use stdClass;

/**
 * Class VariableHelper változókkal kapcsolatos segédfüggvények
 * @package core\backend\helper
 */
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

    /**
     * megfelelő tipusú objekt tömbbé alakít
     * @param IConvertableToArrayInterface|null $class az átalakítandó tömb
     * @return array a tömbösített objekt
     */
    public static function convertObjectToArray(?IConvertableToArrayInterface $class): array
    {
        if ($class === null) return [];
        return $class->getAlldata();
    }

    /**
     *
     * @param mixed $input komplex változó kiiratása
     */
    public static function sumDump(mixed $input)
    {
        echo '<pre>';
        print_r($input);
        echo '</pre>';
    }

    /**
     * @param mixed $input komplex változók kiiratása + tartalmazó fájl neve és sora
     */
    public static function sumDumpWithLine(mixed $input)
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
