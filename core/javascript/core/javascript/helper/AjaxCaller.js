/**
 * elküld egy http requestet egy szervernek, és fogadja is a választ
 */
// https://gist.github.com/EtienneR/2f3ab345df502bd3d13e
class AjaxCaller
{
    /**
     * a szerver url-je
     * @private
     */
    _targetUrl;

    /**
     * a request tipusa (PUT, POST, ...)
     * @private
     */
    _requestType;

    /**
     * request-el elküldött adat
     * @private
     */
    _postFields;

    /**
     * végleges válasz esetén meghívandó eventtrigger kulcsszó
     * @private
     */
    _subscriptionCallWord;

    /**
     * egyedi header
     * @type {[]}
     * @private
     */
    _customHeader=[];

    /**
     * ha false hiba esetén hibaüzenet, nincs adatátadás
     * @type {boolean}
     * @private
     * @DO true ágat tesztelni
     */
    _getResponseError = false;

    /**
     * ha true akkor a response-t JSON kódolásban várja és vissza is alakítja azt
     * @type {boolean}
     * @private
     */
    _responseIsJSONEncoded = true;

    set getResponseError(value) {
        this._getResponseError = value;
    }
    addCustomHeader(name, value) {
        this._customHeader.push([name, value]);
    }

    set subscriptionCallWord(value) {
        this._subscriptionCallWord = value;
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

    /**
     * a request összeállítása
     * elküldése
     * fogadása
     * event trigger kiváltása
     */
    send()
    {
        let request = new XMLHttpRequest();
        request.open(this._requestType,this._targetUrl,true);
        if (this._customHeader !== [])
        {
            for (let [name, value] of this._customHeader)
            {
                request.setRequestHeader(name, value);
            }
        }
        request.onreadystatechange = ()=>
        {
            let resultData
            if (request.readyState !== 4)
                return;
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
                }
            }
            if (this._subscriptionCallWord!==null) {
                EventSubscriptionHandler.triggerSubscriptionCall(this._subscriptionCallWord, resultData, request.status)
            }
        };
        if (request.readyState === 4)
            return;
        console.log(request)
        if (this._postFields === null)
        {
            request.send()
        }
        else
            request.send(JSON.stringify(this._postFields));
    }
}
