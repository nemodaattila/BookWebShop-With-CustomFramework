/**
 * eseményfeliratkozáskezelő osztály
 * fel lehet iratkozni bizonyos kulcsszavakra, amiket az események küldhetnek
 *  !! a lehetséges kulcsszavak nincsenek mentve !!
 */

class EventSubscriptionHandler
{
    /**
     * feliratkozások tömbje
     * @type {[]}
     */
    static subscriptions = [];

    /**
     * feliratkozás eventre
     * @param callWord a kulcsszó (trigger-word) amire reagálni kell
     * @param objectPointer az osztály példánya, ami feliratkozik
     * @param functionName a trigger kiváltásakor lefuttatandó function neve
     * @param prioritized ha true (és több elem iratkozott fel ugyanarra az eventre) előre kerül a feliratkozó
     */
    static subscribe(callWord, objectPointer, functionName, prioritized = false)
    {
        if (this.subscriptions===undefined)
            this.subscriptions=[];
        if (this.subscriptions[callWord]===undefined)
            this.subscriptions[callWord]=[];
        if (prioritized===true)
        {
            this.subscriptions[callWord].unshift([objectPointer, functionName]);
        }
        else this.subscriptions[callWord].push([objectPointer, functionName]);
    }

    /**
     * event trigger kiváltása/meghívása, paraméterellenőrzések
     * @param callwords a kiváltandó (kulcsszó/szavak)
     * @param resultData hozzáfűzött adat
     * @param resultState http code
     */
    static triggerSubscriptionCall(callwords, resultData, resultState )
    {
        if (this.subscriptions === undefined)
        {
            alert('ERROR - SubscriptionHandler is empty');
            return;
        }
        if (!Array.isArray(callwords)) callwords = [callwords]

        if (Array.isArray(resultData) && resultData.length === 1)
            resultData=resultData[0]
        if (resultState===undefined)
        {
            resultState =400;
            resultData.push('subscription resultState was undefined');
        }
        this.callSubscribedFunctions(callwords, resultData, resultState);
    }

    /**
     * feliratkozott osztályok függvényeinek meghívása
     * @param callwords a kiváltandó (kulcsszó/szavak)
     * @param resultData hozzáfűzött adat
     * @param resultState http code
     */
    static callSubscribedFunctions(callwords, resultData, resultState) {
        for (let callword of callwords)
        {
            if (this.subscriptions[callword] === undefined)
            {
                console.log(callword +' - keyword not exists or there is not subscriber');
                continue
            }
            for (let [classPointer, functionName ] of this.subscriptions[callword])
            {
                if (classPointer[functionName] !== undefined) {
                    classPointer[functionName](resultData, resultState);
                }
                else
                {
                    console.log(classPointer.constructor.name + ' - ' + functionName + '  not exists')
                }
            }
        }
    }
}
