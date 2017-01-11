
var hash = window.location.hash.slice(4);

document.addEventListener('DOMContentLoaded', function() {
    fetchJSONFile('https://rawgit.com/Naramsim/FLL/master/fll-2016/formTeam.json', function(data) {
        var team = false;
        data.forEach(function(row) {
            if (row["ID Squadra"] === hash) {
                team = row;
            }
        });
        build(team);
    });
});

function build(team) {
    render = '<div class="root"> ' +
      '<div>' +
      '<div class="name">Xn</div>' +
        '<img class="s" src="http://imgur.com/7wcRo0y.png" alt="">' +
      '</div>' +
      '<div class="image">' +
        '<img class="f" src="Xi" alt="">' +
       '</div>' +
      '<div class="bar">' +
        '<div class="class">Xc</div>' +
        '<div class="animal">Xa</div>' +
      '</div>' +
      '<div class="sum">Xr</div>' +
    '</div>';
    
    var picture = team["Foto del team"].slice(0, 4) === 'http' ? team["Foto del team"] : 'http://imgur.com/EQHcye1.png';

    picture = picture.slice(-4) === '.png' ? picture : picture.concat('.png');

    render.replace('Xn', team["Nome ufficiale della squadra"])
        .replace('Xi', picture)
        .replace('Xc', team["Fate parte di"])
        .replace('Xa', team["Qual é il vostro animale preferito?"])
        .replace('Xr', team["Riassunto progetto scientifico"])

    var article = document.getElementById('team');
    article.insertAdjacentHTML('beforeend', render);
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