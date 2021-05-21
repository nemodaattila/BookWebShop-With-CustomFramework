<?php


namespace core\backend\database\QueryProcessor\simple;


use PDO;

class SimplePDOProcessorParent
{
    protected PDO $pdo;

    /**
     * @var string a sql lekérdezés stringje
     */
    protected string $command;

    /**
     * @var array a lekéérdezés paraméterei
     */
    protected array $queryValues=[];

    /**
     * a lekérdezés megadása egyszerű string formában
     * @param string az sql lekérdezés
     */
    public function setCommand(string $command)
    {
        $this->command = $command;
    }

    /**
     * visszadja a beállíitott query stringet
     * @return string  a query string
     */
    public function getCommand(): string
    {
        return $this->command;
    }

    /**
     * @param mixed $values a lekérdezés paramétereinek
     */
    public function setvalues($values)
    {
        if (!is_array($values)) $values = [$values];
        $this->queryValues = $values;
    }

    /**
     * visszaadja a beállított értékeket a lekérdezéshez
     * @return array az értékek tömbje
     */
    public function getValues(): array
    {
        return $this->queryValues;
    }

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function execute()
    {
        $query = $this->pdo->prepare($this->getCommand());
        $success = $query->execute($this->getValues());
        if ($success === false)
        {
            throw new RequestResultException(500, ['errorcode'=>'PDOSSSF', 'errorMessage'=>$this->getCommand()]);
        }
        return $success;
    }
}
