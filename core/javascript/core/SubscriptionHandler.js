class SubscriptionHandler
{
    static subscriptions = [];

    static subscribe(callWord, classPointer, functionName, prioritized = false)
    {
        if (this.subscriptions===undefined)
            this.subscriptions=[];
        if (this.subscriptions[callWord]===undefined)
            this.subscriptions[callWord]=[];
        if (prioritized===true)
        {
            this.subscriptions[callWord].unshift([classPointer, functionName]);
        }
        else this.subscriptions[callWord].push([classPointer, functionName]);
    }

    static initSubscription(callback, resultState, result)
    {
        console.log(result)
        console.log(callback)
        console.log(this.subscriptions)
        if (this.subscriptions === undefined)
        {
            alert('ERROR - SubscriptionHandler is empty');
            return;
        }

        if (!Array.isArray(callback)) callback = [callback]
        if (resultState===undefined)
        {
            resultState =400;
            callback.push('subscription resultState vas undefined');
        }

        if (Array.isArray(result) && result.length === 1)
            result=result[0]

        this.callSubscribedFunctions(callback, resultState, result);
    }

    static callSubscribedFunctions(callback, resultState, result) {
        for (let callword of callback)
        {
            console.log(callword)
                for (let [classPointer, functionName ] of this.subscriptions[callword])
                {
                    console.dir([classPointer, functionName ])
                    if (classPointer[functionName] !== undefined) {
                        classPointer[functionName](resultState, result);
                    }
                    else
                    {
                        console.log(classPointer.constructor.name + ' - ' + functionName + '  not exists')
                    }
                }

        }
    }
    //
    // displayUndefinedCallbackResult(result, callback) {
    //     alert("CALLBACK RESULT ERROR");
    //     console.log("CALLBACK RESULT ERROR : BAD RESULT FORMAT FOR "+ callback)
    //     console.log(result)
    // }
    //
    // handleError(result, callback) {
    //     let errorDisplayed = false;
    //     console.log(callback)
    //     for (let key of callback)
    //     {
    //         let callbackFunc = this.callBackFunctions[key]
    //
    //         if (callbackFunc === undefined)
    //         {
    //             console.log('ERROR ' + key + ' not exists in callbackFunctions of ' + this.constructor.name)
    //             errorDisplayed = true;
    //             continue;
    //         }
    //
    //         for (let key2 of callbackFunc) {
    //             if (typeof (key2) === "object") {
    //                 if (key2["ERROR"] !== undefined) {
    //                     this.checkAndCallFunction(key2["ERROR"], result);
    //                 }
    //             } else errorDisplayed = true;
    //         }
    //     }
    //     if (errorDisplayed)  this.displayErrorToGlobalElement(result)
    // }
    //
    // displayErrorToGlobalElement(err)
    // {
    //     if (this.errorElement===null)
    //     {
    //         console.log("ERROR")
    //         console.log(err)
    //     }
    //     else
    //     {
    //         this.errorElement.innerHTML+="ERROR<br/>";
    //         this.errorElement.innerHTML+=err
    //     }
    // }
    //
    // handleSuccess(result, callback) {
    //     if (result === undefined)
    //     {
    //         this.handleSuccessUndefined();
    //     }
    //     else if (result === "NO_VALUE")
    //     {
    //         this.handleSuccessWithoutValue(callback);
    //     }
    //     else
    //         this.handleSuccessWithValue(result, callback)
    // }
    //
    // handleSuccessUndefined() {
    //     alert("CALLBACK_SUCCESS_UNDEFINED");
    //     console.log("CALLBACK_SUCCESS_UNDEFINED")
    // }
    //
    // handleSuccessWithoutValue(callback) {
    //     let errorDisplayed = false;
    //     for (let key of callback)
    //     {
    //         let callbackFunc = this.callBackFunctions[key]
    //         if (callbackFunc === undefined)
    //         {
    //             console.log('ERROR ' + key + ' not exists in callbackFunctions of ' + this.constructor.name)
    //             continue;
    //         }
    //
    //         for (let key2 of callbackFunc) {
    //             if (typeof (key2) === "object") {
    //                 this.checkAndCallFunction(key2['NOVALUE'], null);
    //
    //             }
    //             else errorDisplayed = true
    //         }
    //
    //         if (errorDisplayed){
    //             alert("CALLBACK_RESULT_NOVALUE");
    //             console.log("CALLBACK_RESULT_NOVALUE")
    //             console.log(callbackFunc)
    //         }
    //     }
    //
    // }
    //
    // handleSuccessWithValue(result, callback) {
    //
    //
    //
    //
    //     for (let key of callback)
    //     {
    //
    //         let callbackFunc = this.callBackFunctions[key]
    //         console.log(callbackFunc)
    //         if (callbackFunc === undefined)
    //         {
    //             console.log('ERROR ' + key + ' not exists in callbackFunctions of ' + this.constructor.name)
    //             continue;
    //         }
    //         for (let key2 of callbackFunc)
    //         {
    //             if (typeof(key2) === "string")
    //             {
    //                 this.checkAndCallFunction(key2, result);
    //             }
    //             else if (typeof(key2) === "object")
    //             {
    //                 console.log(key2)
    //                 if (key2["SUCCESS"]!==undefined)
    //                 {
    //                     this.checkAndCallFunction(key2["SUCCESS"], result);
    //                 }
    //                 else
    //                 {
    //                     alert("SUCCES_CALLBACK_MISSING");
    //                     console.log("SUCCES_CALLBACK_MISSING")
    //                     console.log(key2);
    //                     console.log(result);
    //
    //                     return
    //                 }
    //             }
    //         }
    //
    //     }
    // }
    //
    // //DO VSM függetlenitése a Callbackhndlertől -> controllerparent?
    //
    // checkAndCallFunction(func, result) {
    //     console.log(func)
    //     console.log(result)
    //
    //     let [obj,funcname]=func.split(".")
    //     console.log([obj,funcname])
    //     let success = VSM.call(obj,funcname,result)
    //     if (success === false) {
    //         alert('function ' + func + " not exists");
    //     }
    // }

}
