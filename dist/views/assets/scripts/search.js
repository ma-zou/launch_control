export default class Search {
    constructor(searchArray) {
        this.value = ""
        this.searchArray = searchArray
        this.results = []
    }

    updateValue(string) {
        let results = []

        console.log(this.searchArray);

        this.searchArray.forEach(item => {
            if(item.replace('{query}', '').indexOf(string) != -1) results.push(item)
        })
        
        this.results = results
        this.value = string
    }

    getResults() {
        if(this.results.length > 0) return this.results
        return false
    }
} 