/**
 * DOM segédfüggvények
 */
class DomHelper {

    /**
     * html elem összes elemének eltávolítása
     * @param element HTML DOM element
     */
    static removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}
