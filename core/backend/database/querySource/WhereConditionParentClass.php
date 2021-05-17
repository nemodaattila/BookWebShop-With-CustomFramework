<?php


namespace core\backend\database\querySource;


use core\backend\interfaces\IPDOWhereConditionInterface;

class WhereConditionParentClass implements IPDOWhereConditionInterface
{
    protected array $conditions=[];
    protected array $operators=[];

    protected function checkCondition($condition)
    {
        if (gettype($condition) === 'string')
        {
            return$condition;
        }
        else if (in_array('core\backend\interfaces\IPDOWhereConditionInterface',class_implements($condition)))
        {
            return $condition->getQueryString();
        }

    }

    public function getQueryString(): string
    {
        $condCount=count($this->conditions);
        if ($condCount===0)
        {
            return '';
        }
            $query = '';

        for ($i = 0; $i < $condCount; $i++) {
                if ($i>0)
                {
                    $query.=$this->operators[$i-1].' ';
                }
                [$condClass, $bracketed] = $this->conditions[$i];
                $string=$condClass->getQueryString();
                if ($bracketed === true)
                    $string = "(".$string.')';
                $query .=$string.' ';
            }
        return $query;
    }
}
