class JSCoreModel{
    get javascriptUrl() {
        return this._javascriptUrl;
    }

    get pageUrl() {
        return this._pageUrl;
    }

    _modulLoaderFileExists;
    _initiatorFileExists;
    _requestParameters;
    _page;
    _javascriptUrl;
    _pageUrl;
    _modulsToLoad = [];
    _root;

    get root() {
        return this._root;
    }

    constructor(dataFromServer) {
        console.log(dataFromServer)
            this._modulLoaderFileExists = dataFromServer['modulLoader'];
            this._initiatorFileExists = dataFromServer['initiator']
            if (dataFromServer['requestParameters'] !== undefined)
                this._requestParameters = dataFromServer['requestParameters'];
            this._page = dataFromServer['page'];
            this._root = dataFromServer['root']
            this._javascriptUrl = dataFromServer['root']+'/project/javascript/';
            this._pageUrl=dataFromServer['root']+'/project/frontend/pages/'+this._page+'/';
            console.log(this)
    }


    get modulLoaderFileExists() {
        return this._modulLoaderFileExists;
    }

    set modulLoaderFileExists(value) {
        this._modulLoaderFileExists = value;
    }

    get initiatorFileExists() {
        return this._initiatorFileExists;
    }

    set initiatorFileExists(value) {
        this._initiatorFileExists = value;
    }

    get modulsToLoad() {
        return this._modulsToLoad;
    }


    pushToModulsToLoad(value)
    {
        this._modulsToLoad.push(value)
    }
    //
    // get dataFromServer() {
    //     return this._dataFromServer;
    // }
    //
    // set dataFromServer(value) {
    //     this._dataFromServer = value;
    // }
    //
    // get page() {
    //     return this._page;
    // }
    //
    // set page(value) {
    //     this._page = value;
    // }
    //
    // get pagePath() {
    //     return this._pagePath;
    // }
    //
    // set pagePath(value) {
    //     this._pagePath="./pages/normal/"+value+"/";
    // }
    // get ajaxLoaded() {
    //     return this._ajaxLoaded;
    // }
    //
    // set ajaxLoaded(enabled) {
    //     if (typeof enabled !== "boolean")
    //     {
    //         this._ajaxLoaded=-1;
    //     }
    //     else this._ajaxLoaded=(enabled?0:-1);
    // }
    //
    // ajaxReady()
    // {
    //     this._ajaxLoaded = 1;
    // }
    //
    // get helperFileDirectory() {
    //     return this._helperFileDirectory;
    // }
    //
    //
    // get sharedModul() {
    //     return this._sharedModul;
    // }
    //
    // get sharedController() {
    //     return this._sharedController;
    // }
    //
    // get sharedModel() {
    //     return this._sharedModel;
    // }
    //
    // get sharedView() {
    //     return this._sharedView;
    // }
    //
    // get sharedInitiator() {
    //     return this._sharedInitiator;
    // }
    //
    // _helperFiles;
    // _modulLoaderFileExists=[];
    // _initiatorFileExists=[];
    // _modulsToLoad =[];
    // _dataFromServer = [];
    // _ajaxLoaded;
    // _page;
    // _pagePath;
    // // filesToLoad = [];
    //
    // _helperFileDirectory="./core/frontend/script/helper/";
    // _sharedModul='./pages/shared/frontend/modulloader/';
    // _sharedController = './pages/shared/frontend/controller/'
    // _sharedModel='./pages/shared/frontend/model/';
    // _sharedView='./pages/shared/frontend/view/';
    // _sharedInitiator="./Pages/shared/frontend/initiator/";

}
