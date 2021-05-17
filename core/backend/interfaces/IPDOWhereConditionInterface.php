<?php


namespace core\backend\interfaces;


interface IPDOWhereConditionInterface
{
    public function getQueryString(): string;
}
