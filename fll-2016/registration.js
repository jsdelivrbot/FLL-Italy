var baseURL = 'http://fll-italia.it/?/2016/teams/#';
var table = "<font size='+1'><b>Squadre Iscritte</b></font>" + 
    '<table><thead><tr><th>Fase</th><th>Iscritte</th></tr></thead>#</table>';

document.addEventListener('DOMContentLoaded', function() {
    var currentPath = window.location.pathname;
    var currentGame = /^\/(\w+)\/2016/.exec(currentPath)
    var regionsFLL = {  'nord-est': 0, 
                        'nord-ovest': 0,
                        'centro': 0,
                        'sud': 0,
                        'isole-e-calabria': 0};
    var regionsJr = {   'brescia': 0,
                        'pistoia': 0,
                        'pachino': 0,
                        'catania': 0,
                        'genova': 0,
                        'rovereto': 0
                        };

    if (currentGame[1] === 'fll') {
        build('fll', regionsFLL, currentGame[1])
    } else if (currentGame[1] === 'junior') {
        build('fllJr', regionsJr, currentGame[1])
    }
})

function build(game, regions, gameUrl) {
    var request = new XMLHttpRequest();
    
    
    request.open('GET', 'https://rawgit.com/Naramsim/FLL-Italy/master/fll-2016/' + game + 'Teams.json', true);
    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            var intermediate = '';

            data.forEach(function(row) {
                regions[row['iscrizione a qualificazione regionale'].toLowerCase().replace(' ', '')] += 1;
            })
            Object.keys(regions).forEach(function(key){
                var baseURLNew = baseURL;
                if (game === 'fllJr') {
                    baseURLNew = baseURLNew.replace('teams/', key);
                }
                intermediate += '<tr><td><a href="' + baseURLNew.replace('?', gameUrl) + key + '">' + key + '</a></td><td>' + regions[key] + '</td></tr>'
            })

            table = table.replace('#', intermediate)
            document.getElementById('registration').insertAdjacentHTML('beforeend', table);
        }
    };
    request.onerror = function() {};
    request.send();
}

function up(str) {
    return string.charAt(0).toUpperCase() + string.slice(1).replace('-', ' ');
}