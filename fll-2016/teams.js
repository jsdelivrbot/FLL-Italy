/*
* Page for single teams, region-filtered teams, all teams
*/

var origin = {
    'nord-ovest': 'Liguria, Piemonte, Valle D’Aosta, Provincia di Piacenza , Lombardia (eccetto province di Brescia, Sondrio, Mantova)',
    'nord-est': 'Triveneto, Province di Brescia, Sondrio e Mantova',
    'centro': 'Toscana, Emilia-Romagna (eccetto Piacenza), Umbria, Marche, alto Lazio, Abruzzo',
    'sud': 'Basso Lazio, Campania, Basilicata, Puglia, Molise',
    'isole-e-calabria': 'Calabria , Sicilia, Sardegna'
}

document.addEventListener('DOMContentLoaded', function() {
    var baseUrlFLL = "http://fll-italia.it/fll/2016/";
    var baseUrlJr = "http://fll-italia.it/junior/2016/";
    //var links = ["nord-ovest", "nord-est", "centro", "sud", "isole-e-calabria"];
    var hash = window.location.hash;
    var teamFLLRe = /^#FLL(\d+)$/;
    var teamJrRe = /^#FLLJR(\d+)$/;
    var regionFLLRe = /^#(?:nord-ovest|nord-est|centro|sud|isole-e-calabria)$/;
    var regionJrRe = /^#(?:rovereto|genova|pistoia|catania|brescia|settimo-torinese|pachino)$/;

    console.log("Starting");

    var teamFLL = teamFLLRe.exec(hash);
    var teamJr = teamJrRe.exec(hash);
    var regionFLL = regionFLLRe.exec(hash);
    var regionJr = regionJrRe.exec(hash);

    if (regionFLL || teamFLL) {
        build('fllTeams', regionFLL, teamFLL, baseUrlFLL, 'FLL')
    } else if (regionJr || teamJr) {
        build('fllJrTeams', regionJr, teamJr, baseUrlJr, 'FLLJr');
    } 
})

function build(url, region, team, baseUrl, teamUrl) {
    fetchJSONFile('https://rawgit.com/Naramsim/FLL/master/fll-2016/' + url + '.json', function(data){
        console.log(data);
        var semiFinalLink = "";
        var intermediate = "";
        var teamLink = "";
        var table = '@<table><thead><tr><th>ID</th><th>Team</th><th>Da</th><th>Semi Finale</th></tr></thead><tbody>#</tbody></table>';

        if (region) {
            region = region[0].slice(1); // slice the hash
        }

        if(team) {

        } else if (region) {
            var over = '<h3>Squadre iscritte alla fase #</h3><div>Le squadre provengono da:@</div></br>'

            if (url === 'fllTeams') {
                over = over.replace('#', region).replace('@', origin[region])
                table = table.replace('@', over);
            } else if (url === 'fllJrTeams') {
                table = table.replace('@', '');
            }

            for (var key in data) {
                if (data.hasOwnProperty(key) && region == data[key].region) {
                    semiFinalLink = baseUrl + "semi-final/#" + data[key].region;
                    teamLink = baseUrl + "teams/#" + teamUrl + key;
                    intermediate += '<tr>';
                    intermediate += "<td>" + teamUrl + key + "</td>";
                    intermediate += "<td>" +
                                    // "<a href=" + teamLink + ">" +
                                    data[key].name + 
                                    // "</a>" +
                                    "</td>";
                    intermediate += "<td>" + data[key].city + "</td>";
                    intermediate += "<td>" +
                                    // "<a href=" + semiFinalLink + ">" +
                                    data[key].region + 
                                    // "</a>" +
                                    "</td></tr>";
                }
            }
            table = table.replace('#', intermediate)
            document.getElementById('teams').insertAdjacentHTML( 'beforeend', table );
        } else {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    semiFinalLink = baseUrl + "semi-final/#" + data[key].region;
                    var teamLink = baseUrl + "teams/#" + teamUrl + key;
                    intermediate += '<tr>';
                    intermediate += "<td>" + teamUrl + key + "</td>";
                    intermediate += "<td><a href=" + teamLink + ">" + data[key].name + "</a></td>";
                    intermediate += "<td>" + data[key].city + "</td>";
                    intermediate += "<td><a href=" + semiFinalLink + ">" + data[key].region + "</a></td></tr>";
                }
            }
            table = table.replace('#', intermediate)
            document.getElementById('teams').insertAdjacentHTML( 'beforeend', table );
        }
    });
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