class RandomWordHandler{
    constructor (){
        this.urlString = "https://random-word-api.herokuapp.com/word?number=";
    }


    BuildURLString(num){
        return this.urlString + num;
    }

    
    async RetrieveJSON(urlString){
        try{
            return await GetJson(urlString);
        }
        catch(error){
            throw new Error("Error occured when retrieving RandomWord JSON:<br/>" + error);
        }
    }
}