/**
 * a már lekérdezett könyvek adatait tárolja, kezeli - a LocalStorage-el együttműködve
 */
class LocalLibrary extends ControllerParent {

    constructor() {
        super();
        if (!LocalLibrary._instance) {
            LocalLibrary._instance = this;
        }
        return LocalLibrary._instance;
    }

    init() {
        EventSubscriptionHandler.subscribe("getBooks", this, "checkListInLocalLibrary")
        EventSubscriptionHandler.subscribe("primaryBookData", this, "addBookPrimaryToLocalLibrary")
        this.fillBookSfromLocalStorage();
    }

    /**
     * kiszedi a LocalStorage-ból a tárolt könyveket, amelyik 1 napnál nem régebbi menti a modelbe
     * LocalSTorage-t model alapján frissíti
     */
    fillBookSfromLocalStorage() {
        let localLibrary = localStorage.getItem('localLibrary');
        // localLibrary = null
        if (localLibrary !== null ) {
            this.model.fillBooksFromObjectLessThenOneDay(JSON.parse(localLibrary));
            this.saveLocalLibraryToLocalStorage();
        }
    }

    /**
     * egy könyv elsődleges adatait adja vissza isbn alapján
     * @param isbn könyv isbn-je
     * @returns {*}
     */
    getOneBookPrimary(isbn) {
        return this.model.getOneBookPrimaryData(isbn)
    }

    /**
     * megnézi, hogy a listában szereplő könyvek (isbn alapján) szerepelnek e a LocalLibrary model-ben
     * @param isbnList isbnlist[]
     */
    checkListInLocalLibrary(isbnList) {
        console.log(isbnList)
        // this.checkIsbnInLocalLibrary(isbnList['list'][0])
        for (let isbn of isbnList['list']) {
            this.checkIsbnInLocalLibrary(isbn)
        }
    }

    /**
     * megnézi hogy az adatt könyv (isbn) szerepel-e a LocalLibrary model-ben, ha requestet küld a szervernek az adatokért
     * @param isbn a könyv isbn-je
     */
    checkIsbnInLocalLibrary(isbn) {
        let data = this.model.checkBookInLibrary(isbn)
        if (data === undefined) {
            let ac = new AjaxCaller()
            ac.targetUrl = JSCore.getRoot() + "/book/primaryData/" + isbn;
            ac.requestType = 'GET';
            ac._subscriptionCallWord = "primaryBookData";
            ac.send();
        }
    }

    /**
     * egy könyv elsődleges adatait hozzáadja a LocalLibrary modelhez és frissiti a LocalStrorage-t is
     * triggert küld ki a frissytésről
     * @param bookData könyv elsődleges adatok[]
     */
    addBookPrimaryToLocalLibrary(bookData) {
        this.model.addBookWithPrimaryData(bookData['isbn'], bookData)
        this.saveLocalLibraryToLocalStorage()
        EventSubscriptionHandler.triggerSubscriptionCall('primaryDataArrived', bookData['isbn'], 200)
    }

    /**
     * menti a modelt a LocalStorage-be (frissítés)
     */
    saveLocalLibraryToLocalStorage() {
        localStorage.setItem('localLibrary', JSON.stringify(this.model.books));
    }

}
