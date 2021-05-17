<?php


namespace core\backend\database\queryProcessor\complex;


use core\backend\database\querySource\PDOQueryDataSource;
use core\backend\interfaces\IPDOQueryProcessorInterface;
use PDO;

class   PDOQueryProcessorParent implements IPDOQueryProcessorInterface
{
    protected PDOQueryDataSource $source;

    protected PDO $pdo;


    public function __construct(PDO $pdo)
    {
        $this->pdo=$pdo;
    }
    public function setSource(PDOQueryDataSource $source): void
    {
        $this->source = $source;
    }

    public function getQueryString(): string
    {
        // TODO: Implement getQueryString() method.
    }
}
