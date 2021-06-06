/**
 * kategória böngésző főkategória modell
 */
class MainCategoryBrowserModel {

    /**
     * alkategóriák listája
     * @private object
     */
    _subCategories;

    /**
     * főkategória ID
     * @private int
     */
    _id;

    /**
     * főkategória neve/szövege
     * @private string
     */
    _label;

    /**
     * mutatja e az alkategóriákat
     * @type {boolean}
     * @private
     */
    _subCategoriesShown = false;

    get subCategoriesShown() {
        return this._subCategoriesShown;
    }

    set subCategoriesShown(value) {
        this._subCategoriesShown = value;
    }

    constructor(label, id, subCategories) {
        this._subCategories = subCategories;
        this._id = id;
        this._label = label;
    }

    get label() {
        return this._label;
    }

    get id() {
        return this._id;
    }

    get subCategories() {
        return this._subCategories;
    }
}
