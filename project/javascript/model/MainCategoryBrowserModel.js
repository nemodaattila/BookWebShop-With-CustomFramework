class MainCategoryBrowserModel{
    // get categories() {
    //     return this._categories;
    // }
    //
    // set categories(value) {
    //     this._categories = value;
    // }
    // _categories = [];
    //
    // _subcategoryBrowsers =[];
    // addSubcategoryBrowser(name, categories, relativeHtmlelement)
    // {
    //     this._subcategoryBrowsers[name]=new SubcategoryBrowser(categories, relativeHtmlelement);
    // }
    //
    // removeSubcategoryBrowser(name)
    // {
    //     this._subcategoryBrowsers[name].removeView();
    //     delete this._subcategoryBrowsers[name];
    // }

    _subCategories;
    _id;


    constructor(subCategories, id) {
        this._subCategories = subCategories;
        this._id = id;
    }
}
