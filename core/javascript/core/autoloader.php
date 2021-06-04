<?php
// autoload classes based on a 1:1 mapping from namespace to directory structure.
spl_autoload_register(function ($className) {
    $className = str_replace(['\\','/\\'], DIRECTORY_SEPARATOR, $className);
    $file = ROOT.DIRECTORY_SEPARATOR.$className.'.php';
    if (is_readable($file)) require_once $file;
});
