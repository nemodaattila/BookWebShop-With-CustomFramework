<?php


namespace core\backend\database\queryProcessor\complex;


use core\backend\database\querySource\PDOQueryDataSource;
use core\backend\database\querySource\WhereConditionsBackboneClass;
use core\backend\helper\VariableHelper;
use PDO;

class PDOSelectProcessor extends PDOQueryProcessorParent
{
    protected string $fetchType = 'fetchAll';
    protected int $fetchMode = PDO::FETCH_ASSOC;

    public function query(PDOQueryDataSource $source, $fetchType='fetchAll', $fetchMode=PDO::FETCH_ASSOC)
    {
        $this->setSource($source);
        $this->fetchMode = $fetchMode;
        if (!in_array($fetchType, ['fetch', 'fetchAll']))
            throw new RequestResultException(400, ['errorCode' => 'PDOFTBT']);
        $this->fetchType = $fetchType;

        return $this->runQuery($this->createQuery());
    }

    public function createQuery(): string
    {
        $query = "SELECT " . $this->getTableAndAttributesQuery();
        $where = $this->source->getQueryWhere();
        if ($where !== '')
            $query .= ' WHERE '.$where;
//        $query .= $this->getGroupGuery();
        $query .= $this->getOrderByQuery();
        $query .= $this->getLimitAndOffsetQuery();
        return $query;
    }

            private function createCountQuery(): string
            {
                $query = "SELECT COUNT(*) AS COUNT FROM ( SELECT " . $this->getTableAndAttributesQuery();
                $where = $this->source->getQueryWhere();
                if ($where !== '') {
                    $query .= ' WHERE ' . $where;
                }
                $query.=') AS COUNTSUB';
                $query = trim(str_replace('  ',' ',$query));
                return $query;
            }

    public function countQuery(?PDOQueryDataSource $source= null)
    {
        if ($source!==null)
            $this->setSource($source);
        if ($this->source !== null)
        {
            return $this->runCountQuery($this->createCountQuery());
        }
    }


    private function getTableAndAttributesQuery()
    {
        $query = '';
        if ($this->source->isDistinct())
        {
            $query = 'DISTINCT ';
        }
        $tables=[];
        $attribs=[];
        $params=$this->source->getTablesAndAttributes();
        foreach ($params as $table=>['alias'=>$alias, 'attributes'=>$attributes])
        {
            foreach ($attributes as ['name'=>$attributeName, 'alias'=>$attributeAlias])
            {
                $attribs[]=($alias!==null?$alias:$table).'.'.$attributeName.($attributeAlias!==null?' AS '.$attributeAlias:'');
            }
            $tables[]=$table.($alias !== null?' AS '.$alias:'');
        }
        $query.=implode(', ', $attribs).' '. $this->getSubQueryAsAttribute() .' FROM '.implode(', ', $tables).' ';
        return $query;
    }

    private function getOrderByQuery()
    {
        $query = '';
        $order = $this->source->getOrder();
        if ($order !== null)
        {
            $query .= 'ORDER BY '.$order.' ';
        }
        $orderDir = $this->source->getOrderDirection();
        if ($orderDir !== null)
        {
            $query .= $orderDir.' ';
        }
        return $query;
    }

    private function getLimitAndOffsetQuery()
    {
        $limit = $this->source->hasLimit();
        $offset = $this->source->hasOffset();
        if (!$offset && $limit) {
            return 'LIMIT ' . (($limit) ? '?' : '0').' ';
        } else
            if ($offset) {
                return 'LIMIT ' . (($limit) ? '?' : '0') . ',' . (($offset) ? '?' : 0).' ';
            }
        return ' ';
    }

    private function runQuery($queryString)
    {
        $query = $this->pdo->prepare($queryString);
        $values = $this->source->getBindedValues();
        if (!empty($values)) {
            foreach ($values as $key => $value) {
                $id = ($value[2] !== null) ? $value[2] : $key + 1;
                $query->bindValue($id, $value[0], $value[1]);
            }
        }
        $query->execute();
        $rt = $this->fetchType;
        return $query->$rt($this->fetchMode);
    }

    private function runCountQuery($queryString)
    {
        $query = $this->pdo->prepare($queryString);
        $values = $this->source->getBindedValues();
        if (!empty($values)) {
            $count = count($values) - $this->source->countOfActiveLimitAndOffset();
            for ($i = 0; $i < $count; $i++) {
                $query->bindValue($i + 1, $values[$i][0], $values[$i][1]);
            }
        }
        $query->execute();
        return (int)$query->fetch()['COUNT'];
    }

    private function getSubQueryAsAttribute()
    {
        $query = '';
        $subQuery = $this->source->getSubQueryAsAttribute();
        if (count($subQuery)!==0)
        {
            $query = ',';
            foreach ($subQuery as [$processor, $source, $alias])
            {
                $processor->setSource($source);
                $query .= "(".$processor->createQuery().') AS '.$alias.' ';
            }
        }
        return $query;
    }


}
