// https://gist.github.com/EtienneR/2f3ab345df502bd3d13e
class AjaxCaller
{
    set getResponseError(value) {
        this._getResponseError = value;
    }
    addCustomHeader(name, value) {
        this._customHeader.push([name, value]);
    }
    _targetUrl;
    _requestType;
    _postFields;
    // _urlParameter
    _requestParameters;
    _subscriptionCallWord;
    _customHeader=[];
    _getResponseError = false;
    _responseIsJSONEncoded = true;



    set subscriptionCallWord(value) {
        this._subscriptionCallWord = value;
    }

    set requestParameters(value) {
        this._requestParameters = value;
    }

    set targetUrl(value) {
        this._targetUrl = value;
    }

    set requestType(value) {
        this._requestType = value.toUpperCase();
    }

    set postFields(value) {
        this._postFields = value;
    }

    send()
    {
        let request = new XMLHttpRequest();


        request.open(this._requestType,this._targetUrl,true);
        if (this._customHeader !== [])
        {
            console.log(this._customHeader)
            for (let [name, value] of this._customHeader)
            {
                console.log([name, value])
                request.setRequestHeader(name, value);
            }
        }
        console.log(request)
        request.onreadystatechange = ()=>
        {


            let resultData
            if (request.readyState !== 4)
                return;
            console.log("REQUESTCHANGE");
            console.log(request.readyState);
            console.log(request.status);
            console.log(request)
            try {
                if (this._responseIsJSONEncoded === true) {
                    resultData = JSON.parse(request.responseText);
                } else
                    resultData = request.responseText;
            }
            catch (e)
            {
                resultData = request.responseText;
            }

            if (request.status !== 200 && request.status !== 304)
            {
                if (this._getResponseError === false) {
                    alert('HTTP error ' + request.status + ' ' + request.response);
                    return;
                    console.log(request)
                }
            }
            if (this._subscriptionCallWord!==null) {
                SubscriptionHandler.initSubscription(this._subscriptionCallWord, resultData, request.status)
            }
        };
        if (request.readyState === 4)
            return;

        if (this._postFields === null)
        {

            request.send()
        }
        else
            request.send(JSON.stringify(this._postFields));
    }


    //
    // static sendGetRequest(targeturl, params, instance, callbackparam)
    // {
    //     if (params!=null)
    //     {
    //         for (const key in params) {
    //             if (params.hasOwnProperty(key))
    //                 targeturl+="&"+key+"="+params[key];
    //         }
    //         params=null;
    //     }
    //     this.createRequest("GET", targeturl, params, instance, callbackparam)
    // }
    //
    //
    //
    // static sendPostRequest(targeturl, params, instance, callbackparam)
    // {
    //
    //
    //     if (params!=null)
    //     {
    //         let para = "";
    //         for (let key in params)
    //         {
    //             if (params.hasOwnProperty(key))
    //                 para+=key+"="+params[key];
    //             para+="&"
    //         }
    //         para=(para.substring(0,para.length-1));
    //         params=para;
    //     }
    //     this.createRequest("POST", targeturl, params, instance, callbackparam)
    // }
    //
    // static createRequest(requesttype, targeturl, params, instance, callbackparam)
    // {
    //
    //     let ajaxfile=this.targetPHPFile;
    //     ajaxfile+="?target="+targeturl;
    //     let request = this.createXMLHTTPObject();
    //     console.log(request)
    //     request.open(requesttype,ajaxfile,true);
    //     if (requesttype==="POST")
    //         request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    //     request.onreadystatechange = ()=>
    //     {
    //
    //         console.log("REQUESTCHANGE");
    //         console.log(request.readyState);
    //         console.log(request.status);
    //         if (request.readyState !== 4)
    //             return;
    //         if (request.status !== 200 && request.status !== 304)
    //         {
    //             alert('HTTP error ' + request.status);
    //             return;
    //         }
    //         const [resultState, resultData]=JSON.parse(request.responseText);
    //         console.log([targeturl,instance, params, resultState, resultData, callbackparam])
    //         if (callbackparam!==null) {
    //             instance.callCallbackFunctions(resultState,resultData, callbackparam)
    //         }
    //     };
    //     if (request.readyState === 4)
    //         return;
    //     if (params === null)
    //     {
    //         request.send()
    //     }
    //     else
    //         request.send(params);
    // }


}
