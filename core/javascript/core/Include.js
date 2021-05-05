class Include {
    model;



    constructor(){
        if(!Include._instance){
            Include._instance = this;
        }
        this.model = new IncludeModel();
        console.log(this)
        SubscriptionHandler.subscribe("fileLoaded", this,"fileLoaded")
        SubscriptionHandler.subscribe("levelLoaded", this, "initLevelLoad")
        return Include._instance;
    }

    addFilesToLoad(files, path, level, callback = []) {
        console.log([files, path, level, callback])
        const {active, loadLevel} = this.model;
        console.log([active, loadLevel])
        if ((active === false) || ((active === true) && (level > loadLevel))) {
            console.log(files.length);
            if (files.length > 0)
                this.model.filesToLoad = [files, path, level, callback];
        } else {
            //DO erre egy callback?
            console.log('The Given level is under progress, you cannot add new file to it:  ' + level);
        }
    };

    startLeveledLoad() {
        console.log(this.model.filesToLoad)
        this.model.active = true;
        this.model.loadLevel = -1;
        this.initLevelLoad();
    }

    initLevelLoad() {
        let fileList;
        console.log(this.model)
        this.model.loadLevel++;
        console.log('levelstart ' + this.model.loadLevel)

        if (this.model.loadLevel < this.model.getLevelCount()) {
            let fileCount = this.model.prepareFilesForLoad();
            console.log(fileCount)
            if (fileCount !== 0) {
                this.startLevelLoad()
            }
            else this.initLevelLoad();
        } else {
            this.model.active = false;
            console.log('loadENd');
        }
    }

    startLevelLoad() {
        console.log(this.model.actualLevelFileCount)
        this.model.progressFileCount = 0;
        for (let i = 0; i < this.model.actualLevelFileCount; i++) {
            let [actualFile, callback] = this.model.shiftPreparedFile();
            console.log([actualFile, callback])
            this.loadScript(actualFile, callback)
        }
    }

    loadScript(url, callback = null, callbackParam = null) {
        console.log('loadsript ' + url);
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" ||
                    script.readyState === "complete") {
                    script.onreadystatechange = null;
                    console.log(url);
                    if (callback !== null)
                        SubscriptionHandler.initSubscription(callback, 200, url)
                        // this.callCallbackFunctions('SUCCESS', url, callback)
                }
                script.onerror = () =>
                {
                    if (callback !== null)
                        SubscriptionHandler.initSubscription(callback, 400, url)
                }
            };
        } else {  //Others
            script.onload = () => {
                console.log('script hozzáadva: ' + url);
                console.log(callback);
                // if (callbackParam !== null) url = [url, callbackParam]
                if (callback !== null)
                    SubscriptionHandler.initSubscription(callback, 200, url)
            }
            script.onerror = () =>
            {
                if (callback !== null)
                    SubscriptionHandler.initSubscription(callback, 400, url)
            }
        }
    }

    fileLoaded(resultState, result)
    {
        console.log([resultState, result])
        if (resultState !== 200)
        {
            this.model.loadLevel = Infinity;
            console.log('ERROR - fileLoaded - ' + result)
            SubscriptionHandler.initSubscription('levelLoaded', 400, '')
            return;
        }

        if (++this.model.progressFileCount === this.model.actualLevelFileCount)
        {
            console.log([this.model.progressFileCount, this.model.actualLevelFileCount]  );
            SubscriptionHandler.initSubscription('levelLoaded',200, this.model.loadLevel )
        }

    }



}
