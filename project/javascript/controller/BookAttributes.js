/**
 * könyvek metaadatait tárolja, kezeli
 */
class BookAttributes extends ControllerParent {

    constructor() {
        super();
        if (!BookAttributes._instance) {
            BookAttributes._instance = this;
        }
        return BookAttributes._instance;
    }

    /**
     * megnézi hogy az adatok a LocaStorageBen vannak-e , és 1 napnél frissebbek-e
     * ha igen beolvassa, ha nem requestet küöld a szervernek
     */
    init() {
        // localStorage.setItem('bookAttribs', null)
        let localAttribs = JSON.parse(localStorage.getItem("bookAttribs"));
        let attribTimeStamp = 0;
        if (!(localAttribs === "null" || localAttribs === null)) {
            if (typeof localAttribs.date === "string")
                localAttribs.date = new Date(localAttribs.date)
            let acttime = new Date()
            attribTimeStamp = (acttime.getTime() - localAttribs.date.getTime())
        }

        if (localAttribs === "null" || localAttribs === null || attribTimeStamp > 3600000) {
            EventSubscriptionHandler.subscribe("setBookAttribs", this, "setBookAttribs", true)
            let ac = new AjaxCaller()
            ac.targetUrl = JSCore.getRoot() + "/book/metadata/";
            ac.requestType = 'GET';
            ac._subscriptionCallWord = "setBookAttribs";
            ac.send();
        } else {
            this.setBookAttribs(localAttribs)
        }
    }

    /**
     * menti a kapott adatokat a modellbe, és eventet küld ki a SubscriptionHandlernek
     * @param attribs a metaadatok
     */
    setBookAttribs(attribs) {
        this.model.setBookAttribs(attribs)
        attribs.date = new Date();
        localStorage.setItem('bookAttribs', JSON.stringify(attribs))
        EventSubscriptionHandler.triggerSubscriptionCall('bookAttribsLoaded', [], 200)
    }

    //DO get minden attribnak
    /**
     * kategórik lekérése
     * @returns {*[]}
     */
    getCategories() {
        return [this.model.mainCategory, this.model.subCategory];
    }

    /**
     * tipusok lekérése
     * @returns {*}
     */
    getType() {
        return this.model.type;
    }

}
