console.log('modulloader');

JSCore.loadProjectFiles(
    {
        files:[['model\\','LocalLibraryBookModel'],
            ['model\\','LocalLibraryBookPrimaryModel'],
            ['model\\','LocalLibraryBookSecundaryModel']
        ],
        namedModuls:[
            ['BookAttributes','CM'],
            ['SearchEngine','CM'],
            ["LocalLibrary", 'CM'],
            ["BookThemeCategoryBrowser", "CMV"],
            ["BookPrimaryViewer", "C"]
                ],
        namedSets: [
        ['MainCategoryBrowser', 'CMV'],
        // ['HTMLComponents/SubcategoryBrowser','CMV'],
        ['IndividualBookPrimaryDataDisplayer',"CV"]
    ]
    }
);

// JSCoreController.loadSet('HTMLComponents/MainCategoryBrowser','HTMLComponents/MainCategoryBrowserModel','HTMLComponents/MainCategoryBrowserView')
// JSCoreController.loadSet('HTMLComponents/SubcategoryBrowser','HTMLComponents/SubcategoryBrowserModel','HTMLComponents/SubcategoryBrowserView')
// JSCoreController.loadModul("LocalLibrary",'LocalLibraryModel',null)

// JSCoreController.loadSet(null,' InduvidualBookPrimaryDataModel',null)
// JSCoreController.loadSet('HTMLComponents/AddToCartButton',null,null)
// JSCoreController.loadSet('HTMLComponents/SelectForBrowse',null,null)
// JSCoreController.loadSet('HTMLComponents/PageNavigatorLinkClasses',null,null)
// JSCoreController.loadSet('HTMLComponents/IndividualBookDiv',null,'HTMLComponents/IndividualBookDivView')
// JSCoreController.loadModul('BookThemeCategoryBrowser','BookThemeCategoryBrowserModel','BookThemeCategoryBrowserView');
// JSCoreController.loadModul('ContentHandler','ContentHandlerModel','ContentHandlerView');
// JSCoreController.loadModul('PageNavigator','PageNavigatorModel','PageNavigatorView');
// JSCoreController.loadModul('OrderAndCountHandler','OrderAndCountHandlerModel','OrderAndCountHandlerView');
