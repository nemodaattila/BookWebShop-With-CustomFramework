<?php

namespace core\backend\interfaces;

/**
 * Interface IRestInterface
 * @package core\backend\interfaces RouteKezelő osztályok interface
 */
interface IRestInterface
{
    /**
     * @return array visszaadja a megadott Route-okat
     */
    public function getRoutes(): array;
}
