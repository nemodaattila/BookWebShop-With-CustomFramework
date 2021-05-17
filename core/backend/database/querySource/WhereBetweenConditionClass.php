<?php


namespace core\backend\database\querySource;


use core\backend\interfaces\IPDOWhereConditionInterface;
use core\backend\model\RequestResultException;

class WhereBetweenConditionClass extends WhereConditionParentClass implements IPDOWhereConditionInterface
{

    private array $parameters;

    /**
     * WhereConditionClassWithTwoParameter constructor.
     * @param array $parameters
     */
    public function __construct( array $parameters)
    {
        if (count($parameters)!==3)
        {
            throw new RequestResultException('500', ['errorCode'=>'PDOWBCPC']);
        }
        $this->parameters = $parameters;
    }

    public function getQueryString(?IPDOWhereConditionInterface $source=null ): string
    {
        $param1=$this->checkCondition($this->parameters[0]);
        $param2=$this->checkCondition($this->parameters[1]);
        $param3=$this->checkCondition($this->parameters[2]);
        return $param1." BETWEEN ".$param2.' AND '.$param3;
    }
}
