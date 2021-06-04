<?php
namespace core;

/**
 * Class FrameWorkCore framework inicializás, router inicializása, futtatása
 * @package core
 */
class FrameWorkCore
{
    public static ?FrameWorkCore $instance=null;

    public static function getInstance(): FrameWorkCore
    {
        if (self::$instance === NULL) {
            self::$instance = new FrameWorkCore();
        }
        return self::$instance;
    }

    public function run()
    {
        backend\service\RoutingInitiator::getInstance()->run();
    }

}
