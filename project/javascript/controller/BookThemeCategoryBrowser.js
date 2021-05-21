class BookThemeCategoryBrowser extends ControllerParent{

    constructor(){
        super();
        if(! BookThemeCategoryBrowser._instance){
            BookThemeCategoryBrowser._instance = this;
        }
        return BookThemeCategoryBrowser._instance;
    }

    _allLoaded=0;
    _containerHtmlElement
    _mainCategories={}

    init()
    {
        console.log('subscribeBAL');
        SubscriptionHandler.subscribe("bookAttribsLoaded", this, "createCategories")
        this.createCategories()
    }

    // init()
    // {
    //     VSM.call("BookAttributes", "subscribe",  ["setBookTraits","BookThemeCategoryBrowser.fillCategories"]);
    //     // this.subscribe("prepareAllSearch","BookThemeCategoryBrowser.prepareAllSearch")
    //     this.subscribe("prepareMainSearch","BookThemeCategoryBrowser.prepareMainSearch")
    //     this.subscribe("prepareSubSearch","BookThemeCategoryBrowser.prepareSubSearch")
    //
    //     const categories =
    //         VSM.call("BookAttributes", "getCategories")
    //     if (categories !== undefined)
    //     {
    //         console.log(categories)
    //         let cat =[]
    //         cat["category"]=categories
    //         this.fillCategories(cat)
    //     }
    //
    // }

    setContainerHTMLElement(element)
    {
        console.log(1111111111111111111111)
        console.log(element)
        this._containerHtmlElement=element;

        this.increaseAndCheckLoadingCounter();
    }

    increaseAndCheckLoadingCounter()
    {
        this._allLoaded++;
        if (this._allLoaded === 2)
        {
            for (let key in categories['main'])
            {
                this._mainCategories[key].setContainerHTMLElement(this._containerHtmlElement)
                this._mainCategories[key].displayMainCategories()
            }
        }
    }

    createCategories()
    {
        console.log(22222)

        let categories = new BookAttributes().getCategories()
        console.log(categories['main'])
        console.log(this._containerHtmlElement)
        for (let key in categories['main'])
        {
            this._mainCategories[key]=new MainCategoryBrowser(categories['main'][key], key)
        }

        // this.model.categories = cats["category"];
        this.increaseAndCheckLoadingCounter();

    };

    prepareAllSearch()                //alkategóriára kattintás eseménye
    {
        this.model.type='';
        this.model.typeValue='';
        SearchEngine.initSearch(true);
    };

    prepareMainSearch(mainCategory)          //főkategóriára kattintás eseménye
    {
        console.log(mainCategory)

        VSM.call("SearchEngine","delCrit","category");
        console.dir(SearchEngine)

        this.model.type="mainCategory";
        this.model.typeValue = mainCategory;

        console.log(this.model.type)
        console.log(this.model.typeValue)
        VSM.call("PageNavigator","setStart",0);
        VSM.call("SearchEngine","initSearch", false)
        // SearchEngine.initSearch(false);
        console.dir(SearchEngine)
    };

    prepareSubSearch=function(subcategory)                //alkategóriára kattintás eseménye
    {
        console.log(subcategory)

        // const val=mc.attributes[1].value;
        VSM.call("SearchEngine","delCrit","mainCategory");

        // SearchEngine.delCrit("mainCategory");
        this.model.type="category";
        this.model.typeValue=subcategory;
        VSM.call("PageNavigator","setStart",0);
        VSM.call("SearchEngine","initSearch", false)
        //
        // if (typeof PageNavigator!=="undefined")
        //     PageNavigator.setStart(0);
        // SearchEngine.initSearch(false);
    };

    collectCriterions()           //kererső értékekk átadása a keresőmotor számára - SearchEngine
    {
        let type=this.model.type;
        if (type!=="") {
            SearchEngine.setCrit(this.model.type, this.model.typeValue)
        }
    };
}
