/**
 * keresőparaméterek megadása, és a http request elküldése
 * könyvek kereséséhez (isbn listát ad vissza, fel lehet rá iratkozni - getBooks)
 */
class SearchEngine extends ControllerParent {

    constructor() {
        super();
        if (!SearchEngine._instance) {
            SearchEngine._instance = this;
        }
        return SearchEngine._instance;
    }

    /**
     * keresés inicializálása
     * http GET request összeállitása elküldése
     * @param setDefault
     */
    initSearch(setDefault = true) {
        this.model.setPrevCrit()
        if (setDefault) this.model.setDefault();
        this.collectCriterions();
        this.checkJSCoreForData();
        this.model.setNewCrit();
        let isLocal = this.localOrderChecker();
        let params = this.model.getSearchParams();
        if (isLocal === false) {
            let ac = new AjaxCaller()
            ac.targetUrl = JSCore.getRoot() + "/book/withParameter/";
            ac.requestType = 'POST';
            ac.addCustomHeader('Content-Type', 'application/json')
            ac.postFields = params;
            ac._subscriptionCallWord = "getBooks";
            ac.send();
        } else {
            //DO
            if (ContentHandler !== undefined)
                ContentHandler.offlineOrderer(params.order, params.orderDir)
        }
    }

    /**
     * ellenőrzi a legutólsó keresés alapján, hogy el kell e küldeni új http-requestet
     * pl: csak 3 könyv van, de a sorrenden változtatunk akkor nem kell request
     * csak újra meg kell jeleníteni az előző eredményt más sorrendben
     * @returns {boolean} true ha nem kell request
     */
    localOrderChecker()           //lokális kereslés feltételei
    {
        let isLocal = false;
        let prevCrit = this.model.getPrevCrit();
        let newCrit = this.model.getNewCrit();
        if (typeof PageNavigator === "undefined") return false;
        if (this.model.getSearchParams()['order'] === "Year") return false;
        let count = PageNavigator.getLastSearchResultQuantity()
        if (prevCrit[0] === newCrit[0]) {
            if ((count <= 10) || (count <= prevCrit[1]) && (prevCrit[1] <= newCrit[1])) {
                isLocal = true;
            }
            if (count > newCrit[1]) {
                return false;
            }
        }
        return isLocal;
    };

    /**
     * minden megadott objecttől lekéri a keresési paramétereket
     */
    collectCriterions() {
        this.model.criteriumSourceObject.map(value => {
            value.collectCriterions()
        });
    };

    /**
     * a JScore-tól lekéri az előző keresés paramétereit, speciális parmétereket keres
     * !! a szervernek vissza kell őket adnia ehhez !!
     */
    checkJSCoreForData() {
        //DO check
        let data = JSCore.getRequestData()
        if (data["quicksearch"] !== undefined) {
            this.model.setCrit("Quick", data["quicksearch"])
        }
        if (data["crit"] !== undefined) {
            if ((data["crit"] === "Tags") && (!Array.isArray(data["value"]))) {
                data["value"] = [data["value"]];
            }
            this.setCrit(data["crit"], data["value"]);
        }
    }

    /**
     * onjektum hozzáadása, amik keresőparamétereket állíthatnak be
     * @param obj objektum
     */
    addCriteriumSourceObject(obj) {
        this.model.addCriteriumSourceObject(obj);
    };

    /**
     * kritérium/paraméter megadása
     * @param type kritérium tipusa
     * @param value krirérium értéke
     */
    setCrit(type, value) {
        this.model.setCrit(type, value);
    };

    /**
     * kritérium törlése
     * @param type a kritérium neve/tipusa
     */
    delCrit(type) {
        this.model.delCrit(type);
    };

    /**
     * offset paraméter megadása pl: 1. 10 nem kell -> lapozás
     * @param value
     */
    setOffset(value) {
        this.model.offset = value;
    }

    /**
     * megjeleníterótt elemek száma
     * @todo átgondolni
     * @returns {*}
     */
    getQuantityPerPage() {
        return this.model.limit
    }

    /**
     * sorrendezési és darabszám adatok megadása
     * @param sort attributum ami szerint sorrendez
     * @param dir a sorrendezés iránya
     * @param quantity kért elemek száma
     */
    setOrderAndCount(sort, dir, quantity) {
        this.model.setOrderAndCount(sort, dir, quantity);
    }
}
