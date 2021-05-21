class BookThemeCategoryBrowserView
{
    containerelement='';

    setContainerHTMLElements=function (element)
    {
        this.containerelement=document.getElementById(element);
    }

    displayMainCategories=function(cats)           //kategória faszerkezet megjelenítése
    {
        let ctrelements=[];
        let optionList=document.createElement("ul");
        this.containerelement.appendChild(optionList);
        let allsearch=HtmlElementCreator.createHtmlElement(["li","span"],optionList,{"innerHTML":"Összes",class:"searchlink"});
        ctrelements['allSearch']=allsearch;
        ctrelements['openButton']=[];
        ctrelements['categorySearch']=[];
        let catList = Object.keys(cats['main'])
        for (let key of catList)
        {
            let item=HtmlElementCreator.createHtmlElement("li",optionList,{});
            let ob=HtmlElementCreator.createHtmlElement("input",item,{"type":"button", class:"openbutton", "value":"+"});
            ctrelements['openButton'].push(ob);
            //"onclick":"BookThemeCategoryBrowser.manageSubCategories()"
            var t = document.createElement("span");
            t.innerHTML=cats['main'][key];
            t.className="searchlink";
            //t.onclick=(event)=>{console.dir(event);this.prepareMainSearch(event.target)};
            item.appendChild(t);
            ctrelements['categorySearch'].push(t);
        }
        return ctrelements;
    };

     displaySubCategories=function(button,cats)
    {
        let sublist=document.createElement("ul");
        let links=[];
        button.parentNode.appendChild(sublist);
        for (let key in cats)
        {
            links.push(HtmlElementCreator.createHtmlElement("li",sublist,{"class":"subcat searchlink","data-value":key, "innerHTML":cats[key], }));
        }
        button.value='-';
        return links;
    }

    removeSubcatList=function (button) {
        button.nextSibling.nextSibling.remove();
        button.value='+';
    }
};
