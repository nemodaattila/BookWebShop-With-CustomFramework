class MainCategoryBrowser{

    _model;
    _view;

    constructor(category, key) {
        this._view = new MainCategoryBrowserView()
        this._model = new MainCategoryBrowserModel(category, key)
    }

    setContainerHTMLElement(element)
    {
        this._view.setContainerHTMLElement(element)
    }

    displayMainCategories()
    {

        this.view.displayBrowser(Object.keys(this.model.categories))
        this.addEventsToElements();
    }

    // addEventsToElements() {
    //     console.log(this.view.allsearch)
    //     this.view.allsearch.addEventListener("click",()=>{
    //         BookThemeCategoryBrowser.callCallbackFunctions('SUCCESS', null, 'prepareAllSearch')
    //     });
    //     for (let key of this.view.searchLinks)
    //     {
    //         key.addEventListener("click",(event)=>
    //         {
    //             VSM.call("BookThemeCategoryBrowser", 'prepareMainSearch', event.target.innerHTML,)
    //         })
    //     }
    //     console.log(this);
    //     for (let key of this.view.openButtons)
    //     {
    //         key.addEventListener("click",(event)=>
    //         {
    //
    //             console.log(event);
    //             let sublinks;
    //             const button=event.target;
    //             let subcategoryName = button.nextSibling.innerHTML;
    //             if (button.value==="+")
    //             {
    //                 console.log(this.model.categories[subcategoryName])
    //                 this.model.addSubcategoryBrowser(subcategoryName, this.model.categories[subcategoryName], button)
    //                 button.value='-';
    //             }
    //             else
    //             {
    //                 this.model.removeSubcategoryBrowser(subcategoryName)
    //                 button.value='+';
    //             }
    //             console.log(this.model);
    //         })
    //     }
    // }
}
