var randomScore = "";

const scoreboard = [];
async function myFunction() {
    const response = await fetch('http://localhost:8080/');
    const myJson = await response.json(); //extract JSON from the http response
    console.log()
}

new Vue({
    el: '#app',
    data: {
        jsonData: []
    },
    mounted () {
        this.loadJsonData();
    },
    methods: {
        async loadJsonData(){
            const response = await fetch('http://localhost:8080');
            this.jsonData = await response.json(); //extract JSON from the http response
            this.jsonData = this.jsonData.sort(function (a,b){
                return b.score - a.score;
            })
        }
    }
})
