<?php


namespace core\backend\database\querySource;


use core\backend\database\queryProcessor\complex\PDOQueryProcessorParent;
use core\backend\interfaces\IPDOQueryProcessorInterface;
use core\backend\model\RequestResultException;
use PDO;

class PDOQueryDataSource
{
    private TablesAndAttributesClass $tablesAndAttributes;
    private bool $hasLimit = false;
    private bool $hasOffset = false;
    private array $subQueryAsAttribute=[];

    private WhereConditionsBackboneClass $whereConditions;
    private array $bindedValues = [];

    private string $order;

    private bool $distinct = false;

    /**
     * @return bool
     */
    public function isDistinct(): bool
    {
        return $this->distinct;
    }

    public function setDistinct()
    {
        $this->distinct=true;
    }

    /**
     * @return bool
     */
    public function hasLimit(): bool
    {
        return $this->hasLimit;
    }

    /**
     * @return bool
     */
    public function hasOffset(): bool
    {
        return $this->hasOffset;
    }

    /**
     * @return array
     */
    public function getBindedValues(): array
    {
        return $this->bindedValues;
    }

    /**
     * @return string
     */
    public function getOrder(): ?string
    {
        if (isset($this->order))
            return $this->order;
        return null;
    }

    /**
     * @return string
     */
    public function getOrderDirection(): ?string
    {
        if (isset($this->orderDirection))
            return $this->orderDirection;
        return null;

    }
    private string $orderDirection;

    /**
     * @param string $order
     */
    public function setOrder(string $order): void
    {
        $order = $this->checkTableExists($order);
        $this->order = $order;
    }

    /**
     * @param string $orderDirection
     */
    public function setOrderDirection(string $orderDirection): void
    {
        $this->orderDirection = $orderDirection;
    }

    public function __construct()
    {
        $this->tablesAndAttributes = new TablesAndAttributesClass();
        $this->whereConditions = new WhereConditionsBackboneClass();
    }

    public function enableLimit()
    {
        $this->hasLimit=true;
    }

    public function enableOffset()
    {
        $this->hasOffset=true;
    }

    public function bindValue($value, ?int $bindType = PDO::PARAM_STR, ?string $bindName = null)
    {
        $this->bindedValues[]=[$value, $bindType, $bindName];
    }

        public function countOfActiveLimitAndOffset(): int
    {
        return (int)$this->hasOffset+(int)$this->hasLimit;
    }

    public function addSubQueryAsAttribute(IPDOQueryProcessorInterface $pdoProcessor, PDOQueryDataSource $dataSource, string $alias)
    {
        if ($alias === null)
        {
            throw new RequestResultException(500, 'PDOASQA');
        }
        $this->subQueryAsAttribute[]=[$pdoProcessor, $dataSource, $alias];
    }

    /**
     * @return array
     */
    public function getSubQueryAsAttribute(): array
    {
        return $this->subQueryAsAttribute;
    }

    public function addTable(string $name, $alias)
    {
        $this->tablesAndAttributes->addTable($name, $alias);
    }

    public function addAttributes($name, $attributes)
    {
        $this->tablesAndAttributes->addAttributes($name, $attributes);
    }

    public function getTablesAndAttributes()
    {
        return$this->tablesAndAttributes->getAll();
    }

    public function addWhereCondition(string $type, $parameters, $conditionOperator=null, $isBracketed = false)
    {
        if (is_array($parameters))
        {
            foreach ($parameters as $key=>$param)
            {
                if (is_string($param))
                $parameters[$key]=$this->checkTableExists($param);
            }
        }
        $this->whereConditions->addWhereCondition($type, $parameters, $conditionOperator, $isBracketed);
    }

    public function addConditionObject(WhereConditionsBackboneClass $class, $conditionOperator=null, $isBracketed = false)
    {
        $this->whereConditions->addConditionObject($class, $conditionOperator,$isBracketed);
    }



    public function checkTableExists(string $attribute)
    {
        $newName=$attribute;
        $explodedAttrib=explode('.',$attribute);
        if (count($explodedAttrib) === 2) {
            $tables = $this->tablesAndAttributes->getAll();
            if (array_key_exists($explodedAttrib[0], $tables)) {
                $alias = $tables[$explodedAttrib[0]]['alias'];
                if ($alias !== null) {
                    $newName = $alias . '.' . $explodedAttrib[1];
                }
            } else {
                throw new RequestResultException('500', ['errorcode'=>'QSTACNE', 'value'=>$attribute]);
            }
        }
        return $newName;
    }

    public function getQueryWhere()
    {
        return $this->whereConditions->getQueryString();

    }

}
