<?php

namespace core\backend\model;

/**
 * Class DirectoryHelperConfig könyvtárvizsgálatokat támogató, a vizsgálat feltételeit tartalmaző segédosztály
 * @package core\backend\model
 */
class DirectoryHelperConfig
{
    /**
     * @var array|string[] a könyvtár ezen elemeit nem vizsgálja
     */
    private array $excludeFiles = [".", ".."];

    /**
     * @var bool ha true akkor az almappákat is átvizsgálja
     */
    private bool $isRecursive = true;

    /**
     * @var int|null maximum mélység ameddig vizsgál | null => végtelen
     */
    private ?int $maxDepth = null;

    /**
     * @var bool ha true a fájlokat elérési úttal együtt adja vissza, ha false csak filenevet
     */
    private bool $withPath = true;

    public function getExcludeFiles(): array
    {
        return $this->excludeFiles;
    }

    /**
     * fájlok hozzáadása exclude-hoz
     * @param array $excludeFiles a kihagyandó fájlok tömbje
     */
    public function addExcludeFiles(array $excludeFiles): void
    {
        $this->excludeFiles = array_merge($this->excludeFiles, $excludeFiles);
    }

    public function isRecursive(): bool
    {
        return $this->isRecursive;
    }

    public function setIsRecursive(bool $isRecursive): void
    {
        $this->isRecursive = $isRecursive;
    }

    public function getMaxDepth(): ?int
    {
        return $this->maxDepth;
    }

    public function setMaxDepth(?int $maxDepth): void
    {
        $this->maxDepth = $maxDepth;
    }

    public function isWithPath(): bool
    {
        return $this->withPath;
    }

    public function setWithPath(bool $withPath): void
    {
        $this->withPath = $withPath;
    }

}
