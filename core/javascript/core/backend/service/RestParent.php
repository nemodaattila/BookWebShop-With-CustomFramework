<?php

namespace core\backend\service;

use core\backend\interfaces\IRestInterface;
use core\backend\model\RequestResultException;

/**
 * Class RestParent http resquesteket feldolgozó osztályok ősosztálya
 * @package core\backend\service
 */
class RestParent implements IRestInterface
{
    /**
     * @var array lehetséges route-ok
     */
    protected array $routes;

    /**
     * @return array az összes route visszaadása
     */
    public function getRoutes(): array
    {
        return $this->routes;
    }

    /**
     * egy Request exception-t dob melyből a HTML RESPONSE fog készülni
     * @param int $code a response HTTP kódja
     * @param mixed $data a responshoz adatai pl: hibaüzenet
     * @throws RequestResultException az elkészült kivétel
     */
    protected function sendResult(int $code, mixed $data)
    {
        throw new RequestResultException($code,$data);
    }
}
