class JSCoreModel {
    /**
     * létezik e modulLoader file -> globális és pageszintű [<bool>,<bool>]
     * @private
     */
    _modulLoaderFileExists;

    /**
     * létezik e initiator file -> globális és pageszintű [<bool>,<bool>]
     * @private
     */
    _initiatorFileExists;

    /**
     * html request paraméterek, a szerver adja át
     * @private
     */
    _requestParameters;

    /**
     * a betöltött oldal neve: pl: index
     * @private
     */
    _page;

    /**
     * user JS fájlok elérési útja
     * @private
     */
    _javascriptUrl;

    /**
     * core JS fájlok elérési útja
     * @private
     */
    _coreJSUrl;
    /**
     * pageszintű frontendfájlok elérési útja
     * @private
     */
    _pageUrl;

    /**
     * inicializálandó modulok
     * @type {[]}
     * @private
     */
    _modulsToLoad = [];

    /**
     * projekt root elérési útja pl: www.project.com/
     * @private
     */
    _rootUrl;

    constructor(dataFromServer) {
        this._modulLoaderFileExists = dataFromServer['modulLoader'];
        this._initiatorFileExists = dataFromServer['initiator']
        if (dataFromServer['requestParameters'] !== undefined)
            this._requestParameters = dataFromServer['requestParameters'];
        this._page = dataFromServer['page'];
        this._rootUrl = dataFromServer['root']
        this._coreJSUrl = dataFromServer['root'] + '/core/javascript/';
        this._javascriptUrl = dataFromServer['root'] + '/project/javascript/';
        this._pageUrl = dataFromServer['root'] + '/project/frontend/pages/' + this._page + '/';
        // console.log(this)
    }

    get requestParameters() {
        return this._requestParameters;
    }

    set requestParameters(value) {
        this._requestParameters = value;
    }

    get javascriptUrl() {
        return this._javascriptUrl;
    }

    get pageUrl() {
        return this._pageUrl;
    }

    get coreJSUrl() {
        return this._coreJSUrl;
    }

    get rootUrl() {
        return this._rootUrl;
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

    /**
     * betöltendő modulok hozzáadása
     * @param value object(controller model view)
     */
    pushToModulsToLoad(value) {
        this._modulsToLoad.push(value)
    }

}
