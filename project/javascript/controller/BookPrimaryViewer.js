class BookPrimaryViewer extends ControllerParent{

    _containerHtmlElement
    _localLib

    _actualList={};
    _listKeys

    constructor(){
        super();
        if(! BookPrimaryViewer._instance){
            BookPrimaryViewer._instance = this;
        }
        return BookPrimaryViewer._instance;
    }

    init()
    {
        SubscriptionHandler.subscribe("getBooks", this, "prepareContainers")
        SubscriptionHandler.subscribe("primaryDataArrived", this, "getOneBookDataFromLocalLibrary")
        this._localLib = new LocalLibrary()
    }

    prepareContainers(data)
    {
        this.createBookObjects(data['list']);
        this.getBookDataFromLocalLibrary(data['list']);
    }

    createBookObjects(isbnList)
    {
        isbnList.map(value=> {
            this._actualList[value]=new IndividualBookPrimaryDataDisplayer(this._containerHtmlElement);
        })
    }

    getBookDataFromLocalLibrary(isbns) {
        for (let key of isbns)
        {
            this.getOneBookDataFromLocalLibrary(key)
        }
    }

    getOneBookDataFromLocalLibrary(isbn)
    {
        let primData = this._localLib.getOneBookPrimary(isbn)
        console.log(primData)
        if (primData !== undefined && primData !== null)
        {
            this._actualList[isbn].displayBookData(primData)
        }
    }

    setContainerHTMLElement(element)
    {
        this._containerHtmlElement=element;
    }

    // static offlineOrderer(order, dir) {
    //     let newOrder = this.model.sortActualBookList(order, dir);
    //     this.addBooks([newOrder, newOrder.length])
    //     // this.view.offlineOrderer(newOrder)
    // }


}
