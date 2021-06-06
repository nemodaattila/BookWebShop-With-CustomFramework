/**
 * class Include
 * futásidőben hozzáadott JS fájlokat tölti be (egyszerre többet is, akár több szinten)
 */
class Include {

    /**
     * a betöltendő fájlok nevét, és a betöltés pillanatnyi állását tartalmazza
     */
    model;

    constructor() {
        if (!Include._instance) {
            Include._instance = this;
        }
        this.model = new IncludeModel();
        EventSubscriptionHandler.subscribe("fileLoaded", this, "fileLoaded")
        EventSubscriptionHandler.subscribe("levelLoaded", this, "initLevelLoad")
        return Include._instance;
    }

    /**
     * JS fájl hozzáadaása betöltésre
     * @param files array|string filenév(ek) betöltendő fájlok neve
     * @param path elérési út
     * @param level töltési szint, melyik szinten töltse be
     * @param callback sikeres betöltés esetén meghívandó fv
     */
    addFilesToLoad(files, path, level, callback = []) {
        const {active, loadLevel} = this.model;
        if ((active === false) || ((active === true) && (level > loadLevel))) {
            if (files.length > 0)
                this.model.filesToLoad = [files, path, level, callback];
        } else {
            //DO erre egy callback?
            console.log('The Given level is under progress, you cannot add new file to it:  ' + level);
        }
    };

    /**
     * fájltöltések elindítéása
     */
    startLeveledLoad() {
        console.log('LOADSTART')
        // console.log(this.model)
        this.model.active = true;
        this.model.loadLevel = -1;
        this.initLevelLoad();
    }

    /**
     * fájl töltés X. SZintjének inicializálása
     */
    initLevelLoad() {
        this.model.loadLevel++;
        console.log('levelstart ' + this.model.loadLevel)
        if (this.model.loadLevel < this.model.getLevelCount()) {
            let fileCount = this.model.prepareFilesForLoad();
            if (fileCount !== 0) {
                this.startLevelLoad()
            } else this.initLevelLoad();
        } else {
            this.stopLoad()
        }
    }

    /**
     * fájltöltés leállítása
     */
    stopLoad() {
        this.model.active = false;
        this.model.loadLevel = -1;
        console.log('loadENd')
    }

    /**
     * fájl töltés x. szintjének végrehajtása
     */
    startLevelLoad() {
        this.model.progressFileCount = 0;
        for (let i = 0; i < this.model.actualLevelFileCount; i++) {
            let [actualFile, callback] = this.model.shiftPreparedFile();
            this.loadScript(actualFile, callback)
        }
    }

    /**
     * egy JS fájl betöltése, callbcak hívása
     * @param url a fájl url-je
     * @param callback betöltés esetén hivandó függvények
     * @DO más callback hiba esetén?
     */
    loadScript(url, callback = null) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" ||
                    script.readyState === "complete") {
                    script.onreadystatechange = null;
                    if (callback !== null)
                        EventSubscriptionHandler.triggerSubscriptionCall(callback, url, 200)
                }
                script.onerror = () => {
                    if (callback !== null)
                        EventSubscriptionHandler.triggerSubscriptionCall(callback, url, 400)
                }
            };
        } else {  //Others
            script.onload = () => {
                console.log('script loaded: ' + url);
                // if (callbackParam !== null) url = [url, callbackParam]
                if (callback !== null)
                    EventSubscriptionHandler.triggerSubscriptionCall(callback, url, 200)
            }
            script.onerror = () => {
                console.log('script load failed: ' + url)
                if (callback !== null)
                    EventSubscriptionHandler.triggerSubscriptionCall(callback, url, 400)
            }
        }
    }

    /**
     * default callback fv JS fájl betöltése esetén
     * ha resultstate nem 200 leáll a betöltés
     * ha igen ellenőrzi hogy a szintről minden fájl betöltődött-e, ha igen meghívja a következő szint hívását
     * @param result result adat
     * @param resultState http result code
     * @DO 400-ra leálljon -e a futás
     */
    fileLoaded(result, resultState) {

        if (resultState !== 200) {
            this.model.loadLevel = Infinity;
            EventSubscriptionHandler.triggerSubscriptionCall('levelLoaded', '', 400)
            return;
        }
        if (++this.model.progressFileCount === this.model.actualLevelFileCount) {
            EventSubscriptionHandler.triggerSubscriptionCall('levelLoaded', this.model.loadLevel, 200)
        }
    }
}
