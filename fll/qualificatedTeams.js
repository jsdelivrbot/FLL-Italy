function up(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

document.addEventListener('DOMContentLoaded', function() {
	baseUrl = "http://fll-italia.it/fll/2015/";
	links = ["nord-ovest", "nord-est", "centro", "sud", "finale"];
	currentPage = location.href.split('/').splice(-2,1)[0];
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
	fetchJSONFile('https://cdn.rawgit.com/Naramsim/FLL/master/fll/teams.json', function(data){
		console.log(data);
		var location = "", semiFinalLink = "";
		qualified = [30,72,73,38,39,56,58,41,42,3,4,5,12,28,54,9,13,27,32,59,61,71,81,88,91,95,34,14];
		for (var key in data) {
			currentTeam = parseInt (key.replace(/(\s|\D)+/g, ''));
			if (qualified.indexOf(currentTeam)>-1){
				if (data.hasOwnProperty(key)) {
					if (data[key]["iscrizione_a_qualificazione_regionale"].indexOf("MEZZO") >= 0){location = 1}
					if (data[key]["iscrizione_a_qualificazione_regionale"].indexOf("PISTO") >= 0){location = 2}
					if (data[key]["iscrizione_a_qualificazione_regionale"].indexOf("GENOV") >= 0){location = 0}
					if (data[key]["iscrizione_a_qualificazione_regionale"].indexOf("CATAN") >= 0){location = 3}
					if (links.indexOf(currentPage) == location) {
						semiFinalLink = baseUrl	+ links[location] + "/";
						teamLink = baseUrl + "team/#" + key.replace(/\s+/g, '');
						tr  = '<tr/>';
						tr += "<td>" + key + "</td>";
						tr += "<td><a href=" + teamLink + ">" + data[key]["nome_squadra"] + "</a></td>";
						tr += "<td>" + up(data[key].citta) + "</td>";
						//tr += "<td><a href=" + semiFinalLink + ">" + data[key]["iscrizione_a_qualificazione_regionale"] + "</a></td>";
						table = document.getElementById('qualifiedTeams');
						table.insertAdjacentHTML( 'beforeend', tr );
					}
					if (currentPage === "finale") {
						teamLink = baseUrl + "team/#" + key.replace(/\s+/g, '');
						tr  = '<tr/>';
						tr += "<td>" + key + "</td>";
						tr += "<td><a href=" + teamLink + ">" + data[key]["nome_squadra"] + "</a></td>";
						tr += "<td>" + up(data[key].citta) + "</td>";
						table = document.getElementById('qualifiedTeams');
						table.insertAdjacentHTML( 'beforeend', tr );
					}
				}
			}
			
		}
	});
})