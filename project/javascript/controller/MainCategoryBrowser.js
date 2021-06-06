/**
 * főkategória megjelenítéésrt felelős controller
 */

class MainCategoryBrowser {

    _model;
    _view;
    /**
     * alkategóriák objektumai
     * @type {{}}
     * @private
     */
    _subCategories = {}

    constructor(label, key, subCategories) {
        this._view = new MainCategoryBrowserView()
        this._model = new MainCategoryBrowserModel(label, key, subCategories)
    }

    /**
     * megjelenítő DOM elem megadása
     */
    setContainerHTMLElement(element) {
        this._view.setContainerHtmlElement(element)
    }

    /**
     * kategória megjelenítése
     */
    displayMainCategory() {
        this._view.displayBrowser(this._model.label)
        this.addEventsToElements();
    }

    /**
     * esemény hozzáadása gombokhoz
     * keresési esemény, alkategória megjelenítés/elrejtés esemény
     */
    addEventsToElements() {
        this._view.searchLink.addEventListener('click', () => {
            EventSubscriptionHandler.triggerSubscriptionCall('mainCategorySearch', this._model.id, 200)
        })
        this._view.openButton.addEventListener('click', () => {
            let isOpen = this._model.subCategoriesShown;
            if (isOpen === true) {
                this._view.hideSubcategories();
                this._view.changeOpenSign(false)
                this._model.subCategoriesShown = false;
            } else {
                if (Object.keys(this._subCategories).length === 0) {
                    for (let key in this._model.subCategories) {
                        if (this._model.subCategories.hasOwnProperty(key))
                            this._subCategories[key] = new SubcategoryBrowser(key, this._model.subCategories[key], this._view.subCategoryContainer);
                    }
                }
                this._view.showSubcategories();
                this._view.changeOpenSign(true)
                this._model.subCategoriesShown = true;
            }
        })
    }
}
