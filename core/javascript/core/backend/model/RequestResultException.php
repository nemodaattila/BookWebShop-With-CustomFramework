<?php
namespace core\backend\model;
use Exception;
use JetBrains\PhpStorm\Pure;

/**
 * Class RequestResultException egyedi kivétel, (mely nem feltétlenül hibát jelent),
 * hanem egy request responseként átadható eredményt ad vissza
 * @package backend
 */
class RequestResultException extends Exception
{
    /**
     * @var int response kódja
     */
    private int $httpCode;
    /**
     * @var array response adat
     */
    private array $data;

    #[Pure] public function __construct(int $httpCode, array $data, $message = "")
    {
        parent::__construct($message);
        $this->httpCode=$httpCode;
        $this->data = [$data];
    }

    /**
     * lekéri a kivétel paramétereit
     * @return array [<httpCode> és <adat>]
     * pl: [200, ['ok'=>'minden rendben']
     */
    public function getResult(): array
    {
        return [$this->httpCode, $this->data];
    }
}
