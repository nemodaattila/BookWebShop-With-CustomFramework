/**
 * egy konyv elsődleges adatainak megjelenítsésére szolgáló controller
 */
class IndividualBookPrimaryDataDisplayer {
    /**
     * view class
     * @private
     */
    _view;

    /**
     *  url root a linkek készítéséhez
     * @private
     */
    static _rootUrl;

    /**
     * könyvtipusok a tipusmegjelenítéshez
     * @private
     */
    static _bookTypes;

    constructor(parentElement) {
        this._view = new IndividualBookPrimaryDataDisplayerView(parentElement)
        if (IndividualBookPrimaryDataDisplayer._rootUrl === undefined)
            IndividualBookPrimaryDataDisplayer._rootUrl = new JSCoreController().getRoot()
        if (IndividualBookPrimaryDataDisplayer._bookTypes === undefined)
            IndividualBookPrimaryDataDisplayer._bookTypes = new BookAttributes().getType()
    }

    /**
     * adatok megjelenítése
     * @param bookObject megjelenitendő adatok
     */
    displayBookData(bookObject) {
        this._view.displayData(bookObject, IndividualBookPrimaryDataDisplayer._bookTypes, IndividualBookPrimaryDataDisplayer._rootUrl)
    }

    /**
     * a view DOM megszüntetése
     */
    remove() {
        this._view.remove();
    }
}
