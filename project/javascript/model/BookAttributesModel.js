class BookAttributesModel {
    get subCategory() {
        return this._subCategory;
    }

    set subCategory(value) {
        this._subCategory = value;
    }

    _mainCategory;
    _subCategory;

    _format;
    _language;
    _tags;
    _targetAudience
    _type;

    get mainCategory() {
        return this._mainCategory;
    }

    set mainCategory(value) {
        this._mainCategory = value;
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

    setBookAttribs(attribs)
    {
        this.mainCategory=attribs.mainCategory;
        this.subCategory=attribs.subCategory;
        this.format=attribs.format;
        this.language=attribs.language;
        this.tags=attribs.tags;
        this.targetAudience=attribs.targetAudience
        this.type=attribs.type;
    }
}
