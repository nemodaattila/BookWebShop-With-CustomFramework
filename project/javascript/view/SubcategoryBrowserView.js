/**
 * kategória böngésző alkategórjának view-ja
 */
class SubcategoryBrowserView {

    /**
     * tartalmazó DOM element
     * @private
     */
    _containerHtmlElement;

    /**
     * kattintható keresőlink
     * @private
     */
    _searchLink;

    get searchLink() {
        return this._searchLink;
    }

    constructor(containerHtmlElement) {
        this._containerHtmlElement = containerHtmlElement;
    }

    /**
     * alkategória megjelenítése
     * @param label
     */
    display(label) {
        this._searchLink = HtmlElementCreator.createHtmlElement("li", this._containerHtmlElement, {
            'innerHTML': label,
            class: "searchLabel"
        });
    }
}
