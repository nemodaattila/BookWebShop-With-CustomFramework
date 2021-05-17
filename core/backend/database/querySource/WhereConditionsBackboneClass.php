<?php


namespace core\backend\database\querySource;


use core\backend\interfaces\IPDOWhereConditionInterface;
use core\backend\model\RequestResultException;

class WhereConditionsBackboneClass extends WhereConditionParentClass implements IPDOWhereConditionInterface
{


    public function addWhereCondition(string $type, $parameters, $conditionOperator=null, $isBracketed = false)
    {
        $type=strtoupper($type);
        switch ($type)
        {
            case 'BETWEEN':
                $class = new WhereBetweenConditionClass($parameters);
                break;
            default: $class = new WhereConditionClassWithTwoParameter($type, $parameters);
        }
        $this->conditions[]=[$class, $isBracketed];
        if (count($this->conditions)>1)
        {
            $this->operators[]=$conditionOperator;
            if ($conditionOperator === null)
            {
                throw new RequestResultException(500,['errorcode'=>'PDOACNCO']);
            }
        }
    }

//    public function addConditionObject(WhereConditionsClass $class, $conditionOperator=null, $isBracketed = false)
//    {
//        $this->conditions[]=[$class, $isBracketed];
//        if (count($this->conditions)>1)
//        {
//            $this->operators[]=$conditionOperator;
//        }
//    }

    public function getAll()
    {
        return [$this->conditions, $this->operators];
    }
}
