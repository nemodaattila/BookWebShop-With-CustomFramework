class LocalLibrary extends ControllerParent {

    constructor(){
        super();
        if(! LocalLibrary._instance){
            LocalLibrary._instance = this;
        }
        return LocalLibrary._instance;
    }

    init()
    {
        SubscriptionHandler.subscribe("getBooks", this, "checkListInLocalLibrary")
        SubscriptionHandler.subscribe("primaryBookData", this, "addBookPrimaryToLocalLibrary")
        this.fillBookSfromLocalStorage();
    }

    fillBookSfromLocalStorage()
    {
        let localLibrary = localStorage.getItem('localLibrary');
        console.log('!!!!!!!!')
        // localLibrary=null;
        if (localLibrary !== null)
        {
            this.model.fillBooksFromObjectLessThenOneDay(JSON.parse(localLibrary));
            console.log(this.model.book)
            this.saveLocalLibraryToLocalStorage();
        }
        console.log('!!!!!!!!')
    }

    getOneBookPrimary(isbn)
    {
        return this.model.getOneBookPrimaryData(isbn)
    }

    checkListInLocalLibrary(isbnList)
    {
        console.log(isbnList)
        // this.checkIsbnInLocalLibrary(isbnList['list'][0])
        for (let isbn of isbnList['list'])
        {
            this.checkIsbnInLocalLibrary(isbn)
        }
    }

    checkIsbnInLocalLibrary(isbn)
    {
        let data = this.model.checkBookInLibrary(isbn)
        if (data === undefined)
        {
            console.log('BOOKNOTINLOCAL')
            let ac = new AjaxCaller()
            ac.targetUrl = JSCore.getRoot()+"/book/primaryData/"+isbn;
            ac.requestType = 'GET';
            ac._subscriptionCallWord="primaryBookData";
            console.log(ac)
            ac.send();
        }
    }

    addBookPrimaryToLocalLibrary(bookData)
    {
        this.model.addBookWithPrimaryData(bookData['isbn'], bookData)
        this.saveLocalLibraryToLocalStorage()
        SubscriptionHandler.initSubscription('primaryDataArrived', bookData['isbn'], 200)
    }

    saveLocalLibraryToLocalStorage()
    {
        localStorage.setItem('localLibrary', JSON.stringify(this.model.book));
    }

}
