// apiKey = "AIzaSyAWopeKfjAyUSPhGuLJeKnTGkUurG6fS_0";
// engineKey = "dc3d3cc381ea23dea";
// apiUrlString = "https://www.googleapis.com/customsearch/v1?key=" + apiKey + "&cx=" + engineKey +"&q=";

// function BuildURLString(queryArray){
//     queryString = Retrieve.EncodeQueries(queryArray);
//     return urlString + queryString;
// }

// function GetLinks(jsonObject){
//     linkList = Array();
//     let index = 0;

//     jsonObject.items.array.forEach(element => {
//         linkList[index] = element.link;
//         index ++;
//     });

//     return linkList;
// }

class GoogleHandler{
    constructor (){
        this.apiKey = "AIzaSyAWopeKfjAyUSPhGuLJeKnTGkUurG6fS_0";
        this.engineKey = "dc3d3cc381ea23dea";
        this.urlString = "https://www.googleapis.com/customsearch/v1?key=" + this.apiKey + "&cx=" + this.engineKey +"&q=";
    }

    BuildURLString(queryArray){
        let queryString = EncodeQueries(queryArray);
        return this.urlString + queryString;
    }

    async RetrieveJSON(urlString){
        return await GetJson(urlString);
    }

    GetLinks(jsonObject){
        const linkList = Array();
        linkList[0] = "<h1>Google results</h1>";
        let index = 1;
    
        jsonObject.items.forEach(item => {
            linkList[index] = item.title;
            index ++;

            if (item.pagemap.cse_image != undefined && item.pagemap.cse_image.length > 0){
                linkList[index] = "<img src=\"" + item.pagemap.cse_image[0].src + "\" alt = \"Hewwo\" width=\"120\" height = \"90\">"
                index ++;
            }
            
            linkList[index] = item.snippet;
            index ++;
            linkList[index] = item.link + "<br/>";
            index ++;
        });
    
        return linkList;
    }   
}