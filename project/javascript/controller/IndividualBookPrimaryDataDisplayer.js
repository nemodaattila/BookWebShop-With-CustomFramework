class IndividualBookPrimaryDataDisplayer {
    _view;
    static _rootUrl;
    static _bookTypes;

    constructor(parentElement) {
        this._view = new IndividualBookPrimaryDataDisplayerView(parentElement)
        if (IndividualBookPrimaryDataDisplayer._rootUrl === undefined)
            IndividualBookPrimaryDataDisplayer._rootUrl = new JSCoreController().getRoot()
        if (IndividualBookPrimaryDataDisplayer._bookTypes === undefined)
            IndividualBookPrimaryDataDisplayer._bookTypes = new BookAttributes().getType()
    }

    displayBookData(bookObject)
    {
        this._view.displayData(bookObject, IndividualBookPrimaryDataDisplayer._bookTypes, IndividualBookPrimaryDataDisplayer._rootUrl)
    }
}
