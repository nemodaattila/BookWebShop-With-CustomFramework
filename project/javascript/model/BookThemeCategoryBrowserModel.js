/**
 * kategória böngésző modellje
 */

class BookThemeCategoryBrowserModel
{
    /**
     * lehetséges kategóriák
     * @type {[]}
     */
    _categories=[];

    /**
     *  kereséshez kiválasztott kategória tipusa (Maincategory/Category)
     * ha már rákattintot a linkre
     * @private string
     */
    _type;

    /**
     *  kereséshez kiválasztott kategória értéke/kódja
     * ha már rákattintot a linkre
     * @private int
     */
    _typeValue;

    setCategories(cats) {
        this._categories=cats;
    }

    getCategories() {
        return this._categories;
    }

    setType(value)
    {
        this._type=value;
    }

    getType()
    {
        return this._type;
    }

    setTypeValue(value)
    {
        this._typeValue=value;
    }

    getTypeValue()
    {
        return this._typeValue;
    }
}
