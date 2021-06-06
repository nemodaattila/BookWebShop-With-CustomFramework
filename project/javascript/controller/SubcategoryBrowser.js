/**
 * objektum kategória böngésző alkategóriájának megjelenítésére
 */
class SubcategoryBrowser {
    constructor(id, label, element) {
        this.model = new SubcategoryBrowserModel(id, label)
        this.view = new SubcategoryBrowserView(element)
        this.createAndDisplaySubcategory();
    }

    /**
     * alkategória megjelenítése
     */
    createAndDisplaySubcategory() {
        this.view.display(this.model.label)
        this.addEventsToSearchLink()
    }

    addEventsToSearchLink() {
        this.view._searchLink.addEventListener('click', () => {
            EventSubscriptionHandler.triggerSubscriptionCall('categorySearch', this.model.id, 200)
        })
    }

}
