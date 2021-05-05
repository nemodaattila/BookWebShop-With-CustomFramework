<?php


namespace core\backend\helper;


use core\backend\model\DirectoryHelperConfig;


class DirectoryHelper
{

    private static function getDirectoryHelperConfig()
    {
        return new DirectoryHelperConfig();
    }

    public static function getFileList(string $directory,bool $convertToUrl = false, ?DirectoryHelperConfig $config= null): array
    {
        if ($config === null) $config=self::getDirectoryHelperConfig();
        $fileList = self::fileListing($directory, $config);
        var_dump($fileList);
        if ($convertToUrl === true) $fileList = self::covertDirToUrl($fileList);
        return $fileList;
    }

    private static function fileListing($directory, DirectoryHelperConfig $config, int $actualDepth = -1): array
    {

        $fileList=array();
        if ($config->isRecursive()) $actualDepth++;
        if (($config->getMaxDepth()===null)||($actualDepth <= $config->getMaxDepth()))
        {
//            var_dump($directory);
            $dh  = opendir($directory);
            while (false !== ($filename = readdir($dh)))
            {
                $currDir=$directory.$filename;
                if (is_dir($currDir))
                {
                    if (!in_array($filename, $config->getExcludeFiles()))
                    {
                        $fileList=array_merge($fileList,self::fileListing($currDir,$config));
                    }
                }
                else
                {
                    if (!in_array($filename, $config->getExcludeFiles()))
                    {
                        $fileList[]=($config->isWithPath())?$currDir:$filename;
                    }
                }
            }
        }
//        var_dump($fileList);
        return $fileList;
    }

    private static function covertDirToUrl(array $fileList)
    {
         $fileList=str_replace(ROOT, ROOTURL, $fileList);
         return $fileList;
    }

}
