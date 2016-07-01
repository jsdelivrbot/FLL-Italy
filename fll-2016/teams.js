/*
* Page for single teams, region-filtered teams, all teams
*/
var regionNames = {
    C: 'centro',
    NE: 'nord-est',
    NO: 'nord-ovest',
    S: 'sud',
    IC: 'isole-e-calabria'
}
document.addEventListener('DOMContentLoaded', function() {
    var baseUrl = "http://fll-italia.it/fll/2016/";
    var links = ["nord-ovest", "nord-est", "centro", "sud", "isole-e-calabria"];
    var hash = "cetro";
    var teamRe = /^FLL(\d+)$/;
    var regionRe = /^(?:nord-ovest|nord-est|centro|sud|isole-e-calabria)$/;
    console.log("Starting");
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
    fetchJSONFile('https://cdn.rawgit.com/Naramsim/FLL/master/fll-2016/fllTeams.json', function(data){
        console.log(data);
        var semiFinalLink = "";
        var intermediate = "";
        var team = teamRe.exec(hash);
        var region = regionRe.exec(hash);
        var table = '<table><thead><tr><th>ID</th><th>Team</th><th>Da</th><th>Semi Finale</th></tr></thead><tbody>#</tbody></table>'
        if(team) {

        } else if (region) {
            for (var key in data) {
                if (data.hasOwnProperty(key) && hash === regionNames[data[key].region]) {
                    semiFinalLink = baseUrl + "semi-final/#" + regionNames[data[key].region];
                    var teamLink = baseUrl + "teams/#FLL" + key;
                    intermediate += '<tr>';
                    intermediate += "<td>FLL" + key + "</td>";
                    intermediate += "<td><a href=" + teamLink + ">" + data[key].name + "</a></td>";
                    intermediate += "<td>" + data[key].city + "</td>";
                    intermediate += "<td><a href=" + semiFinalLink + ">" + regionNames[data[key].region] + "</a></td></tr>";
                }
            }
            table = table.replace('#', intermediate)
            document.getElementById('teams').insertAdjacentHTML( 'beforeend', table );
        } else {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    semiFinalLink = baseUrl + "semi-final/#" + regionNames[data[key].region];
                    var teamLink = baseUrl + "teams/#FLL" + key;
                    intermediate += '<tr>';
                    intermediate += "<td>FLL" + key + "</td>";
                    intermediate += "<td><a href=" + teamLink + ">" + data[key].name + "</a></td>";
                    intermediate += "<td>" + data[key].city + "</td>";
                    intermediate += "<td><a href=" + semiFinalLink + ">" + regionNames[data[key].region] + "</a></td></tr>";
                }
            }
            table = table.replace('#', intermediate)
            document.getElementById('teams').insertAdjacentHTML( 'beforeend', table );
        }
    });
})