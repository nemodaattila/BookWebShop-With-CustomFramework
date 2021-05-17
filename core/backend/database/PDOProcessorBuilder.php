<?php
namespace core\backend\database;


/**
 * Class PDOProcessorBuilder bulider osztály a megfelelő PDO class létrehozásához
 * @package backend
 */
final class PDOProcessorBuilder
{

    public static function getProcessorAndDataSource(string $type)
    {
        $type = ucfirst(strtolower($type));
        if (!in_array($type,['Insert','Select','Update','Delete']))
        {
            throw new RequestResultException(400, ['errorcode'=>'PDOPBBP']);
        }
        $proc = 'core\backend\database\queryProcessor\complex\PDO'.$type.'Processor';
        return [new $proc(PDOConnection::getInstance()), new querySource\PDOQueryDataSource()];
    }

    public static function getProcessor(string $type, $simple = false)
    {
        $type = ucfirst(strtolower($type));
        if (!in_array($type,['Insert','Select','Update','Delete']))
        {
            throw new RequestResultException(400, ['errorcode'=>'PDOPBBP']);
        }
        if ($simple)
        {
            $proc = 'core\backend\database\queryProcessor\simple\Simple'.$type.'PDOProcessor';
        }
        else
        {
            $proc = 'core\backend\database\queryProcessor\complex\PDO'.$type.'Processor';
        }
        return new $proc(PDOConnection::getInstance());
    }

    public function getDataSource()
    {
        return new querySource\PDOQueryDataSource();
    }
}
