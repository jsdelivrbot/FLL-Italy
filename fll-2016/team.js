
var hash = window.location.hash.slice(4);
var baseUrl = 'http://fll-italia.it/fll/2016/';
var cityToRegion = {
    'genova': 'nord-ovest',
    'reggio emilia': 'nord-est',
    'pistoia': 'centro',
    'napoli': 'sud',
    'catania': 'isole-e-calabria'
};

document.addEventListener('DOMContentLoaded', function() {
  if (hash) {
    fetchJSONFile('https://rawgit.com/Naramsim/FLL/master/fll-2016/formTeams.json', function(data) {
      var team = false;
      data.forEach(function(row) {
        if (row["ID Squadra"] == hash) {
          team = row;
        }
      });
      build(team);
    });
  } else {
    buildAllTeams();
  }
});

function buildAllTeams() {
  var intermediate = '';
  var semiFinalLink = "";
  var teamLink = "";
  var table = '<table><thead><tr><th>ID</th><th>Team</th><th>Da</th><th>Semi Finale</th></tr></thead><tbody>#</tbody></table>';

  fetchJSONFile('https://rawgit.com/Naramsim/FLL/master/fll-2016/fllTeams.json', function(data) {
    data.forEach(function(row) {
      
      teamLink = baseUrl + 'team/#' + row['nr. Iscrizione'].replace(' ', '');
      intermediate += '<tr>';
      intermediate += '<td>' + row['nr. Iscrizione'] + '</td>';
      intermediate += '<td>' +
      '<a href=' + teamLink + '>' +
      row['nome squadra'] + 
      '</a>' +
      '</td>';
      intermediate += '<td><a href=http://maps.google.com/?q=' + row['città'] + '>' + up(row['città']) + '</a></td>';
      intermediate += '<td>' +
        // '<a href=' + semiFinalLink + '>' +
        up(convertCityToRegion(row['iscrizione a qualificazione regionale'])) + 
        // '</a>' +
        '</td></tr>';
    });
    var article = document.getElementById('team');
    article.insertAdjacentHTML('beforeend', table.replace('#', intermediate));
  });
  
}

function convertCityToRegion(city) {
  var normalized = city
    .replace(' (no Lecce perché team Junior)', '')
    .replace(' (no Napoli perché team Junior)', '')
    .replace(' (no REGGIO EMILIA per motivi organizzativi!)', '')
    .toLowerCase();
  return cityToRegion[normalized];
}

function up(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase().replace('-', ' ');
}


function build(team) {
  if (team) {
    var render = '<div class="root"> ' +
    '<div class="head">' +
    '<div class="name">Xn</div>' +
    '<img class="s" src="Xv" alt="">' +
    '</div>' +
    '<div class="image">' +
    '<img class="f" src="Xi" alt="">' +
    '</div>' +
    '<div class="bar">' +
    '<div class="class">Sono Xc</div>' +
    '<div class="animal">Animale preferito: Xa</div>' +
    '</div>' +
    '<div class="sumHead">Riassunto progetto scientifico</div>' +
    '<div class="sum">Xr</div>' +
    '<div class="vid">Xvid</div>' +
    '</div>';

    var vet = team["E' la prima volta che partecipate?"] === 'Si' ? 'http://imgur.com/cYG4Lyv.png' : 'http://imgur.com/WySwE6H.png';
    var picture = team["Foto del team"].slice(0, 4) === 'http' ? team["Foto del team"] : 'http://imgur.com/EQHcye1.png';
    var video = team["Video"] ? ('<iframe src=' + team["Video"] + ' width="80%" height="480"></iframe>') : "";

    picture = picture.slice(-4) === '.png' ? picture : picture.concat('.png');

    render = render.replace('Xn', team["Nome ufficiale della squadra"])
    .replace('Xi', picture)
    .replace('Xv', vet)
    .replace('Xc', low(team["Fate parte di"]))
    .replace('Xa', low(team["Qual é il vostro animale preferito?"]))
    .replace('Xr', team["Riassunto progetto scientifico"])
    .replace('Xvid', video);


    var article = document.getElementById('team');
    article.insertAdjacentHTML('beforeend', render);
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

function low(str) {
  return str.toLowerCase();
}