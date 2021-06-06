/**
 * model a JS fájlok includolsához (Include.js), bejegyzi az összes betöltendő fájlt, valamint a
 * a betöltés állapotadatait
 */
class IncludeModel {
    /**
     * fut e a betöltési folyamat
     * @type {boolean}
     * @private
     */
    _active = false;

    /**
     *  aktuális betöltési szint, ha nem fut akkor -1
     * @type {number}
     * @private
     */
    _loadLevel = -1;
    /**
     * a betöltendő fájlok tömbje (multidimensonal)
     * @type {[]}
     * @private
     */
    _filesToLoad = [];

    /**
     * az adott szinten tartozó már töltésre előkészített fájlok
     * @type {[]}
     * @private
     */
    _preparedFilesForLoad = [];

    /**
     * az adott szinten hány fájl töltődött be
     * @private
     */
    _progressFileCount;

    /**
     * adott szinten hány betöltendő fájlt van
     * @private
     */
    _actualLevelFileCount;

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

    getLevelCount() {
        return this._filesToLoad.length;
    }

    set filesToLoad([files, path, level, callback]) {
        // let [files, path, level, callback] = params;
        if (this._filesToLoad === undefined) this._filesToLoad = [];
        if (this._filesToLoad[level] === undefined)
            this._filesToLoad[level] = [];
        this._filesToLoad[level].push([files, path, callback])
    }

    get filesToLoad() {
        return this._filesToLoad;
    }

    /**
     * adott szinten lévő fájlok előkészészítése betöltéshez (nem a fájlokat, hanem a neveiket készíti elő)
     * összeállítja a teljes elérési útat, és hozzáadja a 'fileLoader' callback-et
     * @returns {number} előkészített fájlok száma
     */
    prepareFilesForLoad() {
        let files;
        if (this._filesToLoad[this._loadLevel] !== undefined) {
            files = this._filesToLoad[this._loadLevel]
        } else
            files = [];
        this._actualLevelFileCount = files.length;
        if (files.length !== 0) {
            this._preparedFilesForLoad = [];
            for (let [fileNames, path, callback] of files) {
                if (!Array.isArray(callback)) callback = [callback];
                if (callback.find(value => value === 'fileLoaded') === undefined)
                    callback.push('fileLoaded')
                for (let fileName of fileNames) {
                    if (this._preparedFilesForLoad === undefined) {
                        this._preparedFilesForLoad = []
                    }
                    this._preparedFilesForLoad.push([path + fileName, callback]);
                }
            }
        }
        return this._preparedFilesForLoad.length;
    }

    /**
     * visszaad egy betöltendő fájlt és eltávolítja a tömbből
     * @returns {*} a betöltendő fájl neve + hozzávaló callback
     */
    shiftPreparedFile() {
        return this._preparedFilesForLoad.shift();
    }

}
