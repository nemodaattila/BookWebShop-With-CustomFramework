class SearchEngine extends ControllerParent{

    constructor(){
        super();
        if(! SearchEngine._instance){
            SearchEngine._instance = this;
        }
        return SearchEngine._instance;
    }

    initSearch(setDefault=true)
    {
        console.log(this)
        let isLocal=false;
        this.model.setPrevCrit()
        if (setDefault) this.model.setDefault();
        this.collectCriterions();
        this.checkJSCoreForData();
        this.model.setNewCrit();
        isLocal=this.localOrderChecker();
        let params=this.model.getSearchParams();
        console.log(isLocal)
        console.log(params)
        if (isLocal===false)
        {
            let ac = new AjaxCaller()
            ac.targetUrl = JSCore.getRoot()+"/book/withParameter/";
            ac.requestType = 'POST';
            ac.addCustomHeader('Content-Type', 'application/json')
            ac.postFields = params;
            ac._subscriptionCallWord="getBooks";
            console.log(ac)
            ac.send();
            // params.tasek="searchBooks",
            //     console.log(params);
            // AjaxCaller.sendPostRequest("BookListGetter",params,this, "getBooks")
        }
        else
        {
            if (ContentHandler !== undefined)
                ContentHandler.offlineOrderer(params.order,params.orderDir)
        }
    }

    localOrderChecker()           //lokális kereslés feltételei
    {
        let isLocal=false;
        let prevCrit=this.model.getPrevCrit();
        let newCrit=this.model.getNewCrit();
        if (typeof PageNavigator === "undefined") return false;
        console.log(this.model.getSearchParams()['order'])
        if (this.model.getSearchParams()['order']==="Year") return false;
        let count=PageNavigator.getLastSearchResultQuantity()
        if (prevCrit[0]===newCrit[0])
        {
            if ((count<=10)||(count<=prevCrit[1])&&(prevCrit[1]<=newCrit[1]))
            {
                isLocal=true;
            }
            if (count>newCrit[1])
            {
                return false;
            }
        }
        console.log(isLocal);
        return isLocal;
    };

    collectCriterions()
    {                  //keresési kritériumok begyüjtése
        this.model.criteriumSourceObject.map(value=>{value.collectCriterions()});
    };

    checkJSCoreForData()
    {
        //DO check
        let data = JSCore.getRequestData()
        if (data["quicksearch"]!==undefined)
        {
            this.model.setCrit("Quick", data["quicksearch"])
        }

        if (data["crit"] !== undefined)
        {
            if ((data["crit"]==="Tags")&&(!Array.isArray(data["value"])))
            {
                data["value"] = [data["value"]];

            }

            SearchEngine.setCrit(data["crit"],data["value"]);
        }

    }

    addCriteriumSourceObject(obj)     //kritérium adat forrás hozzáadása
    {
        this.model.addCriteriumSourceObject(obj);
    };

    setCrit(type,value)               //keresési kritérium beállítása
    {
        this.model.setCrit(type,value);
    };

    delCrit(type)                     //keresési kritérium beállítása
    {
        this.model.delCrit(type);
    };

    setSkip(value)
    {
        this.model.skip=value;
    }

    getQuantityPerPage()
    {
        return this.model.quantity
    }

    setOrderAndCount(sort,dir,quantity)
    {
        this.model.setOrderAndCount(sort,dir,quantity);
    }
}
