<?php


namespace project\backend\model\dbHandler;


use core\backend\database\PDOProcessorBuilder;
use core\backend\helper\VariableHelper;
use core\backend\model\RequestResultException;
use Exception;

class BookDataDBHandler
{

    public function getPrimaryData(string $isbn)
    {
        try {
            $prim=$this->getBookPrimaryData($isbn);
            $prim['author'] = $this->getBookAuthor($isbn);
            $prim['price'] = $this->getBookPrice($isbn);
            $prim['discount']=$this->getDiscountQuantity($isbn);
            $prim['thumbnail']=$this->getImageThumbnail($isbn);
            return $prim;
        }
        catch (Exception $e)
        {
            var_dump($e);
            throw new RequestResultException(500, ['errorMessage'=>$e->getMessage()]);
        }
    }

    private function getBookPrimaryData($isbn)
    {
        $PDOLink=PDOProcessorBuilder::getProcessor('select', true);
        $PDOLink->setCommand("SELECT isbn, title, type_id, category_id FROM book WHERE isbn=?");
        $PDOLink->setValues($isbn);
        $PDOLink->setFetchType('fetch');
        $tempResult = $PDOLink->execute();
        if ($tempResult === null)
        {
            throw new RequestResultException(500, ['errorCode'=>'GBPDISBNNE']);
        }
        return $tempResult;
    }

    private function getBookAuthor(string $isbn)
    {
        [$PDOLink, $dataSource] = PDOProcessorBuilder::getProcessorAndDataSource('select');
        $dataSource->addTable('author','a');
        $dataSource->addTable('book_author','ba');
        $dataSource->addAttributes('author',['name']);
        $dataSource->addWhereCondition('=',['book_author.author_id','author.ID'],'AND');
        $dataSource->addWhereCondition('=',['book_author.isbn','?'],'AND');
        $dataSource->bindValue($isbn);
        $author=$PDOLink->query($dataSource);
        foreach ($author as $key=>$value)
        {
            $author[$key]=$value;
        }
        return $author;
    }

    private function getBookPrice($isbn)
    {
        $PDOLink=PDOProcessorBuilder::getProcessor('select', true);
        $PDOLink->setCommand("SELECT bp.price FROM book_price as bp WHERE isbn=?");
        $PDOLink->setFetchType('fetch');
        $PDOLink->setValues($isbn);
        $tempResult = $PDOLink->execute();
        if ($tempResult === null)
        {
            throw new RequestResultException(500, ['errorCode'=>'GBPDISBNNE']);
        }
        return $tempResult['price'];
    }

    private function getDiscountQuantity($isbn)
    {
        $PDOLink=PDOProcessorBuilder::getProcessor('select', true);
        $PDOLink->setCommand("SELECT bd.discount_value FROM book_discount as bd WHERE isbn=?");
        $PDOLink->setFetchType('fetch');
        $PDOLink->setValues($isbn);
        $tempResult = $PDOLink->execute();
        if ($tempResult === false)
        {
            return 0;
        }
        return $tempResult['discount_value'];
    }

    private function getImageThumbnail($isbn)
    {
        //DO thumbnail
        //            $data2['imgThumbnail']=ImgHelper::getThumbnailOfFileWithoutExtension($data1['isbn'], FILE.'/covers', 'no_cover.jpg', 150, 212);

    }
}
