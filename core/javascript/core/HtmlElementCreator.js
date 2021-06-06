/**
 static htmlElementCreator class
 segédfüggvények html elemek készítéséhez
 */
class HtmlElementCreator {
    /**
     * tipus összetettség alapján meghívja a html létrehozó fv-t
     * létrehoz egy html elemet, és beilleszti a DOM-ba
     * @param type string | object -> létrehozandó html elem tipusa ha tömb akkor egymásba ágyazza pl: p > img
     * @param parent DOM object -> az a DOM element amibe az új html elem létrejön
     * @param params array -> az új elem paraméterei pl: id, innerHTML
     * @returns {*} az újonnan létrehozott DOM element mutatója
     * @throws hiba ha a type nem string vagy array/object
     */
    static createHtmlElement(type, parent, params) {
        if (typeof type === "string") {
            return this.createSimpleHtmlElement(type, parent, params)
        } else if (typeof type === "object") {
            return this.createNestedHtmlElement(type, parent, params)
        } else throw new Error('createHtmlElement type must be string or array')
    }

    /**
     * létrehoz egy html elemet, és beilleszti a DOM-ba
     * @param type string -> létrehozandó html elem tipusa
     * @param parent DOM object -> az a DOM element amibe az új html elem létrejön
     * @param params array -> az új elem paraméterei pl: id, innerHTML
     * @returns {*} az újonnan létrehozott DOM element mutatója
     */
    static createSimpleHtmlElement(type, parent, params) {
        let newdiv = document.createElement(type);   //create
        //DO ha params null ellenőrzés
        for (let key in params) {
            if (params.hasOwnProperty(key) && key !== "innerHTML") {
                newdiv.setAttribute(key, params[key]);
            }
        }
        if ('innerHTML' in params) {
            newdiv.innerHTML = params.innerHTML
        }
        parent.appendChild(newdiv);
        return newdiv
    };

    /**
     * létrehoz egy beágyazott html elemet(pl: <p>-><img>), és beilleszti a DOM-ba
     * @param type string -> létrehozandó html elem tipusai DOM szerint fentről lefelé pl: ['p','img']
     * @param parent DOM object -> az a DOM element amibe az új html elem létrejön
     * @param params array -> az új elem paraméterei pl: id, innerHTML
     * @returns {*} az újonnan létrehozott DOM element mutatója
     */
    static createNestedHtmlElement(type, parent, params) {
        let param, temp, returnobject;
        for (let key in type) {
            if (type.hasOwnProperty(key)) {
                param = {}
                if (parseInt(key) === type.length - 1) param = params;
                temp = this.createSimpleHtmlElement(type[key], parent, param)
                if (key === "0") returnobject = temp
                parent = temp;
            }
        }
        return returnobject;

    }

    /**
     * elkészit egy select html elemet - option-okkal együtt
     * @param parent DOM element -> a dom elem amibe a select kerül
     * @param params array parameters a beállítandó paraméterek
     * @param options array/object string/num options a select választható értékei
     * @param addOptionValue bool ha true akkor az optionok egyedi value-kat kapnak
     * @returns {HTMLSelectElement} a létrehozott Select
     */
    static createSelectWithOptions(parent, params, options, addOptionValue = true) {
        const newDiv = document.createElement("select");   //creat
        for (let key in params) {
            if (params.hasOwnProperty(key) && key !== "innerHTML") newDiv.setAttribute(key, params[key]);                      //add an id
        }
        if ('innerHTML' in params) {
            newDiv.innerHTML = params.innerHTML
        }
        parent.appendChild(newDiv);
        HtmlElementCreator.addOptionToSelect(newDiv, options, addOptionValue);
        return newDiv
    };

    /**
     * option-öket ad egy, már létező selecthez
     * @param element a select DOM element
     * @param options options array/object string/num options a select választható értékei
     * @param addOptionValue bool ha true akkor az optionok egyedi value-kat kapnak
     */
    static addOptionToSelect(element, options, addOptionValue) {
        if (addOptionValue === undefined) {
            addOptionValue = true;
        }
        for (let i in options) {
            if (options.hasOwnProperty(i)) {
                let option = document.createElement("option");
                if (addOptionValue === true)
                    option.value = i;
                option.text = options[i];
                element.add(option);
            }
        }
    };

    /**
     * select elkészítése optionGroup-pal
     * @param parent a DOM element, amibe a select készül
     * @param params array parameters a beállítandó paraméterek
     * @param options options array/object string/num options a select választható értékei
     * @returns {HTMLSelectElement} a létrehozott Select DOM-ja
     */
    static createSelectWithOptionGroup(parent, params, options) {
        const newdiv = document.createElement("select");   //creat
        for (let key in params) {
            if (params.hasOwnProperty(key) && key !== "innerHTML") newdiv.setAttribute(key, params[key]);                      //add an id
        }
        if ('innerHTML' in params) {
            newdiv.innerHTML = params.innerHTML
        }
        parent.appendChild(newdiv);

        HtmlElementCreator.addGroupToSelect(newdiv, options);
        return newdiv
    };

    /**
     * optgroup hozzáadása meglévő select-hez
     * @param element select DOM element
     * @param options options array/object string/num options a select választható értékei
     */
    static addGroupToSelect = function (element, options) {
        for (let i in options) {
            if (options.hasOwnProperty(i)) {
                let option = document.createElement("optgroup");
                option.label = i;
                element.add(option);
                HtmlElementCreator.addOptionToSelect(element, options[i])
            }
        }
    };

    /**
     * option hozzéadása DataList-hez
     * @param element dataList DOM element
     * @param options options array/object string/num options a select választható értékei
     */
    static addOptionToDataList(element, options) {
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                element.innerHTML += "<option value=" + options[key] + " />"
            }
        }
    }
}
