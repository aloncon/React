export const getScriptURL = (function() {
    const scripts = document.getElementsByTagName('script');
    const index = scripts.length - 1;
    const myScript = scripts[index];
    
    //console.log("Nav Item getScriptURL", myScript.src);


    return {
        getScriptSrc: function() { return myScript.src; },
        getBase : function () {return myScript.src.replace(/\/static\/.*/,"")},
        absolutizeSrc : function (src) {return (`${this.getBase()}/${src}`)} 
    };
})();




/*
if ((typeof initialState !== "undefined")){
    initialState["baseSrc"] = getScriptURL.getBase();
    console.log("getScriptURL", getScriptURL.getBase());
}
*/