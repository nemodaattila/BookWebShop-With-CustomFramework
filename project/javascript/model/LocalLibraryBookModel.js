class LocalLibraryBookModel {

    _primaryData;
    _secundaryData;

    get primaryData() {
        return this._primaryData;
    }

    set primaryData(value) {
        this._primaryData = new LocalLibraryBookPrimaryModel(value);
    }

    get secundaryData() {
        return this._secundaryData;
    }

    set secundaryData(value) {
        this._secundaryData = new LocalLibraryBookSecundaryModel();
    }

    _timeStamp;

    get timeStamp() {
        return this._timeStamp;
    }

    set timeStamp(value) {
        this._timeStamp = value;
    }

}
