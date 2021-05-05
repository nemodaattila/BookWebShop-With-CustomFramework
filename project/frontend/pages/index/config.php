<?php
namespace project\frontend\pages\index;

use core\backend\model\WebPageConfig;
$config = WebPageConfig::getInstance();
$config->setJavaScriptEnabled(true);
$config->setSessionEnabled(true);
$config->setAjaxEnabled(true);
$config->setPassRequestParametersToJs(true);
$config->setDataBaseEnabled(true);
$config->setLayout('withMenu');
