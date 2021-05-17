let il=document.getElementById("browselink");
il.setAttribute("aria-current","page");

// VSM.call("BookThemeCategoryBrowser","setContainerHTMLElement", "catNav");
// VSM.call("ContentHandler","setContainerHTMLElement", "mainBookDiv");
// ContentHandler.setBookButtonAction('AddToCartButton')
// PageNavigator.setContainerHtmlElement("pageNav");
// SearchEngine.addCriteriumSourceObject(PageNavigator);
// OrderAndCountHandler.setContainerHTMLElement("secondarySearchBar");
// SearchEngine.addCriteriumSourceObject(OrderAndCountHandler);
// VSM.call("SearchEngine","initSearch", false);
new SearchEngine().initSearch(false);
