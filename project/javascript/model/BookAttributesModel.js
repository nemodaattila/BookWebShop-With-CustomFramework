class BookAttributesModel {

    _category;
    _discount;
    _format;
    _language;
    _tags;
    _targetAudience
    _type;

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get discount() {
        return this._discount;
    }

    set discount(value) {
        this._discount = value;
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
        this.category=attribs.category;
        this.discount=attribs.discount;
        this.format=attribs.format;
        this.language=attribs.language;
        this.tags=attribs.tags;
        this.targetAudience=attribs.targetAudience
        this.type=attribs.type;
    }
}
