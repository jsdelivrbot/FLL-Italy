function up(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
document.addEventListener('DOMContentLoaded', function() {
	baseUrl = "http://fll-italia.it/fll/2015/";
	links = ["nord-ovest", "nord-est", "centro", "sud"];
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
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				if (data[key]["iscrizione_a_qualificazione_regionale"].indexOf("MEZZO") >= 0){location = 1}
				if (data[key]["iscrizione_a_qualificazione_regionale"].indexOf("PISTO") >= 0){location = 2}
				if (data[key]["iscrizione_a_qualificazione_regionale"].indexOf("GENOV") >= 0){location = 0}
				if (data[key]["iscrizione_a_qualificazione_regionale"].indexOf("CATAN") >= 0){location = 3}
					if(links.indexOf(currentPage) == location) {
						semiFinalLink = baseUrl	+ links[location] + "/";
						teamLink = baseUrl + "team/#" + key.replace(/\s+/g, '');
						tr  = '<tr/>';
						tr += "<td>" + key + "</td>";
						tr += "<td><a href=" + teamLink + ">" + data[key]["nome_squadra"] + "</a></td>";
						tr += "<td>" + up(data[key].citta) + "</td>";
						tr += "<td><a href=" + semiFinalLink + ">" + data[key]["iscrizione_a_qualificazione_regionale"] + "</a></td>";
						table = document.getElementById('teams');
						table.insertAdjacentHTML( 'beforeend', tr );
					}	
			}
		}
	});
})