<?php
namespace core\backend\helper;

// Link image type to correct image loader
// - makes it easier to add additional types later on
// - makes the function easier to read

use core\backend\model\RequestResultException;

class ImgHelper
{
    const IMAGE_HANDLERS = [
        IMAGETYPE_JPEG => [
            'load' => 'imagecreatefromjpeg',
            'save' => 'imagejpeg',
            'quality' => 100
        ],
        IMAGETYPE_PNG => [
            'load' => 'imagecreatefrompng',
            'save' => 'imagepng',
            'quality' => 0
        ],
        IMAGETYPE_GIF => [
            'load' => 'imagecreatefromgif',
            'save' => 'imagegif'
        ]
    ];


    static public function createCover(string $fileName, string $sourcePath, string $targetPath, int $width, int $height)
    {
        var_dump($fileName);
    }

//    static public function getThumbnailOfFileWithoutExtension($fileName, $path, $width, $height)
//    {
//        $fullFileName=self::checkFileExistsWithoutExtension($fileName, $path);
//        [$fullFileName, $extension]=$fullFileName;
//        if ($fullFileName!==null )
//        {
//            return [self::createAndSaveThumbnailBase64($path.'/'.$fullFileName, $width, $height),$extension];
//        }
//        return null;
//
//    }

//    static private function checkFileExistsWithoutExtension($fileName, $path)
//    {
//        $result=glob($path.'/'.$fileName.".{jpg,jpeg,png,gif}", GLOB_BRACE);
//
//        if (!empty($result))
//        {
//            return[Arrays::arrayLast(explode("/", $result[0])),
//                explode(".", $result[0])[1]];
//        }
//        return null;
//    }

    //212*150
    /**
     * @param $src - a valid file location
     * @param $dest - a valid file target
     * @param $targetWidth - desired output width
     * @param $targetHeight - desired output height or null
     */
    static public function createThumbnail($filename, $src, $dest, $targetWidth, $targetHeight = null) {



        // 1. Load the image from the given $src
        // - see if the file actually exists
        // - check if it's of a valid image type
        // - load the image resource

        // get the type of the image
        // we need the type to determine the correct loader
        if (!file_exists($src.'\\'.$filename))
        {
            throw new RequestResultException(500, ['errorCode=>IHCTFNE', 'fileName'=>$src.'\\'.$filename]);
        }
        $type = exif_imagetype($src.'\\'.$filename);

        // if no valid type or no handler found -> exit
        if (!$type || !self::IMAGE_HANDLERS[$type]) {
            return null;
        }

        // load the image with the correct loader
        $image = call_user_func(self::IMAGE_HANDLERS[$type]['load'], $src.'\\'.$filename);

        // no image found at supplied location -> exit
        if (!$image) {
            return null;
        }


        // 2. Create a thumbnail and resize the loaded $image
        // - get the image dimensions
        // - define the output size appropriately
        // - create a thumbnail based on that size
        // - set alpha transparency for GIFs and PNGs
        // - draw the final thumbnail

        // get original image width and height
        $width = imagesx($image);
        $height = imagesy($image);

        // maintain aspect ratio when no height set
        if ($targetHeight == null) {

            // get width to height ratio
            $ratio = $width / $height;

            // if is portrait
            // use ratio to scale height to fit in square
            if ($width > $height) {
                $targetHeight = floor($targetWidth / $ratio);
            }
            // if is landscape
            // use ratio to scale width to fit in square
            else {
                $targetHeight = $targetWidth;
                $targetWidth = floor($targetWidth * $ratio);
            }
        }

        // create duplicate image based on calculated target size
        $thumbnail = imagecreatetruecolor($targetWidth, $targetHeight);

        // set transparency options for GIFs and PNGs
        if ($type == IMAGETYPE_GIF || $type == IMAGETYPE_PNG) {

            // make image transparent
            imagecolortransparent(
                $thumbnail,
                imagecolorallocate($thumbnail, 0, 0, 0)
            );

            // additional settings for PNGs
            if ($type == IMAGETYPE_PNG) {
                imagealphablending($thumbnail, false);
                imagesavealpha($thumbnail, true);
            }
        }

        // copy entire source image to duplicate image and resize
        imagecopyresampled(
            $thumbnail,
            $image,
            0, 0, 0, 0,
            $targetWidth, $targetHeight,
            $width, $height
        );


        // 3. Save the $thumbnail to disk
        // - call the correct save method
        // - set the correct quality level

        // save the duplicate version of the image to disk
        $save = call_user_func(
            self::IMAGE_HANDLERS[$type]['save'],
            $thumbnail,
            $dest.'\\'.$filename,
            self::IMAGE_HANDLERS[$type]['quality']
        );
        if ($save !== true)
        {
            throw new RequestResultException(500, ['errorCode'=>'IHTCE']);
        }
        return $save;
    }

    static public function convertImageToBase64String(string $file)
    {
        if (!file_exists($file))
        {
            throw new RequestResultException(500, ['errorCode=>IHCTFNE', 'fileName'=>$file]);
        }
        $imgData = base64_encode(file_get_contents($file));
        $src = 'data: '.mime_content_type($file).';base64,'.$imgData;
        return $src;
    }
}
