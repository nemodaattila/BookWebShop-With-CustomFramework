<?php
namespace core;

class FrameWorkCore
{
    public static ?FrameWorkCore $instance=null;
    private backend\service\RoutingInitiator $router;
    public static function getInstance(): FrameWorkCore
    {
        if (self::$instance === NULL) {
            self::$instance = new FrameWorkCore();
        }
        return self::$instance;
    }

    public function run()
    {
        $this->router=backend\service\RoutingInitiator::getInstance();
        $this->router->run();
    }

}
