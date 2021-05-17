<?php


namespace core\backend\database\QueryProcessor\simple;


use backend\RequestResultException;
use PDO;

class SimpleSelectPDOProcessor extends SimplePDOProcessorParent
{

    /**
     * @var string hogyan fetcheljük a query eredményét - egyelőre fetch és fetchAll
     */
    protected string $fetchType = 'fetchAll';

    /**
     * @var int a query fetchelés módja
     */
    protected int $fetchMode=PDO::FETCH_ASSOC;

    public function getFetchType(): string
    {
        return $this->fetchType;
    }

    public function getFetchMode(): int
    {
        return $this->fetchMode;
    }

    /** beállitja hogyan adja vissza az eredményt a query
     * @param string $fetchType feth vagy fetchAll
     * @throws RequestResultException ha a $fetchType nem nem fetxh vagy fetchall
     */
    public function setFetchType(string $fetchType): void
    {
        if (!in_array($fetchType,['fetch','fetchAll']))
            throw new RequestResultException(400, ['errorCode'=>'PDOFTBT']);
        $this->fetchType = $fetchType;
    }

    /**
     * beállítja a fetchelés módját
     * @param int $fetchMode
     */
    public function setFetchMode(int $fetchMode): void
    {
        $this->fetchMode = $fetchMode;
    }

    /**
     * @return mixed a select lekérezés végrehajtása
     */
    public function execute()
    {
        $query = $this->pdo->prepare($this->getCommand());
        $success = $query->execute($this->getValues());
        if ($success === false)
        {
            throw new RequestResultException(500, ['errorcode'=>'PDOSSSF', 'errorMessage'=>$this->getCommand()]);
        }
        $rt = $this->getFetchType();
        return $query->$rt($this->getFetchMode());
    }
}
