<?php


namespace project\backend\model\dbHandler;


use core\backend\database\PDOProcessorBuilder;
use core\backend\helper\ImgHelper;
use core\backend\helper\VariableHelper;
use core\backend\model\RequestResultException;
use Exception;

class BookDataDBHandler
{

    public function getPrimaryData(string $isbn)
    {
        $prim=$this->getBookPrimaryData($isbn);
        $prim['author'] = $this->getBookAuthor($isbn);
        $prim['price'] = $this->getBookPrice($isbn);
        $prim['discount']=$this->getDiscountQuantity($isbn);
        $prim['cover_thumbnail']=$this->getCoverThumbnail($isbn);
        return $prim;

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
            $author[$key]=$value['name'];
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

    private function getCoverThumbnail($isbn)
    {
        $PDOLink=PDOProcessorBuilder::getProcessor('select', true);
        $PDOLink->setCommand("SELECT bc.extension, bc.has_cover, bc.has_thumbnail FROM book_cover as bc WHERE book_isbn=?");
        $PDOLink->setFetchType('fetch');
        $PDOLink->setValues($isbn);
        $tempResult = $PDOLink->execute();
        if ($tempResult === false)
        {
            return $this->loadThumbnailFromDiskAsBase64String(ROOT.'\project\file\coverThumbnail\no_cover.jpg');
        }
        else
        {
            if ($tempResult['has_cover'] === '1' && $tempResult['has_thumbnail'] === '0')
            {
                $this->createCoverThumbnail($isbn.'.'.$tempResult['extension']);
                $PDOLink=PDOProcessorBuilder::getProcessor('UPDATE', true);
                $PDOLink->setCommand("UPDATE book_cover SET has_thumbnail = '1' WHERE book_isbn=?");
                $PDOLink->setValues($isbn);
                $PDOLink->execute();
            }
            return $this->loadThumbnailFromDiskAsBase64String(ROOT.'\project\file\coverThumbnail\\'.$isbn.'.'.$tempResult['extension']);
        }
    }

    private function createCoverThumbnail(string $fileName)
    {
        ImgHelper::createThumbnail($fileName, ROOT.'\project\file\cover\\',ROOT.'\project\file\coverThumbnail\\', 150,212);
    }

    private function loadThumbnailFromDiskAsBase64String(string $file)
    {
        return ImgHelper::convertImageToBase64String($file);
    }
}
