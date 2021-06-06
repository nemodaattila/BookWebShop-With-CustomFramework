/**
 * egy könyv modelje a LocalLibrary-ben
 */
class LocalLibraryBookModel {

    /**
     * könyv elsődleges adatait tartalmazó modell
     * @private LocalLibraryBookPrimaryModel
     */
    _primaryData;

    /**
     * könyv elsődleges adatait tartalmazó modell
     * @private LocalLibraryBookSecondaryModel
     */
    _secondaryData;

    /**
     * utolsó adatmódosítási idő
     * @private
     */
    _timeStamp;

    get primaryData() {
        return this._primaryData;
    }

    set primaryData(value) {
        this._primaryData = new LocalLibraryBookPrimaryModel(value);
    }

    get secondaryData() {
        return this._secondaryData;
    }

    set secondaryData(value) {
        this._secondaryData = new LocalLibraryBookSecondaryModel();
    }

    get timeStamp() {
        return this._timeStamp;
    }

    set timeStamp(value) {
        this._timeStamp = value;
    }

}
