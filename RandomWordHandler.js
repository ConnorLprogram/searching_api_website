class RandomWordHandler{
    constructor (){
        this.urlString = "https://random-word-api.herokuapp.com/word?number=";
    }


    BuildURLString(num){
        return this.urlString + num;
    }

    
    async RetrieveJSON(urlString){
        return await GetJson(urlString);
    }
}