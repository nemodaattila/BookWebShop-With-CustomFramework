<?php
/**
 * a projekt gyökérkönyvtára pl: c:\weboldal\
 */
DEFINE ("ROOT",$_SERVER['DOCUMENT_ROOT'].'/konyvesv03');
DEFINE ("ROOTURL",'http://localhost/konyvesv03');
require ROOT.'/core/autoloader.php';

$framework = core\FrameWorkCore::getInstance();
$framework->run();
