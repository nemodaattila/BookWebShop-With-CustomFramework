<?php


namespace core\backend\rest;


use core\backend\model\RequestParameters;
use core\backend\service\RestParent;
use core\backend\service\WebPageGenerator;

/**
 * Class LoadPageRest html oldalbetöltő / megjelenítő router
 * @package core\backend\rest
 */
class LoadPageRest extends RestParent
{
    protected array $routes = [
        ['GET', 'loadPage/$1', 'loadPage',false,false, false]
    ];

    /**
     * html oldal betöltő fv.
     * @param RequestParameters $paremeters request paraméterek
     */
    public function loadPage(RequestParameters $paremeters)
    {
        new WebPageGenerator($paremeters);
    }

}
