class IncludeModel
{
    get actualLevelFileCount() {
        return this._actualLevelFileCount;
    }

    set actualLevelFileCount(value) {
        this._actualLevelFileCount = value;
    }
    get progressFileCount() {
        return this._progressFileCount;
    }

    set progressFileCount(value) {
        this._progressFileCount = value;
    }
    _active=false;
    _loadLevel=0;
    _filesToLoad=[];
    _preparedFilesForLoad=[];
    _progressFileCount;
    _actualLevelFileCount;

    get loadLevel() {
        return this._loadLevel;
    }

    set loadLevel(value) {
        this._loadLevel = value;
    }
    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
    }

    getLevelCount()
    {
        return this._filesToLoad.length;
    }

    set filesToLoad(params) {
        let [files, path, level, callback] = params;
        if (this._filesToLoad === undefined) this._filesToLoad = [];
        if (this._filesToLoad[level] === undefined)
            this._filesToLoad[level] = [];
        this._filesToLoad[level].push([files, path, callback])
    }
    get filesToLoad() {
        return this._filesToLoad;
    }

    prepareFilesForLoad()
    {
        let files;
        if (this._filesToLoad[this._loadLevel] !== undefined) {
            files = this._filesToLoad[this._loadLevel]
        }
        else
            files = [];

        this._actualLevelFileCount=files.length;
        if (files.length !== 0) {
            this._preparedFilesForLoad = [];
            for (let key of files) {
                let [fileName, path, callback] = key;
                if (!Array.isArray(callback)) callback = [callback];
                if (callback.find(value => value ==='fileLoaded') === undefined)
                    callback.push('fileLoaded')
                for (let key2 of key[0]) {
                    if (this._preparedFilesForLoad === undefined) {
                        this._preparedFilesForLoad = []
                    }
                    this._preparedFilesForLoad.push([path+fileName,callback]);
                }
            }
        }
        console.log(this._preparedFilesForLoad)
        return this._preparedFilesForLoad.length;
    }

    shiftPreparedFile()
    {
        return this._preparedFilesForLoad.shift();
    }

    // get preparedFilesForLoad() {
    //     return this._preparedFilesForLoad;
    // }
    //
    // set preparedFilesForLoad(value) {
    //     this._preparedFilesForLoad = value;
    // }
    //
    // addToPreparedFilesForLoad(path, fileName, callback)
    // {
    //     if (!Array.isArray(callback)) callback = [callback];
    //     if (this._preparedFilesForLoad === undefined) {
    //         this._preparedFilesForLoad = []
    //     }
    //     this._preparedFilesForLoad.push([path+fileName,callback]);
    // }
    //

    //

    //
    // set filesToLoad(params) {
    //     let [files, path, level, callback] = params;
    //     if (this._filesToLoad === undefined) this._filesToLoad = [];
    //     if (this._filesToLoad[level] === undefined)
    //         this._filesToLoad[level] = [];
    //     this._filesToLoad[level].push([files, path, callback])
    // }

    //

    //
    //
    // getActualLevelPreparedFileCount()
    // {
    //
    //     return this._preparedFilesForLoad.length;
    // }
    //
    //
    //

    //
    // getActualLevelFiles()
    // {
    //     return (this._filesToLoad[this._loadLevel] !== undefined?
    //         this._filesToLoad[this._loadLevel]:[]);
    // }
    //
    //
    //




}
