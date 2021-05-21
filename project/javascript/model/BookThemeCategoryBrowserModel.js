
class BookThemeCategoryBrowserModel
{

    categories=[];
    type;
    typeValue;

    setCategories=function (cats) {
        console.log(cats)
        this.categories=cats;
    }

    getCategories=function () {
        return this.categories;
    }

    setType=function(value)
    {
        this.type=value;
    }

    getType=function()
    {
        return this.type;
    }

    setTypeValue=function(value)
    {
        this.typeValue=value;
    }

    getTypeValue=function()
    {
        return this.typeValue;
    }
}
