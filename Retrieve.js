function EncodeQueries(queryArray){ //need to check to see if actually array
    let queryString = "";
    if (queryArray.length > 0){
        let convertedQueries = new Array();
        for (let i = 0; i < queryArray.length; i++){
            convertedQueries[i] = encodeURIComponent(queryArray[i]);
        }

        queryString = convertedQueries.join("+")
    }
    
    return queryString;
}


async function GetJson(urlString){
    let xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", urlString);
    xmlRequest.send();
    return await RetrieveXMLRequest(xmlRequest);
}

// async function GetJsonRapidAPI(urlString, apiKey, hostKey){ //Does not work bc of CORS policy
//     let xmlRequest = new XMLHttpRequest();
//     xmlRequest.open("GET", urlString);
//     xmlRequest.setRequestHeader("Access-Control-Allow-Origin", "https://contextualwebsearch-websearch-v1.p.rapidapi.com")
//     xmlRequest.setRequestHeader("X-RapidAPI-Key", apiKey);
//     xmlRequest.setRequestHeader("X-RapidAPI-Host", hostKey);
//     xmlRequest.send();
//     return await RetrieveXMLRequest(xmlRequest);
// }

async function RetrieveXMLRequest(sentXMLRequest){
    let jsonPromise = new Promise(function (resolve){
        sentXMLRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var jsonArr = JSON.parse(this.responseText);
                resolve(jsonArr);
            }
        };
    });

    return await jsonPromise;
}

// function ReadFile(fileName){
//     var fr=new FileReader();
//     const contents = fr.readAsText(fileName);
//     return JSON.parse(contents);
// }