<?php


namespace core\backend\model;


class DirectoryHelperConfig
{
    private array $excludeFiles=[".",".."];
    private bool $isRecursive = true;
    private ?int $maxDepth = null;
    private bool $withPath = true;

    /**
     * @return array|string[]
     */
    public function getExcludeFiles(): array
    {
        return $this->excludeFiles;
    }

    /**
     * @param array|string[] $excludeFiles
     */
    public function addExcludeFiles(array $excludeFiles): void
    {
        $this->excludeFiles = array_merge($this->excludeFiles,$excludeFiles);
    }

    /**
     * @return bool
     */
    public function isRecursive(): bool
    {
        return $this->isRecursive;
    }

    /**
     * @param bool $isRecursive
     */
    public function setIsRecursive(bool $isRecursive): void
    {
        $this->isRecursive = $isRecursive;
    }

    /**
     * @return int|null
     */
    public function getMaxDepth(): ?int
    {
        return $this->maxDepth;
    }

    /**
     * @param int|null $maxDepth
     */
    public function setMaxDepth(?int $maxDepth): void
    {
        $this->maxDepth = $maxDepth;
    }

    /**
     * @return bool
     */
    public function isWithPath(): bool
    {
        return $this->withPath;
    }

    /**
     * @param bool $withPath
     */
    public function setWithPath(bool $withPath): void
    {
        $this->withPath = $withPath;
    }

}
