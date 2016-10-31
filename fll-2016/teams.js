/*
 * Page for single teams, region-filtered teams, all teams
 * https://shancarter.github.io/mr-data-converter/
 */

var origin = {
    'nord-ovest': 'Liguria, Piemonte, Valle D’Aosta, Provincia di Piacenza , Lombardia (eccetto province di Brescia, Sondrio, Mantova)',
    'nord-est': 'Triveneto, Province di Brescia, Sondrio e Mantova',
    'centro': 'Toscana, Emilia-Romagna (eccetto Piacenza), Umbria, Marche, alto Lazio, Abruzzo',
    'sud': 'Basso Lazio, Campania, Basilicata, Puglia, Molise',
    'isole-e-calabria': 'Calabria , Sicilia, Sardegna'
};

var cityToRegion = {
    'genova': 'nord-ovest',
    'reggio emilia': 'nord-est',
    'pistoia': 'centro',
    'napoli': 'sud',
    'catania': 'isole-e-calabria'
};

var regionsFLL = ['nord-ovest', 'nord-est', 'centro', 'sud', 'isole-e-calabria'];
var regionsFLLJr = ['rovereto', 'genova', 'pistoia', 'catania', 'brescia', 'settimo-torinese', 'pachino'];
var colors = ['#ffefef', '#ffffef', '#efffef', '#eff8ff', '#f7efff'];

document.addEventListener('DOMContentLoaded', function() {
    var baseUrlFLL = 'http://fll-italia.it/fll/2016/';
    var baseUrlFLLJr = 'http://fll-italia.it/junior/2016/';
    var hash = window.location.hash;
    var teamFLLRe = /^#FLL(\d+)$/;
    var teamJrRe = /^#FLLJR(\d+)$/;
    var teamAllFLLRe = /^#FLL$/;
    var teamAllFLLJrRe = /^#FLLJr$/;
    var regionFLLRe = /^#(?:nord-ovest|nord-est|centro|sud|isole-e-calabria)$/;
    var regionJrRe = /^#(?:rovereto|genova|pistoia|catania|brescia|settimo-torinese|pachino)$/;

    console.log('Starting');

    var teamFLL = teamFLLRe.exec(hash);
    var teamJr = teamJrRe.exec(hash);

    var regionFLL = regionFLLRe.exec(hash);
    var regionJr = regionJrRe.exec(hash);

    var teamFLLAll = teamAllFLLRe.exec(hash);
    var teamFLLJrAll = teamAllFLLJrRe.exec(hash);

    if (regionFLL || teamFLL) {
        build('fllTeams', regionFLL, teamFLL, baseUrlFLL);
    } else if (regionJr || teamJr) {
        build('fllJrTeams', regionJr, teamJr, baseUrlFLLJr);
    } else if (teamFLLAll) {
        build('', false, false, baseUrlFLL);
    } else if (teamFLLJrAll) {
        build('', false, false, baseUrlFLLJr);
    }
})

function build(url, region, team, baseUrl) {
    fetchJSONFile('https://rawgit.com/Naramsim/FLL/master/fll-2016/' + url + '.json', function(data){
        // console.log(data);
        var semiFinalLink = '';
        var intermediate = '';
        var teamLink = '';
        var table = '@<table><thead><tr><th>ID</th><th>Team</th><th>Da</th><th>Semi Finale</th></tr></thead><tbody>#</tbody></table>';

        if (region) {
            region = region[0].slice(1); // slice the hash
        }

        if(team) {

        } else if (region) {
            var over = '<h3>Squadre iscritte alla fase #</h3><div>Le squadre provengono da: @</div></br>';

            if (url === 'fllTeams') {
                over = over.replace('#', region).replace('@', origin[region])
                table = table.replace('@', over);
            } else if (url === 'fllJrTeams') {
                table = table.replace('@', '');
            }

            data.forEach(function(row) {
                if (region == convertCityToRegion(row['iscrizione a qualificazione regionale'], url)) {
                    semiFinalLink = baseUrl + 'semi-final/#' + convertCityToRegion(row['iscrizione a qualificazione regionale'], url);
                    teamLink = baseUrl + 'teams/#' + row['nr. Iscrizione'];
                    intermediate += '<tr>';
                    intermediate += '<td>' + row['nr. Iscrizione'] + '</td>';
                    intermediate += '<td>' +
                                    // '<a href=' + teamLink + '>' +
                                    row['nome squadra'] + 
                                    // '</a>' +
                                    '</td>';
                    intermediate += '<td><a href=http://maps.google.com/?q=' + row['città'] + '>' + up(row['città']) + '</a></td>';
                    intermediate += '<td>' +
                                    // '<a href=' + semiFinalLink + '>' +
                                    up(convertCityToRegion(row['iscrizione a qualificazione regionale'], url)) + 
                                    // '</a>' +
                                    '</td></tr>';
                }
            });
            table = table.replace('#', intermediate)
            document.getElementById('teams').insertAdjacentHTML( 'beforeend', table );
            addCSS('body{background: linear-gradient(-45deg, #f3f2ef, ' + colors[regionsFLL.concat(regionsFLLJr).indexOf(region)] + ');}')
        } else {
            data.forEach(function(row){
                semiFinalLink = baseUrl + 'semi-final/#' + convertCityToRegion(row['iscrizione a qualificazione regionale'], url);
                var teamLink = baseUrl + 'teams/#' + row['nr. Iscrizione'];
                intermediate += '<tr>';
                intermediate += '<td>' + row['nr. Iscrizione'] + '</td>';
                intermediate += '<td><a href=' + teamLink + '>' + row['nome squadra'] + '</a></td>';
                intermediate += '<td><a href=http://maps.google.com/?q='+ row['città'] + '>' + up(row['città']) + '</a></td>';
                intermediate += '<td><a href=' + semiFinalLink + '>' + up(convertCityToRegion(row['iscrizione a qualificazione regionale'], url)) + '</a></td></tr>';
            })
            table = table.replace('#', intermediate)
            document.getElementById('teams').insertAdjacentHTML( 'beforeend', table );
        }
    });
}

function convertCityToRegion(city, fll) {
    if (fll === 'fllTeams') {
        var normalized = city.replace(' (no Lecce perché team Junior)', '').replace(' ', '').toLowerCase();
        return cityToRegion[normalized];
    } else {
        return city;
    }
    
}

function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}

function up(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase().replace('-', ' ');
}

function addCSS(cssRule) {
    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = cssRule;
    document.body.appendChild(css);
}