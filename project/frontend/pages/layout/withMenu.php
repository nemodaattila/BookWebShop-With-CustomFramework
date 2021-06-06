<?php
namespace project\frontend\pages\layout;
use core\frontend\service\ViewHandler;

$view = ViewHandler::getInstance()
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <?php
    echo $view->getStyleFiles();
    ?>
    <link rel="stylesheet" type="text/css" href='<?php echo ROOTURL;?>/project/frontend/globals/style/header.css' />
    <link rel="stylesheet" type="text/css" href='<?php echo ROOTURL;?>/project/frontend/globals/style/footer.css' />
</head>
<body>
<header>
    <span id="titlediv">
        <span><a href="../../../../../databasetest/index.php" >Könyvespolc.hu</a></span>
        <img id="headimg" src="<?php echo ROOTURL;?>/project/frontend/globals/style/book-logo.jpg" >
    </span>
    <form id="loginform">
        <div id="logindiv" class="csstable"></div>
    </form>

</header>
<nav>
    <span>
        <span>
            <a id="indexlink" href="../../../../../databasetest/index.php">Főoldal</a>
            <a id="discountlink" href="../../../../../databasetest/index.php">Akciók</a>
            <a id="newreleaselink" href="../../../../../databasetest/index.php">Újdonságok</a>

        </span>
        <span id="rightdiv">
            <a id="aboutuslink" href="../../../../../databasetest/index.php">Rólunk</a>
            <a id="shopaccesslink" href="../../../../../databasetest/index.php">Elérhetőség</a>
            <a id="faqlink" href="../../../../../databasetest/index.php">Kérdések - Észrevételek</a>
        </span>
    </span>
    <span id=bookmanagenav></span>
    <span>
        <a href="../../../../../databasetest/index.php" id="browselink">Böngészés</a>
        <form method="POST" action="../../../../../databasetest/index.php"><label for="quicksearch">Egyszerű keresés (író vagy cím):&nbsp;</label><input id="quicksearch" name="quicksearch" type="text"><input type="submit" value="keresés"></form>
        <a id="complexsearchlink" href="../../../../../databasetest/index.php">Részletes keresés</a>
    </span>
</nav>


<?php echo $view->getMessageSession(); ?>
<br>
<?php echo $view->getView(); ?>

<footer>
    <header>Készítette: Nemoda Attila<br/></header>
    <aside>
        <a href="../../../../../databasetest/index.php" id="aboutmelink">Magamról - A készítőról</a>
        <a href="../../../../../databasetest/index.php" id="aboutpagelink">Az oldalról</a>
        <a href="#top" onclick="self.scrollTo(0, 0); return false;">Oldal Tetejére</a>
    </aside>

</footer>
</body>
</html>

