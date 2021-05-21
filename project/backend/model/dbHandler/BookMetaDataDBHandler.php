<?php


namespace project\backend\model\dbHandler;


use core\backend\database\PDOProcessorBuilder;
use core\backend\helper\VariableHelper;

class BookMetaDataDBHandler
{
    public function getAllMetaData()
    {
        return [
            'format'=>$this->getFormat(),
            'language'=>$this->getLanguage(),
            'mainCategory'=>$this->getMainCategory(),
            'subCategory'=>$this->getSubCategory(),
            'tag'=>$this->getTag(),
            'targetAudience'=>$this->getTargetAudience(),
            'type'=>$this->getType(),
        ];
    }

    private function getFormat()
    {
        $PDOLink=PDOProcessorBuilder::getProcessor('select', true);
        $PDOLink->setCommand("SELECT id, type_id, name FROM meta_format");
        $tempResult = $PDOLink->execute();
        $result = [];
        foreach ($tempResult as $value)
        {
            if (!isset($result[$value['type_id']]))
            {
                $result[$value['type_id']]=[];
            }
            $result[$value['type_id']][$value['id']]=$value['name'];
        }
        return $result;
    }

    private function getLanguage()
    {
        $PDOLink=PDOProcessorBuilder::getProcessor('select', true);
        $PDOLink->setCommand("SELECT id,  name FROM meta_language");
        $tempResult = $PDOLink->execute();
        $result = [];
        foreach ($tempResult as $value)
        {
            $result[$value['id']]=$value['name'];
        }
        return $result;
    }

    private function getMainCategory()
    {
        $PDOLink=PDOProcessorBuilder::getProcessor('select', true);
            $PDOLink->setCommand("SELECT id,  name FROM meta_main_category");
        $tempResult = $PDOLink->execute();
        $result = [];
        foreach ($tempResult as $value)
        {
            $result[$value['id']]=$value['name'];
        }
        return $result;
    }

    private function getSubCategory()
    {
        $PDOLink=PDOProcessorBuilder::getProcessor('select', true);
        $PDOLink->setCommand("SELECT id, main_category_id, name FROM meta_subcategory");
        $tempResult = $PDOLink->execute();
        $result = [];
        foreach ($tempResult as $value)
        {
            if (!isset($result[$value['main_category_id']]))
            {
                $result[$value['main_category_id']]=[];
            }
            $result[$value['main_category_id']][$value['id']]=$value['name'];
        }
        return $result;
    }

    private function getTag()
    {
        $PDOLink=PDOProcessorBuilder::getProcessor('select', true);
        $PDOLink->setCommand("SELECT id,  name FROM meta_tag");
        $tempResult = $PDOLink->execute();
        $result = [];
        foreach ($tempResult as $value)
        {
            $result[$value['id']]=$value['name'];
        }
        return $result;
    }

    private function getTargetAudience()
    {
        $PDOLink=PDOProcessorBuilder::getProcessor('select', true);
        $PDOLink->setCommand("SELECT id,  name FROM meta_target_audience");
        $tempResult = $PDOLink->execute();
        $result = [];
        foreach ($tempResult as $value)
        {
            $result[$value['id']]=$value['name'];
        }
        return $result;
    }

    private function getType()
    {
        $PDOLink=PDOProcessorBuilder::getProcessor('select', true);
        $PDOLink->setCommand("SELECT id,  name FROM meta_type");
        $tempResult = $PDOLink->execute();
        $result = [];
        foreach ($tempResult as $value)
        {
            $result[$value['id']]=$value['name'];
        }
        return $result;
    }
}
