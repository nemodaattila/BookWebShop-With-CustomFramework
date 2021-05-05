<?php


namespace project\backend\rest;


use core\backend\model\RequestParameters;
use core\backend\interfaces\restInterface;
use project\backend\service\WebPageGenerator;

class LoadPageRest implements restInterface
{
    private array $routes = [['GET', 'loadPage/$1', 'loadPage',false,false, false]];

    public function getRoutes(): array
    {
        return $this->routes;
    }

    public function loadPage(RequestParameters $paremeters)
    {
        $webPage = new WebPageGenerator($paremeters);
    }

}
