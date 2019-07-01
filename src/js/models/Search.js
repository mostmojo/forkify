import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() { // will always read query from object above
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '5019c290a63cfc2a15aecbfce2bae61e';
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}