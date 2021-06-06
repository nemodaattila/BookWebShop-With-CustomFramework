class SearchEngineModel {

    /**
     * keresési eltolás pl-: 2.oldal
     * @type {number}
     * @private
     */
    _offset = 0;

    /**
     * hány darab maximum
     * @type {number}
     * @private
     */
    _limit = 10;

    /**
     * rendezési paraméter
     * @type {string}
     * @private
     */
    _order = "Title";

    /**
     * rendezés iránya
     * @type {string}
     * @private
     */
    _orderDir = "ASC";

    /**
     * előző keresési paraméter LocalOrdering összehasonlításhoz
     * @type {[]}
     * @private
     */
    _prevCrit = [];

    /**
     * új keresési paraméter  LocalOrdering összehasonlításhoz
     * @type {[]}
     * @private
     */
    _newCrit = [];

    /**
     * keresési paraméterek kereséshez
     * @type {{}}
     * @private
     */
    _crit = {};

    /**
     * objektumok melyek befolyásolják a keresést
     * @type {[]}
     * @private
     */
    _criteriumSourceObject = [];

    get limit() {
        return this._limit;
    }

    set offset(value) {
        this._offset = value;
    }

    setPrevCrit() {
        this._prevCrit[0] = JSON.stringify(this._crit);
        this._prevCrit[1] = this._limit;
    }

    getPrevCrit() {
        return this._prevCrit;
    }

    get criteriumSourceObject() {
        return this._criteriumSourceObject;
    }

    addCriteriumSourceObject(value) {
        this._criteriumSourceObject.push(value);
    }

    setCrit(type, value)               //keresési kritérium beállítása
    {
        this._crit[type] = value;

    };

    delCrit(type)                     //keresési kritérium beállítása
    {
        delete this._crit[type]
    };

    setNewCrit() {

        this._newCrit[0] = JSON.stringify(this._crit);
        this._newCrit[1] = this._limit;
    }

    getNewCrit() {
        return this._newCrit;
    }

    /**
     * alapértelmezésre állítás
     */
    setDefault() {
        this._offset = 0;
        this._limit = 10;
        this._order = "Title";
        this._orderDir = "ASC";
        this._crit = {};
    };

    /**
     * keresési paraméterek visszadása
     * @returns {{offset: number, criterium: string, limit: number, orderDir: string, order: string}}
     */
    getSearchParams() {
        return {
            criterium: JSON.stringify(this._crit),
            offset: this._offset,
            limit: this._limit,
            order: this._order,
            orderDir: this._orderDir
        };
    }

    /**
     * sorrendezés és limit beállítása
     * @param sort
     * @param dir
     * @param quantity
     */
    setOrderAndCount(sort, dir, quantity) {
        this._order = sort;
        this._orderDir = dir;
        this._limit = quantity;
    }
}
