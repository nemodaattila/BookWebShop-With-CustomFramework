class MainCategoryBrowserView{
    get allsearch() {
        return this._allsearch;
    }

    get searchLinks() {
        return this._searchLinks;
    }

    get openButtons() {
        return this._openButtons;
    }

    _containerElement;
    _allsearch;
    _searchLinks=[];
    _openButtons=[];

    setContainerHtmlElement(element) {
        console.log(element)
        this._containerElement=document.getElementById(element);
        console.log(this._containerElement)
    }

    displayBrowser(categories)
    {
        console.log(categories)
        let list=document.createElement("ul");
        this._containerElement.appendChild(list);
        this._allsearch=HtmlElementCreator.createHtmlElement(["li","span"],list,{"innerHTML":"Összes",class:"searchLink"});

        for (let key of categories)
        {
            let item=HtmlElementCreator.createHtmlElement("li",list,{});
            let openButton=HtmlElementCreator.createHtmlElement("input",item,{"type":"button", class:"openButton", "value":"+"});
            this._openButtons.push(openButton);
            //"onclick":"BookThemeCategoryBrowser.manageSubCategories()"
            let searchLink = HtmlElementCreator.createHtmlElement("span",item,{ class:"searchLink", "innerHTML": key});

            //t.onclick=(event)=>{console.dir(event);this.prepareMainSearch(event.target)};
            this._searchLinks.push(searchLink);
        }
    }

}
