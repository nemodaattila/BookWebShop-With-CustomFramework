<?php

namespace project\backend\rest;

use core\backend\model\RequestParameters;
use core\backend\model\RequestResultException;
use core\backend\service\RestParent;
use project\backend\model\dbHandler\BookDataDBHandler;
use project\backend\model\dbHandler\BookListDBHandler;
use project\backend\model\dbHandler\BookMetaDataDBHandler;

/**
 * Class BookRest \book -ra érkező http requestek route-jait, és feldolgozásukat tartalmazza
 * @package project\backend\rest
 */
class BookRest extends RestParent
{
    protected array $routes = [
        ['GET', 'book/metadata', 'getBookMetaData', false, false, true],
        ['GET', 'book/primaryData/$1', 'getBookPrimaryData', false, false, true],
        ['POST', 'book/withParameter', 'getWithParameter', false, true, true]
    ];

    /**
     * könyv metaadatainak lekérése
     * @throws RequestResultException PDOProcesszor hibák , isbn hibák
     */
    public function getBookMetaData()
    {
        $metaDataGetter = new BookMetaDataDBHandler();
        $result = $metaDataGetter->getAllMetaData();
        $this->sendResult(200, $result);
    }

    /**
     * megadott kereséséi paraméterek mellett isbn lista és darabszám visszaadása
     * @param RequestParameters $parameters keresési paraméterek http requestből
     * @throws RequestResultException PDOProcesszor hibák , konverziós hiba
     */
    public function getWithParameter(RequestParameters $parameters)
    {
        $listGetter = new BookListDBHandler();
        $result = $listGetter->getBookList($parameters->getRequestData());
        $this->sendResult(200, $result);
    }

    /**
     * egy könyv elsődleges adatainak lekérdezése isbn alapján
     * @param RequestParameters $parameters paraméterek a Http requestbőől
     * @throws RequestResultException PDOProcessor hiba, img thumbnail hiba
     */
    public function getBookPrimaryData(RequestParameters $parameters)
    {
        $bookDataGetter = new BookDataDBHandler();
        $result = $bookDataGetter->getPrimaryData($parameters->getUrlParameters()[0]);
        $this->sendResult(200, $result);
    }

}
