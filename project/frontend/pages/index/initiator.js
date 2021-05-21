let il=document.getElementById("browselink");
il.setAttribute("aria-current","page");

new BookPrimaryViewer().setContainerHTMLElement("mainBookDiv")
new BookThemeCategoryBrowser().setContainerHTMLElement("catNav")
// ContentHandler.setBookButtonAction('AddToCartButton')
// PageNavigator.setContainerHtmlElement("pageNav");
// SearchEngine.addCriteriumSourceObject(PageNavigator);
// OrderAndCountHandler.setContainerHTMLElement("secondarySearchBar");
// SearchEngine.addCriteriumSourceObject(OrderAndCountHandler);
// VSM.call("SearchEngine","initSearch", false);
new SearchEngine().initSearch(false);
