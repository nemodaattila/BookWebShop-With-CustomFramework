<?php

namespace core\backend\helper;

use core\backend\model\DirectoryHelperConfig;
use JetBrains\PhpStorm\Pure;

/**
 * Class DirectoryHelper könyvtárakkal, fájlokkal kapcsolatos segédfüggvények
 * @package core\backend\helper
 */
class DirectoryHelper
{
    /**
     * létrehozza és visszaadja a DirectoryHelper Modeljét
     * @return DirectoryHelperConfig a segédmodell
     */
    #[Pure] private static function getDirectoryHelperConfig(): DirectoryHelperConfig
    {
        return new DirectoryHelperConfig();
    }

    /**
     * adott elérési út található fájlokat listázza
     * @param string $directory elérési út
     * @param bool $convertToUrl ha true a fájlokat (teljes út) átalakítja url formátumra
     * @param DirectoryHelperConfig|null $config segédmodell
     * @return array fájlok tömbje
     */
    public static function getFileList(string $directory, bool $convertToUrl = false, ?DirectoryHelperConfig $config = null): array
    {
        if ($config === null) $config = self::getDirectoryHelperConfig();
        $fileList = self::fileListing($directory, $config);
        if ($convertToUrl === true) $fileList = self::covertDirToUrl($fileList);
        return $fileList;
    }

    /**
     * rekurzív függvény, megvizsgálja az adott elérési út összes elemét, ha fájl tömmbe rakja a nevét (teljes úttal vagy anélkül)
     * ha mappa önmagát meghívja azzal a mappával
     * @param string $directory a viszgált elérési út
     * @param DirectoryHelperConfig $config segédmodell
     * @param int $actualDepth aktuális mélységi szint mapparendszerben
     * @return array fájnevek listája
     */
    private static function fileListing(string $directory, DirectoryHelperConfig $config, int $actualDepth = -1): array
    {
        $fileList = array();
        if ($config->isRecursive()) $actualDepth++;
        if (($config->getMaxDepth() === null) || ($actualDepth <= $config->getMaxDepth())) {
            $dh = opendir($directory);
            while (false !== ($filename = readdir($dh))) {
                $currDir = $directory . $filename;
                if (is_dir($currDir)) {
                    if (!in_array($filename, $config->getExcludeFiles())) {
                        $fileList = array_merge($fileList, self::fileListing($currDir, $config));
                    }
                } else {
                    if (!in_array($filename, $config->getExcludeFiles())) {
                        $fileList[] = ($config->isWithPath()) ? $currDir : $filename;
                    }
                }
            }
        }
        return $fileList;
    }

    /**
     * a fálneveket url formára alakítja
     * @param array $fileList
     * @return array átalakított nevek
     * pl: c:\www\index.html->http:\\localhost\index.html
     */
    private static function covertDirToUrl(array $fileList): array
    {
        return str_replace(ROOT, ROOTURL, $fileList);
    }

}
