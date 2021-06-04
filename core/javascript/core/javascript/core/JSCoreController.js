/**
 * alapvető feladata a betöltendő JS fájlok megkeresése, listázása , és az 'Iclude' service-nek való átadása
 * ezenkívül néhány config adatot kezel
 */
class JSCoreController
{
    /**
     * JSCoreModel adatmodell
     * @private
     */
    _model;

    /**
     * az Include szolgáltatás egy példány
     * @private
     */
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

    /**
     * noscript üzenet beillesztése a html-be
     */
    addNoScript() {
        let wphead=document.getElementsByTagName("head")[0];
        const nojs=document.createElement("noscript");
        nojs.innerHTML="AZ ön böngészője nem támogatja a javascriptet. Ezen oldal használata javascript nélkül nem lehetséges<br>" +
            "Kérem töltsön le egy másik böngészőt PL.: Chrome, Firefox, és próbálkozzon azzal";
        wphead.appendChild(nojs);
    }

    /**
     * az Include szolgáltatás példányosítása
     */
    initIncludeHelper() {
        this._includer = new Include();
        EventSubscriptionHandler.subscribe('levelLoaded',this, 'levelLoaded')
    }

    /**
     * modulloader és initiator fájlok hozzáadása töltésre
     */
    loadScriptFiles() {
        if (this._model.modulLoaderFileExists[0]){this._includer.addFilesToLoad(["modulloader.js"],this._model.javascriptUrl+'/modulloader/',0);}
        if (this._model.modulLoaderFileExists[1]){this._includer.addFilesToLoad(["modulloader.js"],this._model.pageUrl,0);}
        if (this._model.initiatorFileExists[0]){this._includer.addFilesToLoad(["initiator.js"],this._model.javascriptUrl+'/initiator/',2);}
        if (this._model.initiatorFileExists[1]){this._includer.addFilesToLoad(["initiator.js"],this._model.pageUrl,2);}
    }

    /**
     * js fájlok importálása a \core\javascript-ből (a core\javascript\core-ban lévő fájlok már meghívódtak )
     * pl: helper fájlok
     * @param files hozzáadandő fájlok (formátum: [path, filename][])
     * @todo add callback
     * @todo add loadlevel
     */
    loadCoreFiles(files)
    {
        for (let [path, fileName] of files)
        {
            path = this._model.coreJSUrl + path;
            this._includer.addFilesToLoad([fileName+'.js'],path, 1 )
        }
    }

    /**
     * project fájlok behívása (\project\javascript\)
     * @param files multidimenziónális array (object) pl: ['module': [path, filename][], namedSets: [path, filename][]]
     * @todo add callback
     * @todo add loadlevel
     */
    loadProjectFiles(files)
    {
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

    /**
     * egyszerű projektfájl hozzáadása töltére
     * @param files betöltendő fájlok [path, filename][]
     */
    addProjectFilesToLoad(files) {
        for (let [path, fileName] of files)
        {
            path = this._model.javascriptUrl + path;
            this._includer.addFilesToLoad([fileName+'.js'],path, 1 )
        }
    }

    /**
     * egy MVC modul hozzáadása betöltésre (Singleton controller-el)
     * @param controller a kontroller fájl
     * @param model a model fájl
     * @param view  a view fájl
     * @DO test
     */
    addModulToLoad(controller,model=null,view=null)
    {
        this._model.pushToModulsToLoad({controller: controller, model: model, view: view})
        this.addMVCFilesToLoad(controller,model,view,2)
    }

    /**
     * mvc modul fájlok átadása include szolgáltatásnak
     * @param controller a kontroller fájl
     * @param model a model fájl
     * @param view
     * @param level
     */
    addMVCFilesToLoad(controller=null,model=null,view=null, level=1)
    {
        if (controller) this._includer.addFilesToLoad([controller+'.js'],this._model.javascriptUrl+'controller/',level)
        if (model) this._includer.addFilesToLoad([model+'.js'],this._model.javascriptUrl+'model/',level)
        if (view) this._includer.addFilesToLoad([view+'.js'],this._model.javascriptUrl+'view/',level)
    }


    /**
     * mvc modul hozzáadása név alapján (Singleton controller-el)forma [<modulnév>,'MVC'][]
     * ha van M betölti a modult, ha C controllert, ha W view-t
     * @param modulNames betöltendő fájlok tömbje [<modulnév>,<MVC>][]
     */
    addNamedModulToLoad(modulNames)
    {
        for (let [name, settings] of modulNames)
        {
            settings=settings.toUpperCase();
            let controller = settings.indexOf("C") !== -1? name : null;
            let model = settings.indexOf("M") !== -1? name+'Model' : null;
            let view = settings.indexOf("V") !== -1? name+'View' : null;
            this._model.pushToModulsToLoad({controller: controller, model: model, view: view})
            this.addMVCFilesToLoad(controller,model,view)
        }
    }

    /**
     * MVC set hozzáadása betöltésre
     * outdated????
     * @param controller a kontroller
     * @param model a model
     * @param view a view
     * @DO test
     */
    addSetToLoad(controller=null,model=null,view=null)
    {
        this.addMVCFilesToLoad(controller,model,view,2)
    }

    /**
     *  mvc modul hozzáadása név alapján forma [<modulnév>,'MVC'][]
     * ha van M betölti a modult, ha C controllert, ha W view-t
     * outdated????
     * @param setNames betöltendő fájlok tömbje [<modulnév>,<MVC>][]
     */
    addNamedSetToLoad(setNames)
    {
        for (let [name, settings] of setNames)
        {
            settings=settings.toUpperCase();
            let controller = settings.indexOf("C") !== -1? name : null;
            let model = settings.indexOf("M") !== -1? name+'Model' : null;
            let view = settings.indexOf("V") !== -1? name+'View' : null;
            this.addMVCFilesToLoad(controller,model,view,1)
        }
    }

    /**
     * subscription callback handler - levelLoaded
     * ha az 1-es szintű fájlok betöltődtek,  inicalizálja a modulokat (model, és view hoz nekik létre)
     * @param result subscriptionhandler által átadott adat
     * @param resultState http code
     */
    levelLoaded(result, resultState)
    {
        if (result === 1)
        {
            this.initializeModuls();
        }
    }

    /**
     * HTML request paramétere lekérése
     * @returns {*}
     */
    getRequestData()
    {
        return this._model.requestParameters;
    }

    /**
     * MVC szerkezetek kialakítása
     * létrehoz egy Singleton kontrollert (megadott tipusút), és létrehozza hozza a modelt és a view-t
     * ha kell
     */
    initializeModuls() {
        for (let key of this._model.modulsToLoad)
        {
            let controller = eval(key.controller);
            controller = new controller();
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
        }
    }

    /**
     * visszaadja a projekt root elérési útját
     * @returns {*}
     */
    getRoot() {
        return this._model.rootUrl;
    }
}
