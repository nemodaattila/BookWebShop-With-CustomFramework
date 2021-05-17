<?php


namespace core\backend\database\querySource;


class TablesAndAttributesClass
{
    private array $tables=[];

    public function addTable(string $name, $alias=null)
    {
        if (!array_key_exists($name,$this->tables)) {
            $this->tables[$name]['alias']=$alias;
            $this->tables[$name]['attributes']=[];
        }
    }
    public function addAttributes(string $name, $attributes)
    {

        if (!array_key_exists($name,$this->tables)) {
            throw new RequestResultException(400, ['errorCode' => 'PDOTACN']);
        }
        foreach ($attributes as $key => $attribute) {
            if (is_int($key))
            {
                $this->tables[$name]['attributes'][]=['name'=>$attribute,'alias'=>null];
            }
            else
                $this->tables[$name]['attributes'][]=['name'=>$key,'alias'=>$attribute];
        }
    }

    public function getAll(): array
    {
        return $this->tables;
    }
}
