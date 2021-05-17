class SearchEngineModel{
    get limit() {
        return this._limit;
    }
    set offset(value) {
        this._offset = value;
    }


    _prevCrit=[];

    setPrevCrit() {
        this._prevCrit[0] = JSON.stringify(this._crit);
        this._prevCrit[1] = this._limit;
    }

    getPrevCrit() {
        return this._prevCrit;
    }

    _criteriumSourceObject=[];

    get criteriumSourceObject() {
        return this._criteriumSourceObject;
    }

    addCriteriumSourceObject(value) {
        this._criteriumSourceObject.push(value);
    }


    _crit={};
    setCrit(type,value)               //keresési kritérium beállítása
    {
        this._crit[type]=value;

    };

    delCrit(type)                     //keresési kritérium beállítása
    {
        delete this._crit[type]
    };

    _newCrit=[];

    setNewCrit() {

        this._newCrit[0]= JSON.stringify(this._crit);
        this._newCrit[1]= this._limit;
    }

    getNewCrit() {
        return this._newCrit;
    }


    _offset=0;
    _limit=10;
    _order="Title";
    _orderDir="ASC";

    setDefault()                      //kereső motor defaultra állítása
    {
        this._offset=0;
        this._limit=10;
        this._order="Title";
        this._orderDir="ASC";
        this._crit={};
    };

    getSearchParams()
    {
        return {
            criterium: JSON.stringify(this._crit),
            offset: this._offset,
            limit: this._limit,
            order: this._order,
            orderDir: this._orderDir
        };
    }

    setOrderAndCount(sort, dir, quantity)
    {

        this._order=sort;
        this._orderDir = dir;
        this._limit = quantity;
    }
}
