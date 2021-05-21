/*
  //DOC
 htmlElementCreator class static
 segédfüggvények html elemek készítéséhez
 */

//DO create DOM tree from data model

class HtmlElementCreator
{
    /*
    //DOC
     createHtmlElement function
     elkészit egy html elemet
        paraméterek:
        type: string - html tipus
        parent string - a szülő azonosítója
        params: object - plusz paraméterek
        return : az új html elem mutatóját küldi vissza
     */

    static nestedElements;

    static createHtmlElement(type,parent,params)
    {
        if (typeof type === "string")
        {
            return this.createSimpleHtmlElement(type,parent,params)
        }
        else if (typeof type === "object")
        {
            return this.createNestedHtmlElement(type,parent,params)
        }
        else return "createHtmlElement type must be string or array";
    }

    static createSimpleHtmlElement=function(type,parent,params)
    {
        let newdiv = document.createElement(type);   //create
        //DO ha params null ellenőrzés
        for (let key in params) {
            if (key != "innerHTML") {
                newdiv.setAttribute(key, params[key]);
            }
        }
        if ('innerHTML' in params) {
            newdiv.innerHTML = params.innerHTML
        }
        parent.appendChild(newdiv);
        return newdiv
    };


    static createNestedHtmlElement(type,parent,params)
    {
        let param, temp, returnobject;
        for (let key in type)
        {
            param={}
            if (parseInt(key)===type.length-1) param=params;
            temp=this.createSimpleHtmlElement(type[key],parent,param)
            if (key==="0") returnobject=temp
            parent=temp;
        }
        return returnobject;

    }

    /*
     //DOC
     createSelectWithOptions function
     elkészit egy select html elemet - option-okkal együtt
     paraméterek:
     parent string - a szülő azonosítója
     params: object - plusz paraméterek
     options: a választható elemek - array vagy objet
     addoptiovalue : ha true a az optionok kapnak egyedi value-t, ha false csak default value
     return : az új html elem mutatóját küldi vissza
     */

    static createSelectWithOptions=function(parent,params,options,addoptionvalue=true)
    {
        var newdiv = document.createElement("select");   //creat
        for (var key in params)
        {
            if (key!="innerHTML") newdiv.setAttribute(key,params[key]);                      //add an id
        }
        if ('innerHTML' in params) {
            newdiv.innerHTML=params.innerHTML
        }
        parent.appendChild(newdiv);

        HtmlElementCreator.addOptionToSelect(newdiv,options,addoptionvalue);
        return newdiv
    };

    /*
    //DOC
    addOptionToSelect function
    option-öket ad egy selecthez
    paraméterek:
    element string - a szülő azonosítója
    options: a választható elemek - array vagy objet
    addoptiovalue : ha true a az optionok kapnak egyedi value-t, ha false csak default value
    */

    static addOptionToSelect=function(element,options,addoptionvalue)
    {
        if(addoptionvalue === undefined) { addoptionvalue = true; }
        for(var i in options) {
            var option = document.createElement("option");
            if (addoptionvalue==true)
                option.value=i;
            option.text = options[i];
            element.add(option);
        }
    };

    /*
     //DOC
     createSelectWithOptionGroup function
     elkészít egy selectet optiongrouppal
     paraméterek:
     parent: string - a szülő azonosítója
     params: object - plusz paraméterek
     options: a választható elemek - object
     return : az új html elem mutatóját küldi vissza
     */

    static createSelectWithOptionGroup=function(parent,params,options)
    {
        var newdiv = document.createElement("select");   //creat
        for (var key in params)
        {
            if (key!="innerHTML") newdiv.setAttribute(key,params[key]);                      //add an id
        }
        if ('innerHTML' in params) {
            newdiv.innerHTML=params.innerHTML
        }
        parent.appendChild(newdiv);

        htmlElementCreator.addGroupToSelect(newdiv,options);
        return newdiv
    };

    /*
     //DOC
     addGroupToSelect function
     option-group-okat ad egy selecthez
     paraméterek:
     element string - a szülő azonosítója
     options: a választható elemek - object
     */

    static addGroupToSelect=function(element,options)
    {
        for(var i in options) {
            var option = document.createElement("optgroup");
            option.label = i;
            element.add(option);
            htmlElementCreator.addOptionToSelect(element,options[i])
        }
    };

    /*
     //DOC
     addOptionToDataList function
     optionöket ad egy datalisthez
     paraméterek:
     element string - a szülő azonosítója
     options: a választható elemek - object
     */

    static addOptionToDataList=function(element,options)
    {
        for (let key in options)
        {
            element.innerHTML+="<option value="+options[key]+" />"
        }
    }
}
