<?php


namespace core\backend\model;


use core\backend\interfaces\IConvertableToArrayInterface;

class RequestParameters implements IConvertableToArrayInterface
{
    private array $urlParameters;
    private array $requestData;

    /**
     * @param string $urlParameter
     */
    public function addUrlParameter(string $urlParameter): void
    {
        $this->urlParameters[] = $urlParameter;
    }

    /**
     * @param array $requestData
     */
    public function setRequestData(array $requestData): void
    {
        $this->requestData = $requestData;
    }

    /**
     * @return array
     */
    public function getUrlParameters(): array
    {
        return $this->urlParameters;
    }

    /**
     * @return array
     */
    public function getRequestData(): array
    {
        return $this->requestData;
    }

    public function reset()
    {
        $this->urlParameters=[];
        $this->requestData=[];
    }


    public function getAlldata(): array
    {
        return get_object_vars($this);
    }
}
