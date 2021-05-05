<?php
namespace project\config;

use core\backend\model\WebPageConfig;
$config = WebPageConfig::getInstance();
$config->setJavaScriptEnabled(true);
$config->setSessionEnabled(true);
