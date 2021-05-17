<?php


namespace project\backend\rest;


use core\backend\helper\VariableHelper;
use core\backend\interfaces\IRestInterface;
use core\backend\model\RequestParameters;
use core\backend\model\RequestResultException;
use core\backend\service\RestParent;
use project\backend\model\dbHandler\BookDataDBHandler;
use project\backend\model\dbHandler\BookListDBHandler;
use project\backend\model\dbHandler\BookMetaDataDBHandler;

class BookRest extends RestParent
{
    protected array $routes = [
        ['GET', 'book/metadata', 'getBookMetaData',false,false, true],
        ['GET', 'book/primaryData/$1', 'getBookPrimaryData',false,false, true],
        ['POST', 'book/withParameter', 'getWithParameter',false,true, true]
    ];

    public function getBookMetaData()
    {
        $metaDataGetter = new BookMetaDataDBHandler();
        $result = $metaDataGetter->getAllMetaData();
        $this->sendResult(200, $result);
    }

    public function getWithParameter(RequestParameters $parameters)
    {
        $listGetter = new BookListDBHandler();
        $result = $listGetter->getBookList($parameters->getRequestData());
//        VariableHelper::sumDumpWithLine($result);
        $this->sendResult(200, $result);
    }

    public function getBookPrimaryData(RequestParameters $parameters)
    {
        $bookDataGetter = new BookDataDBHandler();
        $result = $bookDataGetter->getPrimaryData($parameters->getUrlParameters()[0]);
        $this->sendResult(200, $result);
    }

}
