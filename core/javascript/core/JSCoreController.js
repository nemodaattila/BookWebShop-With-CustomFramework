class JSCoreController
{
    _model;
    _includer;

    constructor(){
        if(! JSCoreController._instance){
            JSCoreController._instance = this;
        }
        return JSCoreController._instance;
    }

    set model(value) {
        this._model = value;
    }


    initCore() {
        this.addNoScript();
        this.initIncludeHelper();
        this.loadScriptFiles();
        this._includer.startLeveledLoad();
    }

    addNoScript() {
        let wphead=document.getElementsByTagName("head")[0];
        const nojs=document.createElement("noscript");
        nojs.innerHTML="AZ ön böngészője nem támogatja a javascriptet. Ezen oldal használata javascript nélkül nem lehetséges<br>" +
            "Kérem töltsön le egy másik böngészőt PL.: Chrome, Firefox, és próbálkozzon azzal";
        wphead.appendChild(nojs);
    }

    initIncludeHelper() {
        this._includer = new Include();
        SubscriptionHandler.subscribe('levelLoaded',this, 'levelLoaded')
        console.dir(SubscriptionHandler)
    }

    loadScriptFiles() {
        console.log('helper');
        if (this._model.modulLoaderFileExists[0]){this._includer.addFilesToLoad(["modulloader.js"],this._model.javascriptUrl+'/modulloader/',0);}
        if (this._model.modulLoaderFileExists[1]){this._includer.addFilesToLoad(["modulloader.js"],this._model.pageUrl,0);}
        if (this._model.initiatorFileExists[0]){this._includer.addFilesToLoad(["initiator.js"],this._model.javascriptUrl+'/initiator/',2);}
        if (this._model.initiatorFileExists[1]){this._includer.addFilesToLoad(["initiator.js"],this._model.pageUrl,2);}
    }

    loadProjectFiles(files)
    {
        console.log(files)

        if (files['files'] !== undefined && files['files']!==[])
        {
            this.addProjectFilesToLoad(files['files']);
        }
        if (files['module'] !== undefined && files['module']!==[])
        {
            this.addModulToLoad(files['module']);
        }
        if (files['namedModuls'] !== undefined && files['namedModuls']!==[])
        {
            this.addNamedModulToLoad(files['namedModuls']);
        }
        if (files['sets'] !== undefined && files['sets']!==[])
        {
            this.addSetToLoad(files['sets']);
        }
        if (files['namedSets'] !== undefined && files['namedSets']!==[])
        {
            this.addNamedSetToLoad(files['namedSets']);
        }
    }

    addProjectFilesToLoad(files) {
        for (let file of files)
        {
            let [path, fileName] = file;
            path = this._model.javascriptUrl + path;
            this._includer.addFilesToLoad([fileName+'.js'],path, 1 )
        }
    }

    //
    // loadModul(controller,model=null,view=null)
    // {
    //     this.model.pushToModulsToLoad({controller: controller, model: model, view: view})
    //     this._includer.addFilesToLoad([controller],this.model.sharedController,2)
    //     if (model) Include.addFilesToLoad([model],this.model.sharedModel,2)
    //     if (view) Include.addFilesToLoad([view],this.model.sharedView,2)
    // }
    //
    addNamedModulToLoad(modulNames)
    {
        console.log(modulNames)
        for (let key of modulNames)
        {
            let [name, settings] = key;
            settings=settings.toUpperCase();
            let controller = settings.indexOf("C") !== -1? name : null;
            let model = settings.indexOf("M") !== -1? name+'Model' : null;
            let view = settings.indexOf("V") !== -1? name+'View' : null;
            this._model.pushToModulsToLoad({controller: controller, model: model, view: view})
            this._includer.addFilesToLoad([controller+'.js'],this._model.javascriptUrl+'controller/',1)
            if (model) this._includer.addFilesToLoad([model+'.js'],this._model.javascriptUrl+'model/',1)
            if (view) this._includer.addFilesToLoad([view+'.js'],this._model.javascriptUrl+'view/',1)
        }
    }
    //
    // loadSet(controller=null,model=null,view=null)
    // {
    //     if (controller) Include.addFilesToLoad([controller+".js"],this.model.sharedController,2)
    //     if (model) Include.addFilesToLoad([model+".js"],this.model.sharedModel,2)
    //     if (view) Include.addFilesToLoad([view+".js"],this.model.sharedView,2)
    // }
    //
    addNamedSetToLoad(setNames)
    {
        for (let key of setNames)
        {
            let [name, settings] = key;
            settings=settings.toUpperCase();
            let controller = settings.indexOf("C") !== -1? name : null;
            let model = settings.indexOf("M") !== -1? name+'Model' : null;
            let view = settings.indexOf("V") !== -1? name+'View' : null;
            this._includer.addFilesToLoad([controller],this._model.javascriptUrl+'controller/',1)
            if (model) this._includer.addFilesToLoad([model],this._model.javascriptUrl+'model/',1)
            if (view) this._includer.addFilesToLoad([view],this._model.javascriptUrl+'view/',1)
        }
    }
    //
    levelLoaded(result, resultState)
    {
        console.log('bbbb')
        console.log(resultState,result)
        if (result === 1    )
        {
            console.log('level1Loaded')
            console.log(result)
            console.log(this)
            console.log(this._model.modulsToLoad)
            this.loadModuls();
        }
    }

    getRequestData()
    {
        return this._model.requestParameters;
    }
    //
    // getConstant(value) {
    //     return this.model[value];
    // }
    //
    // getPage()
    // {
    //     return this.model.page;
    // }

    loadModuls() {
        console.log('MODULS')
        console.log(this._model.modulsToLoad)
        for (let key of this._model.modulsToLoad)
        {
            let controller = eval(key.controller);
            console.dir(controller)
            controller = new controller();
            console.log(controller)
            if (key.model!==null)
            {
                let model = eval(key.model)
                controller.setModel(model)
            }
            if (key.view!==null)
            {
                let view = eval(key.view)
                controller.setView(view)
            }
            if (controller.init !== undefined)
                controller.init()
            console.dir(controller)
        }
        console.dir(this)
    }

    getRoot() {
        return this._model.root;
    }
}
