function createStandingsTable(standings) {
    // Get table
    let table = document.getElementById("standings-table");
    
    for (let i=0; i<standings.length; i++){
        const tr = document.createElement("tr");
        // Posicion
        let position = standings[i].position
        // Equipo
        let team = standings[i].team.name
        // Logo
        let logo = document.createElement("img")
        logo.setAttribute("src",standings[i].team.crestUrl)
        logo.classList.add("logo-equipo")
        // Puntos
        let points = standings[i].points
        // Partidos jugados
        let games = standings[i].playedGames
        // Ganados
        let won = standings[i].won
        // Empatados
        let draw = standings[i].draw
        // Perdidos
        let lost = standings[i].lost
        // Goles a favor
        let goalsFor = standings[i].goalsFor
        // Goles en contra
        let goalsAgainst = standings[i].goalsAgainst
        // Diferencia de goles
        let goalDifference = standings[i].goalDifference

        let results = [position,logo,team,points,games,won,draw,lost,goalsFor,goalsAgainst,goalDifference] 
        for (let j=0; j<results.length; j++){
            const td = document.createElement("td")
            td.append(results[j])
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}

function hideSpinner(){
    let spinner = document.getElementById('loadingSpinner')
    spinner.style.display = "none";
}

function showSpinner(){
    let spinner = document.getElementById('loadingSpinner')
    spinner.style.display = "block";
}

async function getStandings() {
    // Activamos el spinner
    showSpinner();
    const url = 'https://api.football-data.org/v2/competitions/2014/standings'
    fetch(url,{
        headers:{
            'X-Auth-Token': 'd810954be1db4d3d94425c1f5ac4ef97'
        }
    }).then(response => response.json())
    .then(data => {
        hideSpinner();
        createStandingsTable(data.standings[0].table);
    });
}

getStandings()

//standingsTableCreate(standings.standings[0].table);

