/**
 * kategróia kezelő keret view
 */
class BookThemeCategoryBrowserView {
    /**
     * tartalmaző DOM element
     * @private
     */
    _containerElement;

    /**
     * kategória független kereső DOM elem
     * @private
     */
    _allSearchElement;

    /**
     * lista DOM elem a kategóriák kerülnek bele
     * @private object
     */
    _listElement

    get allSearchElement() {
        return this._allSearchElement;
    }

    /**
     * tartalmazó DOM elem megadása ID vel
     * @param elementID string
     */
    setContainerHtmlElement(elementID) {
        this._containerElement = document.getElementById(elementID);
    }

    get listElement() {
        if (this._listElement === undefined) {
            this._listElement = document.createElement("ul");

        }
        return this._listElement;
    }

    /**
     * a DOM elem és a lista megjelenítése (itemek nélkük)
     */
    displayListAndAllSearch() {
        this._containerElement.appendChild(this._listElement);
        this._allSearchElement = HtmlElementCreator.createHtmlElement(["li", "span"], this.listElement, {
            "innerHTML": "Összes",
            class: "searchLabel"
        });
    }

}
