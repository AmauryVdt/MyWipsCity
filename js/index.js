var randomScore = "";
window.onload = function setRandomScore() {
    randomScore = Math.floor(Math.random() * 100) + 1;
    document.getElementById("userScore").placeholder = randomScore;
}

const scoreboard = [];
async function myFunction() {
    const response = await fetch('http://localhost:8080/');
    const myJson = await response.json(); //extract JSON from the http response
    console.log()
}

function setScore(name) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:8080', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        user: name,
        score: randomScore.toString()
    }));
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
