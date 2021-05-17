<?php


namespace project\backend\model\dbHandler;


use core\backend\database\PDOProcessorBuilder;
use core\backend\helper\VariableHelper;
use core\backend\model\RequestResultException;
use Exception;
use PDO;

class BookListDBHandler
{
    public function getBookList(array $parameters)
    {
        try {
            if ($parameters['criterium']==='{}')
            {
                $parameters['criterium']=[];
            }
            [$PDOLink, $dataSource] = PDOProcessorBuilder::getProcessorAndDataSource('select');
            $what=[];
            $bindValues=[];
            switch ($parameters['order'])
            {
                case 'Title':
                    $dataSource->addTable('book','b');
                    $dataSource->addAttributes('book',['isbn']);
                    break;
                case 'Year':
                    $dataSource->addTable('book_description','bd');
                    $dataSource->addAttributes('book_description',['isbn']);
                    break;
                case 'Price':
                    $dataSource->addTable('book_price','bp');
                    $dataSource->addAttributes('book_price',['isbn']);
                    break;
                case 'Author':
                    $dataSource->addTable('book','b');
                    $dataSource->addAttributes('book',['isbn'=>'MISBN']);
                    [$subPDOLink, $subDataSource] = PDOProcessorBuilder::getProcessorAndDataSource('select');
                    $subDataSource->addTable('book','sb');
                    $subDataSource->addTable('author','sa');
                    $subDataSource->addTable('book_author','sba');
                    $subDataSource->addAttributes('author',['name']);
                    $subDataSource->addWhereCondition('=',['book_author.author_id','author.ID'],'AND');
                    $subDataSource->addWhereCondition('=',['book.isbn','book_author.isbn'],'AND');
                    $subDataSource->addWhereCondition('=',['book.isbn','MISBN'],'AND');
                    $subDataSource->setOrder('author.name');
                    $subDataSource->enableLimit();
                    $dataSource->bindValue(1, PDO::PARAM_INT);

                    $dataSource->addSubQueryAsAttribute($subPDOLink, $subDataSource, 'FirstAuthor');
                    //DO átgondolni
//                $what = "book.ISBN as MISBN, (SELECT author.name FROM book,author,bookauthor where ((bookauthor.authorid=author.ID) AND (book.ISBN=bookauthor.ISBN) AND (book.ISBN=MISBN)) ORDER BY author.name LIMIT 1) as FirstAuthor";
                    break;
                default: throw new RequestResultException(500, ['errorCode'=>'PDOPTTA','type'=>$parameters['order']]);
            }

            switch ($parameters['order'])
            {
                case 'Title':
                case 'Author':
                    foreach ($parameters['criterium'] as $key => $value)
                    {
                        switch ($key)
                        {
                            case 'Author':
                                $dataSource->addTable('book_author','ba');
                                $dataSource->addWhereCondition('=',['book.isbn','book_author.isbn'],'AND');
                                break;
                            case 'Series':
                                $dataSource->addTable('book_series','bs');
                                $dataSource->addWhereCondition('=',['book.isbn','book_series.isbn'],'AND');
                                break;
                            case 'Tags':
                                $dataSource->addTable('book_tag','bt');
                                $dataSource->addWhereCondition('=',['book.isbn','book_tag.isbn'],'AND');
                                break;
                            case "Targetaudience":
                            case "Publisher":
                            case "Language":
                            case "Year":
                            case "Pages":
                            case "Format":
                                $dataSource->addTable('book_description','bd');
                                $dataSource->addWhereCondition('=',['book.isbn','book_description.isbn'],'AND');
                                break;
                            case "Price":
                                $dataSource->addTable('book_price','bp');
                                $dataSource->addWhereCondition('=',['book.isbn','book_price.isbn'],'AND');
                                break;
                            case 'Discount':
                            case 'DiscountCategory':
                                $dataSource->addTable('book_discount','bdc');
                                $dataSource->addWhereCondition('=',['book.isbn','book_discount.isbn'],'AND');
                                break;
                            case 'ReleaseDate':
                                $dataSource->addTable('book_upload_date','bu');
                                $dataSource->addWhereCondition('=',['book.isbn','book_upload_date.isbn'],'AND');
                                break;
                        }
                    }
                    break;
                case 'Year':
                    foreach ($parameters['criterium'] as $key => $value)
                    {
                        switch ($key)
                        {
                            case "Quick":
                            case"ISBN":
                            case "Title":
                            case"Type":
                            case "Category":
                            case "MainCategory":
                                $dataSource->addTable('book','b');
                                $dataSource->addWhereCondition("=",['book.isbn','book_description.isbn'],'AND');
                                break;
                            case 'Author':
                                $dataSource->addTable('book_author','ba');
                                $dataSource->addWhereCondition("=",['book_description.isbn','book_author.isbn'],'AND');
                                break;
                            case 'Series':
                                $dataSource->addTable('book_series','bs');
                                $dataSource->addWhereCondition("=",['book_description.isbn','book_series.isbn'],'AND');
                                break;
                            case 'Tags':
                                $dataSource->addTable('book_tag','bt');
                                $dataSource->addWhereCondition("=",['book_description.isbn','book_tag.isbn'],'AND');
                                break;
                            case "Price":
                                $dataSource->addTable('book_price','bp');
                                $dataSource->addWhereCondition("=",['book_description.isbn','book_price.isbn'],'AND');
                                break;
                            case 'Discount':
                            case 'DiscountCategory':
                                $dataSource->addTable('book_discount','bpc');
                                $dataSource->addWhereCondition("=",['book_description.isbn','book_discount.isbn'],'AND');
                                break;
                        }
                    }
                    break;
                case 'Price':
                    foreach ($parameters['criterium'] as $key => $value)
                    {
                        switch ($key)
                        {
                            case "Quick":
                            case"ISBN":
                            case "Title":
                            case"Type":
                            case "Category":
                            case "MainCategory":
                                $dataSource->addTable('book','b');
                                $dataSource->addWhereCondition("=",['book.isbn','book_price.isbn'],'AND');
                                break;
                            case 'Author':
                                $dataSource->addTable('book_author','ba');
                                $dataSource->addWhereCondition("=",['book_price.isbn','book_author.isbn'],'AND');
                                break;
                            case 'Series':
                                $dataSource->addTable('book_series','bs');
                                $dataSource->addWhereCondition("=",['book_price.isbn','book_series.isbn'],'AND');
                                break;
                            case "Targetaudience":
                            case "Publisher":
                            case "Language":
                            case "Year":
                            case "Pages":
                            case "Format":
                                $dataSource->addTable('book_description','bd');
                                $dataSource->addWhereCondition("=",['book_price.isbn','book_description.isbn'],'AND');
                                break;
                        }
                    }
                    break;
            }

            $newOrder = null;
            switch ($parameters['order'])
            {
                case 'Title':
                    $newOrder='book.title';
                    break;
                case 'Year':
                    $newOrder='book_description.year';
                    break;
                case 'Price':
                    $newOrder='book_price.price';
                    break;
                case 'Author':
                    $newOrder='FirstAuthor';
                    break;
            }
            $parameters['order']=$newOrder;

            if ($parameters['criterium'] !== [])
            {
                foreach ($parameters['criterium'] as $key => $value)
                {
                    switch ($key)
                    {
                        case 'Quick':
                            $dataSource->setDistinct();
                            $dataSource->addTable('book','b');
                            $dataSource->addTable('book_author','ba');
                            $dataSource->addTable('author','a');
                            $dataSource->addWhereCondition('=',['book_author.author_id', 'author.id'], 'AND');
                            $dataSource->addWhereCondition('=',['book.isbn', 'book_author.isbn'], 'AND');
                            $subWhereObj = new WhereConditionsBackboneClass();
                            $subWhereObj->addWhereCondition('LIKE', [$dataSource->checkTableExists('author.name'), '?']);
                            $subWhereObj->addWhereCondition('LIKE',[$dataSource->checkTableExists('book.title'), '?'],'OR');
                            $dataSource->addConditionObject($subWhereObj,'AND',true);
                            $dataSource->bindValue('%' . $value . '%');
                            $dataSource->bindValue('%' . $value . '%');
                            break;
                        case 'ISBN':
                            $dataSource->addTable('book','b');
                            $dataSource->addWhereCondition( 'LIKE',['book.isbn', '?'], 'AND');
                            $dataSource->bindValue('%' . $value . '%');
                            break;
                        case 'Title':
                            $dataSource->addTable(['book','b']);
                            $dataSource->addWhereCondition('LIKE',['book.title', '?'] ,'AND');
                            $dataSource->bindValue('%' . $value . '%');
                            break;
                        case 'Author':
                            $dataSource->addTable('book','b');
                            $dataSource->addTable('book_author','ba');
                            $dataSource->addTable('author','a');
                            $dataSource->addWhereCondition('=',['book_author.author_id', 'author.id'], 'AND');
                            $dataSource->addWhereCondition('LIKE',['author.name', '?'], 'AND');
                            $dataSource->bindValue('%' . $value . '%');
                            break;
                        case 'Type':
                            $dataSource->addTable(['book','b']);
                            $dataSource->addWhereCondition('=',['book.type', '?'],'AND');
                            $dataSource->bindValue($value);
                            break;
                        case 'Category':
                            $dataSource->addTable(['book','b']);
                            $dataSource->addWhereCondition('=',['book.category', '?'],'AND');
                            $dataSource->bindValue($value);
                            break;
                        case 'MainCategory':
                            $dataSource->addTable(['book','b']);
                            $dataSource->addTable(['meta_subcategory','mc']);
                            $dataSource->addTable(['meta_main_category','msc']);
                            $dataSource->addWhereCondition('=',['book.category', 'meta_subcategory.id'], 'AND');
                            $dataSource->addWhereCondition('=',['meta_subcategory.main_category_id', 'meta_main_category.id'],'AND');
                            $dataSource->addWhereCondition('=',['meta_main_category.name', '?'], 'AND');
                            $dataSource->bindValue($value);
                            break;
                        case 'TargetAudience':
                            $dataSource->addTable('book_description','bd');
                            $dataSource->addTable('meta_target_audience','mta');
                            $dataSource->addWhereCondition('=',['book_description.target_audience_id', '?'], 'AND');
                            $dataSource->addWhereCondition('=',['book_description.target_audience_id', 'meta_target_audience.id'], 'AND');
                            $dataSource->bindValue($value);
                            break;
                        case 'Publisher':
                            $dataSource->addTable('book_description','bd');
                            $dataSource->addTable('publisher','p');
                            $dataSource->addWhereCondition('=',['book_description.publisher_id', 'publisher.id'], 'AND');
                            $dataSource->addWhereCondition('LIKE',['publisher.name', '?'], 'AND');
                            $dataSource->bindValue('%' . $value . '%');

                            break;
                        case 'Series':
                            $dataSource->addTable('book_series','bs');
                            $dataSource->addTable('series','s');
                            $dataSource->addWhereCondition('=',['book_series.series_id', 'series.id'],'AND');
                            $dataSource->addWhereCondition('LIKE',['series.name', '?'],'AND');
                            $dataSource->bindValue('%' . $value . '%');
                            break;
                        case 'Language':
                            $dataSource->addTable('book_description','bd');
                            $dataSource->addWhereCondition('=',['book_description.language_id', '?'], 'AND');
                            $dataSource->bindValue($value);
                            break;
                        case 'Year':
                            $dataSource->addTable('book_description','bd');
                            $dataSource->addWhereCondition('=',['book_description.year', '?'], 'AND');
                            $dataSource->bindValue($value);
                            break;
                        case 'Pages':
                            $pages = [[0,100],[101,250],[251,500],[501,1000],[1001,10000]];
                            $dataSource->addTable('book_description','bd');
                            $dataSource->addWhereCondition('>=',['book_description.page_number', '?'], 'AND');
                            $dataSource->addWhereCondition('<=',['book_description.page_number', '?'], 'AND');
                            $dataSource->bindValue($pages[$value][0]);
                            $dataSource->bindValue($pages[$value][1]);
                            break;
                        case 'Format':
                            $dataSource->addTable('book_description','bd');
                            $dataSource->addWhereCondition('=',['book_description.format_id', '?'], 'AND');
                            $dataSource->bindValue($value);
                            break;
                        case 'Tags':
                            $dataSource->setDistinct();
                            $dataSource->addTable('book_tag','bt');
                            $subWhereObj = new WhereConditionsBackboneClass();
                            foreach ($value as $key2)
                            {
                                $subWhereObj->addWhereCondition('=',[$dataSource->checkTableExists('book_tag.tag_id'),'?'],'OR');
                                $dataSource->bindValue($key2);
                            }
                            $dataSource->addConditionObject($subWhereObj,'AND',true);
                            break;
                        case 'Price':
                            $pages = [[0,1000],[1001,3000],[3001,6000],[6001,10000],[10001,100000]];
                            $dataSource->addTable('book_price','bp');
                            $dataSource->addWhereCondition('BETWEEN',['book_price.price', '?','?'], 'AND');
                            $dataSource->bindValue($pages[$value][0], PDO::PARAM_INT);
                            $dataSource->bindValue($pages[$value][1], PDO::PARAM_INT);
                            break;
                        case 'Discount':
                            $pages = [[1,5],[6,15],[16,30],[31,50],[51,100]];
                            $dataSource->addTable('book_discount','bdc');
                            $dataSource->addWhereCondition('BETWEEN',['book_discount.discount_value', '?','?'], 'AND');
                            $dataSource->bindValue($pages[$value][0], PDO::PARAM_INT);
                            $dataSource->bindValue($pages[$value][1], PDO::PARAM_INT);
                            break;
                        case 'DiscountCategory':
                            $dataSource->addTable('book_discount','bdc');
                            $dataSource->addWhereCondition('=',['book_discount.discount_id', '?'], 'AND');
                            $dataSource->bindValue($value);
                            break;
                        case 'ReleaseDate':
                            $pages = [6400,259200,604800,2678400];
                            $dataSource->addTable('book_upload_date','bu');
                            $subWhereObj = new WhereConditionsBackboneClass();
                            $subWhereObj->addWhereCondition('-',['?',$dataSource->checkTableExists('book_upload_date.upload_date')]);
                            $dataSource->addWhereCondition('BETWEEN',[$subWhereObj, '?','?'], 'AND');
                            $dataSource->bindValue(time(), PDO::PARAM_INT);
                            $dataSource->bindValue(0, PDO::PARAM_INT);
                            $dataSource->bindValue($pages[$value], PDO::PARAM_INT);
                            break;
                    }
                }
            }
            if ($parameters['offset']!=='0') {
                $dataSource->enableOffset();
                $dataSource->bindValue((int)$parameters['offset'], PDO::PARAM_INT);
            }
            if ($parameters['limit']!=='0') {
                $dataSource->enableLimit();
                $dataSource->bindValue((int)$parameters['limit'], PDO::PARAM_INT);
            }
            $dataSource->setOrder($parameters['order']);
            $dataSource->setOrderDirection($parameters['orderDir']);
            $tempList = $PDOLink->query($dataSource, 'fetchAll', PDO::FETCH_ASSOC);
            $isbnCount = $PDOLink->countQuery();

            $getParam=($parameters['order'] === 'FirstAuthor')?'MISBN':'isbn';
            $isbnList = [];
            foreach ($tempList as $value)
            {
                $isbnList[] = $value[$getParam];
            }
            return ['list'=>$isbnList,'count'=>$isbnCount];

        } catch (Exception $e) {
            throw new RequestResultException(500, ['errorMessage'=>$e->getMessage()]);
        }
    }


}
