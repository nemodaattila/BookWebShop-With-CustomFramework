<?php


namespace core\backend\database\querySource;


use core\backend\interfaces\IPDOWhereConditionInterface;
use core\backend\model\RequestResultException;

class WhereConditionClassWithTwoParameter extends WhereConditionParentClass implements IPDOWhereConditionInterface
{
    private string $type;
    private array $parameters;

    /**
     * WhereConditionClassWithTwoParameter constructor.
     * @param string $type
     * @param array $parameters
     */
    public function __construct(string $type, array $parameters)
    {
        if (count($parameters)!==2)
        {
            throw new RequestResultException('500', ['errorCode'=>'PDOWC2PC']);
        }
        $this->type = $type;
        $this->parameters = $parameters;
    }

    public function getQueryString(?IPDOWhereConditionInterface $source=null): string
    {
        return $this->checkCondition($this->parameters[0]).' '.$this->type.' '.$this->checkCondition($this->parameters[1]);
    }

}
