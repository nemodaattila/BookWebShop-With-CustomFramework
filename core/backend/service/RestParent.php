<?php


namespace core\backend\service;


use core\backend\interfaces\IRestInterface;
use core\backend\model\RequestResultException;

class RestParent implements IRestInterface
{
    protected array $routes;

    public function getRoutes(): array
    {
        return $this->routes;
    }

    /**
     * egy exceprion-t dob melyből a HTML RESPONSE fog készülni
     * @param int $code a response HTTP kódjs
     * @param mixed $data a responshoz adódó adat
     * @throws RequestResultException az elkészült kivétel
     */
    protected function sendResult(int $code, $data)
    {
        throw new RequestResultException($code,$data);
    }
}
