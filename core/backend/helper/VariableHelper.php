<?php


namespace core\backend\helper;

use core\backend\interfaces\ConvertableToArrayInterface;

class VariableHelper
{

    public static function convertClassToArray(ConvertableToArrayInterface $class)
    {
        return $class->getAlldata();
    }
}
