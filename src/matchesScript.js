function createMatchesTable(matches) {
    // Get table
    var table = document.getElementById("matches-table");

    for (let i=0; i<matches.length;i++) {
        const tr = document.createElement("tr")
        // Jornada
        let matchday = matches[i].matchday
        // Local
        let local = matches[i].homeTeam.name
        // Resultado
        // let result = `${matches[i].score.fullTime.homeTeam? matches[i].score.fullTime.homeTeam: '--'} - ${matches[i].score.fullTime.awayTeam? matches[i].score.fullTime.awayTeam:'--'}`
        let result = matches[i].score.fullTime.homeTeam + " - " + matches[i].score.fullTime.awayTeam
        if (result=="null - null"){
            result = "-- - --"
        }
        // Visitante
        let away = matches[i].awayTeam.name
        // Fecha
        let date = matches[i].utcDate

        let gap = ' ';

        // Logo local
        let logoLocal = document.createElement("img");
        logoLocal.setAttribute("src", "https://crests.football-data.org/" + matches[i].homeTeam.id + ".svg");
        logoLocal.classList.add("logo-equipo");

        // Logo local
        let logoAway = document.createElement("img");
        logoAway.setAttribute("src", "https://crests.football-data.org/" +matches[i].awayTeam.id + ".svg");
        logoAway.classList.add("logo-equipo");

        let results = [matchday,gap,logoLocal,local,result,away,logoAway,gap,date.replace('T',' ').replace('Z',' ')]
        for (let j=0; j<results.length; j++) {
            const td = document.createElement("td")
            td.classList.add("ficha-partido")
            td.append(results[j])
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}

function deleteRows(table) {
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
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

function hideTableHeader(){
    let theader = document.getElementById('tabla-clasi-header')
    theader.style.display = "none";
}

function showTableHeader(){
    let theader = document.getElementById('tabla-clasi-header')
    theader.style.display = "block";
}


function filterByName(data){
    // Get input
    var input = document.getElementById("filter-name");
    // Get input value
    var filteredName = input.value.toLowerCase();
    // Filter matches by name
    let matchesList = data.matches;
    let filteredMatches = matchesList.filter(match => match.homeTeam.name.toLowerCase().includes(filteredName) || match.awayTeam.name.toLowerCase().includes(filteredName));

    // Create new table with filtered teamcreateMatchesTable(filteredMatches);
    createMatchesTable(filteredMatches);
    
}

async function getMatches() {
    // Clear current table rows
    var table = document.getElementById("matches-table");
    deleteRows(table);
    // Activamos el spinner
    showSpinner();
    // Llamamos a la API
    const url = 'https://api.football-data.org/v2/competitions/2014/matches'
    fetch(url,{
        method:'GET',
        headers:{
            'X-Auth-Token': 'd810954be1db4d3d94425c1f5ac4ef97'
        }
    }).then(response => response.json()
    ).then(data => {
        // Ocultar spinner
        hideSpinner();
        // Generar tabla
        filterByName(data);
    });
}



getMatches()

