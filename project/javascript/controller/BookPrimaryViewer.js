/**
 * több könyv elsődleges adatainak megjelenítéséhez szolgál keretet
 */
class BookPrimaryViewer extends ControllerParent {

    /**
     * tartalmazó html DOM element
     * @private
     */
    _containerHtmlElement

    /**
     * lokális künyvtár
     * @private
     */
    _localLib

    /**
     * aktuális keresési paramétereknek megfelelő könyvek megjelenítő objektumai
     * @type {{}}
     * @private
     */
    _actualListObjects = {};

    constructor() {
        super();
        if (!BookPrimaryViewer._instance) {
            BookPrimaryViewer._instance = this;
        }
        return BookPrimaryViewer._instance;
    }

    init() {
        EventSubscriptionHandler.subscribe("getBooks", this, "prepareContainers")
        EventSubscriptionHandler.subscribe("primaryDataArrived", this, "getOneBookDataFromLocalLibrary")
        this._localLib = new LocalLibrary()
    }

    /**
     * egyéni könyv konténerek előklészítése
     * @param list megjelenítenő könyvek isbn listája
     * @param count összes paraméternek megfelelő könyv száma
     */
    prepareContainers({list: list, count: count}) {
        this.resetViewer();
        if (parseInt(count) > 0) {
            this.createBookObjects(list);
            this.getBookDataFromLocalLibrary(list);
        } else {
            this.writeNonFound();
        }
    }

    /**
     * a megjelenitő objektumok kiürítése, törlése
     */
    resetViewer() {
        let divs = Object.keys(this._actualListObjects)
        if (divs !== undefined) {
            for (let key of divs) {
                this._actualListObjects[key].remove();
            }
            this._actualListObjects = {};
        }
        document.getElementById(this._containerHtmlElement).innerText = '';
    }

    /**
     * könyv adatmegjelenítő létrehozása
     * @param isbnList megjelenítendő könyvek isbnlistája
     */
    createBookObjects(isbnList) {
        isbnList.map(value => {
            this._actualListObjects[value] = new IndividualBookPrimaryDataDisplayer(this._containerHtmlElement);
        })
    }

    /**
     * könvyek adatainak lekérése a lokális adatbázisból
     * @param isbns
     */
    getBookDataFromLocalLibrary(isbns) {
        for (let key of isbns) {
            this.getOneBookDataFromLocalLibrary(key)
        }
    }

    /**
     * egy könyv adatainak lekérése az lokális adatb-ből, elküldés megjelenítésre
     * @param isbn isbn kód
     */
    getOneBookDataFromLocalLibrary(isbn) {
        let primData = this._localLib.getOneBookPrimary(isbn)
        if (primData !== undefined && primData !== null) {
            this._actualListObjects[isbn].displayBookData(primData)
        }
    }

    /**
     * tartalmaző DOm element beállítása
     * @param element
     */
    setContainerHTMLElement(element) {
        this._containerHtmlElement = element;
    }

    /**
     * ha nincs találat egyszerűen kiirja
     * @DO átgondolni??
     */
    writeNonFound() {
        document.getElementById(this._containerHtmlElement).innerText = 'Nincs találat';
    }

    // static offlineOrderer(order, dir) {
    //     let newOrder = this.model.sortActualBookList(order, dir);
    //     this.addBooks([newOrder, newOrder.length])
    //     // this.view.offlineOrderer(newOrder)
    // }

}
