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
        SubscriptionHandler.subscribe("getBooks", this, "checkListInLocal")
    }

    checkListInLocal(isbnList)
    {
        console.log(isbnList)
        this.checkIsbnInLocal(isbnList['list'][0])
        // for (let isbn of isbnList['list'])
        // {
        //     this.checkIsbnInLocal(isbn)
        // }
    }

    checkIsbnInLocal(isbn)
    {
        let bookData = localStorage.getItem(isbn);
        let timeStamp
        if (bookData !== null)
        {
            bookData=JSON.parse(bookData)
            let acttime=new Date()
            timeStamp=(acttime.getTime()-bookData.timeStamp.getTime())
        }

        if (bookData === null || timeStamp>3600000)
        {
            let ac = new AjaxCaller()
            ac.targetUrl = JSCore.getRoot()+"/book/primaryData/"+isbn;
            ac.requestType = 'GET';
            ac._subscriptionCallWord="primaryBookData";
            console.log(ac)
            ac.send();
        }

    }

}
