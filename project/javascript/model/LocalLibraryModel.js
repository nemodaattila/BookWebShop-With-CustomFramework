/**
 * az összes eddig megjelenített könyv adatait tartalmazza
 */
class LocalLibraryModel {

    /**
     * könyvek adatmodellje, LocalLibraryBookModel-leket tartalmaz
     * @type {{}}
     * * @private
     */
    _books = {};
    get books() {
        return this._books;
    }

    set books(value) {
        this._books = value;
    }

    /**
     * megnézi, az adatt isbn-nel létezik-e könyv
     * @param isbn a könyv isbn-je
     * @returns LocalLibraryBookModel
     */
    checkBookInLibrary(isbn) {
        return this._books[isbn];
    }

    /**
     * létrehoz egy LocalLibraryBookModel objektetm és hozzáadja a primary adatokat
     * @param isbn könyv isbn-je egyben index
     * @param data a primary adatok
     */
    addBookWithPrimaryData(isbn, data) {
        this._books[isbn] = new LocalLibraryBookModel();
        this._books[isbn].primaryData = data;
        this._books[isbn].timeStamp = new Date()
    }

    /**
     * egy könyv primary adatait adja vissza, ha nem létezik null
     * @param isbn könyv isbn-je
     * @returns {null|LocalLibraryBookPrimaryModel}
     */
    getOneBookPrimaryData(isbn) {
        if (this._books[isbn] === undefined)
            return null;
        return this._books[isbn]['primaryData']
    }

    /**
     * LocalStorage-ből lekérdezett könyvadatokból betölti azokat melyek 1 napnál nem régebbiek
     * @param books array
     */
    fillBooksFromObjectLessThenOneDay(books) {
        let actTime = new Date()
        let keys = Object.keys(books)
        for (let isbn of keys) {
            let timeStamp = (actTime.getTime() - new Date(books[isbn]['_timeStamp']).getTime())
            if (timeStamp < 3600000) {
                this._books[isbn] = new LocalLibraryBookModel();
                this._books[isbn].primaryData = books[isbn]['_primaryData'];
                this._books[isbn].secundaryData = books[isbn]['_secondaryData'];
                this._books[isbn].timeStamp = new Date(books[isbn]['_timeStamp']);
            }
        }
    }
}
