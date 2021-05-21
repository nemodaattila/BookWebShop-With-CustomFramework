class IndividualBookPrimaryDataDisplayerView
{
    get button() {
        return this._button;
    }
    _containerHtmlElement
    _button;

    constructor(parentElement) {
        parentElement = document.getElementById(parentElement)
        this._containerHtmlElement=document.createElement("article");
        this._containerHtmlElement.className="bookDiv";
        parentElement.appendChild(this._containerHtmlElement)
    }

    displayData(bookObject, booktype, rootUrl)
    {
        let imgSection = HtmlElementCreator.createHtmlElement("section", this._containerHtmlElement,
            {})
        let figure = HtmlElementCreator.createHtmlElement("figure", imgSection,{})
        let anchor = HtmlElementCreator.createHtmlElement("a", figure, {
            href: rootUrl+"book/alldata/"+bookObject.isbn,
            target: "blank",
        })
        let cover = HtmlElementCreator.createHtmlElement("img",anchor, {
            src: bookObject.coverThumbnail
        })
        let bookDescriptionSection = HtmlElementCreator.createHtmlElement("section", this._containerHtmlElement,
            {class: 'bookDesc'})
        let primaryDataSection = HtmlElementCreator.createHtmlElement("section", bookDescriptionSection, {})
        primaryDataSection.innerHTML=bookObject.author.sort()+"<br/>";
        primaryDataSection.innerHTML+=bookObject.title+"<br/>";
        primaryDataSection.innerHTML+=bookObject.isbn+"<br/><br/>";
        primaryDataSection.innerHTML+="Típus: " + booktype[bookObject.typeId]+"<br/>";

        let priceSection = HtmlElementCreator.createHtmlElement("section", bookDescriptionSection, {})
        priceSection.innerHTML="Ár: "+bookObject.price+" FT<br/>";
        if (bookObject.discount !== 0)
        {
            priceSection.innerHTML+="Kedvezmény: "+bookObject.discount+" %<br/>";
            priceSection.innerHTML+="Kedvezményes ár: "+Math.round(bookObject.price/100*(100-bookObject.discount))+" FT<br/>";
        }
        // const buttonSection = HtmlElementCreator.createHtmlElement("section", bookDescriptionSection, {})
        // // let buttonValue;
        // console.log(buttonAction)
        // buttonAction = eval(buttonAction)
        // this._button = new buttonAction()
        // this._button.display(buttonSection);
    }
}
