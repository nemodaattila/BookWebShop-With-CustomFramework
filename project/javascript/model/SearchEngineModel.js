class SearchEngineModel{
    get quantity() {
        return this._quantity;
    }
    set skip(value) {
        this._skip = value;
    }


    _prevCrit=[];

    setPrevCrit() {
        this._prevCrit[0] = JSON.stringify(this._crit);
        this._prevCrit[1] = this._quantity;
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
        this._newCrit[1]= this._quantity;
    }

    getNewCrit() {
        return this._newCrit;
    }


    _skip=0;
    _quantity=10;
    _order="Title";
    _orderDir="ASC";

    setDefault()                      //kereső motor defaultra állítása
    {
        this._skip=0;
        this._quantity=10;
        this._order="Title";
        this._orderDir="ASC";
        this._crit={};
    };

    getSearchParams()
    {
        return {
            criterium: JSON.stringify(this._crit),
            skip: this._skip,
            quantity: this._quantity,
            order: this._order,
            orderDir: this._orderDir
        };
    }

    setOrderAndCount(sort, dir, quantity)
    {

        this._order=sort;
        this._orderDir = dir;
        this._quantity = quantity;
    }
}
