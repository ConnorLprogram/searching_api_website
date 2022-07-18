class GoogleHandler{
    constructor (){
        this.apiKey = "AIzaSyAWopeKfjAyUSPhGuLJeKnTGkUurG6fS_0";
        this.engineKey = "dc3d3cc381ea23dea";
        this.urlString = "https://www.googleapis.com/customsearch/v1?key=" + this.apiKey + "&cx=" + this.engineKey +"&q=";
    }


    BuildURLString(queryArray, maxResults){
        let queryString = EncodeQueries(queryArray);
        return this.urlString + queryString + "&num=" + maxResults;
    }


    async RetrieveJSON(urlString){
        try{
            return await GetJson(urlString);
        }
        catch(error){
            throw new Error("Error occured when retrieving Google JSON:<br/>" + error);
        }
    }


    GetLinks(jsonObject){
        const linkList = Array();
        linkList[0] = "<h1>Google results</h1>";
        let index = 1;
    
        if (jsonObject === undefined){
            linkList[index] = "No results";
            return linkList;
        }

        jsonObject.items.forEach(item => {
            
            linkList[index] = "<a href=\"" + item.link + "\">" + item.title +"</a><br/>";
            index ++;

            if (item.pagemap.cse_image !== undefined && item.pagemap.cse_image.length > 0){
                linkList[index] = "<img src=\"" + item.pagemap.cse_image[0].src + "\" alt = \"Hewwo\" width=\"120\" height = \"90\">"
                index ++;
            }
            
            linkList[index] = item.snippet + "<br/>";
            index ++;
        });
    
        return linkList;
    }   
}