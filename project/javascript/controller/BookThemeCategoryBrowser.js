/**
 * menü könyvek kategória (téma) alapú kereséséhez
 */
class BookThemeCategoryBrowser extends ControllerParent {

    constructor() {
        super();
        if (!BookThemeCategoryBrowser._instance) {
            BookThemeCategoryBrowser._instance = this;
        }
        return BookThemeCategoryBrowser._instance;
    }

    /**
     * minden szükséges elem betöltődött-e (kategóriák + html element)
     * @type {number}
     * @private
     */
    _allLoaded = 0;

    /**
     * kategóriákat megjelenítő objektek
     * @type {{}}
     * @private
     */
    _mainCategoryObjects = {}

    init() {
        EventSubscriptionHandler.subscribe("bookAttribsLoaded", this, "createCategories")
        EventSubscriptionHandler.subscribe("mainCategorySearch", this, "prepareMainSearch")
        EventSubscriptionHandler.subscribe("categorySearch", this, "prepareSubSearch")
        this.createCategories()
    }

    /**
     * DOM element beállítása ahova a bongészősáv kerül
     * @param elementID
     */
    setContainerHTMLElement(elementID) {
        this.view.setContainerHtmlElement(elementID)
        this.increaseAndCheckLoadingCounter();
    }

    /**
     * ellenőrzi hogy betöltődött e minden szükséges adat |
     * containerElement + a kategóriák |
     * ha igen megjelenítia főkategóriákat
     */
    increaseAndCheckLoadingCounter() {
        this._allLoaded++;
        if (this._allLoaded > 1) {
            let listElement = this.view.listElement
            this.view.displayListAndAllSearch();
            this.addEventToAllSearch();
            for (let key in this._mainCategoryObjects) {
                this._mainCategoryObjects[key].setContainerHTMLElement(listElement)
                this._mainCategoryObjects[key].displayMainCategory()
            }
        }
    }

    /**
     * ha megérkeztek a kategória adatok létrehoz mindegyukhez egy objektumot
     */
    createCategories() {
        let [mainCats, subCats] = new BookAttributes().getCategories()
        if (mainCats !== undefined) {
            for (let key in mainCats) {
                if (mainCats.hasOwnProperty(key))
                    this._mainCategoryObjects[key] = new MainCategoryBrowser(mainCats[key], key, subCats[key])
            }
            this.increaseAndCheckLoadingCounter();
        }
    };

    /**
     * event hozzáadása a globális/ kategóriafüggetlen keresőhöz
     */
    addEventToAllSearch() {
        this.view.allSearchElement.addEventListener('click', () => {
            this.prepareAllSearch();
        })
    }

    /**
     * kategróriafüggetlen keresés futtatéása
     */
    prepareAllSearch() {
        this.model.type = '';
        this.model.typeValue = '';
        new SearchEngine().initSearch(true);
    };

    /**
     * főkategória alapján törénő keresés indítása
     * @param mainCategoryID a főkategória ID-je
     */
    prepareMainSearch(mainCategoryID) {
        this.model.type = "MainCategory";
        this.model.typeValue = mainCategoryID;
        new SearchEngine().initSearch(false)
    };

    /**
     * alkategória alapú keresés indítása
     * @param categoryID alkategória ID
     */
    prepareSubSearch(categoryID) {
        this.model.type = "Category";
        this.model.typeValue = categoryID;
        new SearchEngine().initSearch(false)
    };

    /**
     * SearchEngine számára keresőparaméter átadás
     */
    collectCriterions()           //kererső értékekk átadása a keresőmotor számára - SearchEngine
    {
        let type = this.model.type;
        if (type !== "") {
            se = new SearchEngine()
            if (type === 'Category') se.delCrit("MainCategory");
            if (type === 'MainCategory') se.delCrit("Category");
            se.setCrit(this.model.type, this.model.typeValue)
        }
    };
}
