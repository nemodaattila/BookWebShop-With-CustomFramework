/**
 * kategória böngésző főkategória view-je
 */
class MainCategoryBrowserView {

    /**
     * tartalmazó DOM element
     * @private
     */
    _containerElement;

    /**
     * link melyre kattintva keresni lehet
     * @private
     */
    _searchLink;

    /**
     * alkateória nyitó/záró gomb
     * @private
     */
    _openButton;

    /**
     * alkategória DOM eleme
     * @private
     */
    _subCategoryContainer;

    get subCategoryContainer() {
        return this._subCategoryContainer;
    }

    get searchLink() {
        return this._searchLink;
    }

    get openButton() {
        return this._openButton;
    }

    /**
     * tartalmazó DOM element beállítása
     * @param element
     */
    setContainerHtmlElement(element) {
        this._containerElement = element;
    }

    get containerElement() {
        return this._containerElement;
    }

    /**
     * alkategóriák elrejtése
     */
    hideSubcategories() {
        this._subCategoryContainer.hidden = true;
    }

    /**
     * alkategóriák újramegjelenítése
     */
    showSubcategories() {
        this._subCategoryContainer.hidden = false;
    }

    /**
     * főkategória megjelenítése
     * @param label
     */
    displayBrowser(label) {
        let item = HtmlElementCreator.createHtmlElement("li", this._containerElement, {});
        this._openButton = HtmlElementCreator.createHtmlElement("input", item, {
            "type": "button",
            class: "openButton",
            "value": "+"
        });
        this._searchLink = HtmlElementCreator.createHtmlElement("span", item, {
            class: "searchLabel",
            "innerHTML": label
        });
        this._subCategoryContainer = HtmlElementCreator.createHtmlElement("ul", item, {'hidden': true});
    }

    /**
     * alkategória nyitó/ záró gomb jelének változtatása
     * @param value
     */
    changeOpenSign(value) {
        this._openButton.value = (value === true) ? '-' : '+';
    }

}
