document.addEventListener('DOMContentLoaded', function() {
  baseUrl = "http://fll-italia.it/fll/2015/";
  stage = ["nord ovest", "nord est", "centro", "sud"];
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
  fetchJSONFile('https://cdn.rawgit.com/Naramsim/FLL/master/fll/teams.json', function(data) {

    teamId = window.location.hash.replace("#", "");
    teamId = teamId.slice(0, 3) + " " + teamId.slice(3);
    console.log('%cHey you!', 'font-size:100px;color:#fff;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');﻿
    var location = -1;
    if (data[teamId]["iscrizione_a_qualificazione_regionale"].indexOf("MEZZO") >= 0) {
      location = 1
    }
    if (data[teamId]["iscrizione_a_qualificazione_regionale"].indexOf("PISTO") >= 0) {
      location = 2
    }
    if (data[teamId]["iscrizione_a_qualificazione_regionale"].indexOf("GENOV") >= 0) {
      location = 0
    }
    if (data[teamId]["iscrizione_a_qualificazione_regionale"].indexOf("CATAN") >= 0) {
      location = 3
    }
    render = '<div id="team">' +
      '<style>' +
      '#team {position:relative;}' +
      '#team h1, #team h2 {text-align:center; display: block;} ' +
      '#team img {display:block; margin:auto; border:1px solid black; width:100%;}' +
      '#team img.closed{height:0;border:0px solid black;}' +
      '#team button {display:block;margin:10px auto;width:300px;}' +
      '#scie,#tech{background-color:#fff;border-radius:4px;border:1px solid #dcdcdc;display:inline-block;cursor:pointer;color:#666;font-size:14px;font-weight:700;padding:10px 31px;text-decoration:none;text-shadow:0 1px 0 #fff}#scie,#tech:hover{background:-webkit-gradient(linear,left top,left bottom,color-stop(.05,#f6f6f6),color-stop(1,#fff));background:-moz-linear-gradient(top,#f6f6f6 5%,#fff 100%);background:-webkit-linear-gradient(top,#f6f6f6 5%,#fff 100%);background:-o-linear-gradient(top,#f6f6f6 5%,#fff 100%);background:-ms-linear-gradient(top,#f6f6f6 5%,#fff 100%);background:linear-gradient(to bottom,#f6f6f6 5%,#fff 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#f6f6f6", endColorstr="#ffffff", GradientType=0);background-color:#f6f6f6}' +
      '</style>' +
      '<h1>' + data[teamId]['nome_squadra'] + '</h1><p></p>';
    if (data[teamId].photo !== undefined) {
      render += '<img src=' + data[teamId].photo + ' alt="">';
    }
    render += '<p></p><h2>da ' + data[teamId].citta + ' <br> iscritti alla fase ' + stage[location] + '</h2>';
    /*+
    	  	'<div style="padding:20px 0;" id="projects"><table style="width: 80%;text-align: center;margin: 0 auto;">' +
    			'<tbody><tr><td>Progetto Tecnico</td>' +
    				'<td>Disponibile a breve</td>' +
    			'</tr><tr><td>Progetto Scientifico</td>' +
    				'<td>Disponibile a breve</td>' +
    			'</tr></tbody></table></div>';*/
    if (data[teamId].report !== "") {
    	render += '<button id="scie" style="text-align:center;">Riassunto progetto scientifico</button>';
    }
    if(data[teamId].technical_report !=="") {
    	render += '<button id="tech" style="text-align:center;">Riassunto progetto tecnico</button>';
    }
    if (data[teamId].report !== "") {
    	render += '<img id="scieImg" class="closed" style="width:70%;" src="' + data[teamId].report + '" alt="Progetto Scientifico">';
    }
	if(data[teamId].technical_report !=="") {
    	render += '<img id="techImg" class="closed" style="width:70%;" src="' + data[teamId].technical_report + '" alt="Progetto Tecnico">';
    }
    if (data[teamId].video !== "") {
      render += '<iframe style="margin: 20px auto;display: block;" width="560" height="315" src="https://www.youtube.com/embed/' + data[teamId].video + '" frameborder="0" allowfullscreen></iframe>';
    }
    render += '<p><a href="http://fll-italia.it/fll/2015/squadre">Scopri le altre squadre</a></p>' +
      '</div>';
    article = document.getElementById('team');
    article.insertAdjacentHTML('beforeend', render);
    hideImages();
  });
  function hideImages(){
  	try{
  		document.getElementById('scie').addEventListener("click", function(){
	    	document.getElementById('techImg').classList.add('closed');
	    	document.getElementById('scieImg').classList.toggle('closed');
	    });
	    document.getElementById('tech').addEventListener("click", function(){
	    	document.getElementById('scieImg').classList.add('closed');
	    	document.getElementById('techImg').classList.toggle('closed');
	    });
  	}catch(e){var imgs = document.getElementsByTagName("img");for (var i = 0; i < imgs.length; i++) {imgs[i].classList.remove("closed");}}
  }
})