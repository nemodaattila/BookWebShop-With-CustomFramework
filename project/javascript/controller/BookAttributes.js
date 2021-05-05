class BookAttributes extends ControllerParent{

    constructor(){
        super();
        if(! BookAttributes._instance){
            BookAttributes._instance = this;
        }
        return BookAttributes._instance;
    }

    init() {
        // localStorage.setItem('bookAttribs', null)
        console.log(this)
        let localAttribs = JSON.parse(localStorage.getItem("bookAttribs"));
        let attribTimeStamp = 0;
        if (!(localAttribs === "null" ||  localAttribs === null))
        {
            if (typeof localAttribs.date === "string")
                localAttribs.date=new Date(localAttribs.date)
           let acttime=new Date()
            attribTimeStamp=(acttime.getTime()-localAttribs.date.getTime())
        }

        if (localAttribs === "null" ||  localAttribs === null || attribTimeStamp>3600000) {
            SubscriptionHandler.subscribe("setBookAttribs", this, "setBookAttribs", true)
            console.log('ajax');
            let ac = new AjaxCaller(this)
            ac.targetUrl = JSCore.getRoot()+"/book/metadata/";
            ac.requestType = 'GET';
            ac._subscriptionCallWord="setBookAttribs";
            console.log(ac)
            ac.send();
            // AjaxCaller.sendPostRequest("BookMetaDataGetter", {}, this, "setBookAttribs")
        }
        else
        {
            this.setBookAttribs(localAttribs)
        }
    }

    setBookAttribs(attribs)
    {
        this.model.setBookAttribs(attribs)
        attribs.date=new Date();

        console.log(attribs)
        console.log(typeof attribs.date)
        localStorage.setItem('bookAttribs', JSON.stringify(attribs))
    }

    //DO get minden attribnak
    getCategories()
    {
        console.log(this.model.category)
        return this.model.category;
    }

}
