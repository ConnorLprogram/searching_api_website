function EncodeQueries(queryArray){
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

    try{
        return await RetrieveXMLRequest(xmlRequest);
    }
    catch (error){
        throw new Error("Request could not be completed:<br/>" + error);
    }
}

// async function GetJsonRapidAPI(urlString, apiKey, hostKey){ //Does not work currently because of CORS policy
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
            else if (this.readyState != 4 && this.status != 200){
                resolve("Failed");
            }
        };
    });

    results = await jsonPromise;

    if (results == "Failed"){
        throw new Error("Invalid request: " + sentXMLRequest.status);
    }
    else if (results.error === undefined){
        return results;
    }

    RaiseRetrieveError(results);
}


function RaiseRetrieveError(errorJson){
    throw new Error("Error when retrieving request:\ncode: " + errorJson.error.code + "<br/>message: " + errorJson.error.message);
}
