/*
* Page for single teams, region-filtered teams, all teams
*/

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
    var teamJr = teamFLLRe.exec(hash);
    var regionFLL = regionFLLRe.exec(hash);
    var regionJr = regionFLLRe.exec(hash);

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
        var table = '<table><thead><tr><th>ID</th><th>Team</th><th>Da</th><th>Semi Finale</th></tr></thead><tbody>#</tbody></table>'

        if (region) {
            region = region[0].slice(1); // slice the hash
        }
        if(team) {

        } else if (region) {
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
