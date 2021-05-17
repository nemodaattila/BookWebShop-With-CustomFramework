<?php


namespace project\backend\rest;


use core\backend\model\RequestParameters;
use core\backend\interfaces\IRestInterface;
use core\backend\service\RestParent;
use project\backend\service\WebPageGenerator;

class LoadPageRest extends RestParent
{
    protected array $routes = [
        ['GET', 'loadPage/$1', 'loadPage',false,false, false]
    ];

    public function loadPage(RequestParameters $paremeters)
    {
        $webPage = new WebPageGenerator($paremeters);
    }

}
