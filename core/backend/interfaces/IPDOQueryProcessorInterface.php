<?php


namespace core\backend\interfaces;



use core\backend\database\querySource\PDOQueryDataSource;

interface IPDOQueryProcessorInterface
{
    public function setSource(PDOQueryDataSource $source): void;

}
