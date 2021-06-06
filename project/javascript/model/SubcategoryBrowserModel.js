/**
 * kategória böngésző alkategória modellje
 */
class SubcategoryBrowserModel {
    /**
     * alkategória id-je
     * @private int
     */
    _id;

    /**
     * alkategória cimkéje
     * @private string
     */
    _label;

    get id() {
        return this._id;
    }

    get label() {
        return this._label;
    }

    constructor(id, label) {
        this._id = id;
        this._label = label;
    }
}
