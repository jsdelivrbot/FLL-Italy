document.addEventListener('DOMContentLoaded', function() {
    var baseURL = 'http://fll-italia.it/fll/2016/teams/#';
    var table = "<font size='+1'><b>Squadre Iscritte</b></font>" + 
    '<table><thead><tr><th>Fase</th><th>Iscritte</th></tr></thead>#</table>';
    var currentPath = window.location.pathname;
    var currentGame = /^\/(\w+)\/2016/.exec(currentPath)
    var regionsFLL = {  'nord-est': 0, 
                        'nord-ovest': 0,
                        'centro': 0,
                        'sud': 0,
                        'isole-e-calabria': 0};
    var regionsJr = {   'rovereto': 0,
                        'genova': 0,
                        'pistoia': 0,
                        'catania': 0,
                        'brescia': 0,
                        'settimo-torinese': 0,
                        'pachino': 0};

    if (currentGame[1] === 'fll') {
        build('fll', regionsFLL)
    } else if (currentGame[1] === 'junior') {
        build('fllJr', regionsJr)
    }
})

function build(game, regions) {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://rawgit.com/Naramsim/FLL-Italy/master/fll-2016/' + game + 'Teams.json', true);
    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            var intermediate = '';

            Object.keys(data).forEach(function(key) {
                regions[data[key].region] += 1;
            })
            Object.keys(regions).forEach(function(key){
                intermediate += '<tr><td><a href="' + baseURL + key + '">' + key + '</a></td><td>' + regions[key] + '</td></tr>'
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