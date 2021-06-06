let il = document.getElementById("browselink");
il.setAttribute("aria-current", "page");

new BookPrimaryViewer().setContainerHTMLElement("mainBookDiv")
let btcb = new BookThemeCategoryBrowser()
btcb.setContainerHTMLElement("catNav")
let se = new SearchEngine()
se.addCriteriumSourceObject(btcb)
// ContentHandler.setBookButtonAction('AddToCartButton')
// PageNavigator.setContainerHtmlElement("pageNav");
// SearchEngine.addCriteriumSourceObject(PageNavigator);
// OrderAndCountHandler.setContainerHTMLElement("secondarySearchBar");
// SearchEngine.addCriteriumSourceObject(OrderAndCountHandler);
// VSM.call("SearchEngine","initSearch", false);
se.initSearch(false);
