/**
 * model könyv metaadat tárolására
 */
class BookAttributesModel {

    /**
     * téma szerinti főkategóriák
     * @private array
     */
    _mainCategory;

    /**
     * téma szerinti alkategóriák
     * @private array
     */
    _subCategory;

    /**
     * könyvtipusok/formátumok pl: puhatáblás, vagy mobi vagy audiocd
     * @private array
     */
    _format;

    /**
     * nyelvek
     * @private array
     */
    _language;

    /**
     * cimkék, tagek : scifi, háborús, romantokis stb
     * @private array
     */
    _tags;

    /**
     * célközönség : all age , 0-6 évig stb
     * @private array
     */
    _targetAudience

    /**
     * a könyv tipusa : könyv / ebook / hangoskönyv
     * @private array
     */
    _type;

    get mainCategory() {
        return this._mainCategory;
    }

    set mainCategory(value) {
        this._mainCategory = value;
    }

    get subCategory() {
        return this._subCategory;
    }

    set subCategory(value) {
        this._subCategory = value;
    }

    get format() {
        return this._format;
    }

    set format(value) {
        this._format = value;
    }

    get language() {
        return this._language;
    }

    set language(value) {
        this._language = value;
    }

    get tags() {
        return this._tags;
    }

    set tags(value) {
        this._tags = value;
    }

    get targetAudience() {
        return this._targetAudience;
    }

    set targetAudience(value) {
        this._targetAudience = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    /**
     * adatok beállítása
     * @param attribs
     */
    setBookAttribs(attribs) {
        this.mainCategory = attribs.mainCategory;
        this.subCategory = attribs.subCategory;
        this.format = attribs.format;
        this.language = attribs.language;
        this.tags = attribs.tags;
        this.targetAudience = attribs.targetAudience
        this.type = attribs.type;
    }
}
