/**
 * egy könyv elsődleges adatait tartalmazó modell
 */
class LocalLibraryBookPrimaryModel {

    /**
     * iró(k)
     * @private array
     */
    _author;

    /**
     * kategória id-je
     * @private string
     */
    _categoryId;

    /**
     * borító thumbnail base64Stringje
     * @private string
     */
    _coverThumbnail;

    /**
     * könyv isbnje
     * @private string
     */
    _isbn;

    /**
     * könyv ára
     * @private int
     */
    _price;

    /**
     * könyv cime
     * @private string
     */
    _title;

    /**
     * könyv tipusa
     * @private string
     */
    _typeId;

    /**
     * kedvezmény mértéke
     * @private int
     */
    _discount;

    get discount() {
        return this._discount;
    }

    set discount(value) {
        this._discount = value;
    }

    get author() {
        return this._author;
    }

    get categoryId() {
        return this._categoryId;
    }

    get coverThumbnail() {
        return this._coverThumbnail;
    }

    get isbn() {
        return this._isbn;
    }

    get price() {
        return this._price;
    }

    get title() {
        return this._title;
    }

    get typeId() {
        return this._typeId;
    }

    constructor(data) {
        this._author = data['author'] ?? data['_author'];
        this._categoryId = data['category_id'] ?? data['_categoryId'];
        this._coverThumbnail = data['cover_thumbnail'] ?? data['_coverThumbnail'];
        this._isbn = data['isbn'] ?? data['_isbn'];
        this._price = data['price'] ?? data['_price'];
        this._title = data['title'] ?? data['_title'];
        this._typeId = data['type_id'] ?? data['_typeId'];
        this._discount = data['discount'] ?? data['_discount']
    }
}
