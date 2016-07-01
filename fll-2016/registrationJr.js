document.addEventListener('DOMContentLoaded', function() {
	var table = '<table><thead><tr><th>Fase</th><th>Iscritte</th></tr></thead>#</table>' + 
    "<font size='+1'><b>Squadre Iscritte</b></font>";
	var request = new XMLHttpRequest();
  request.open('GET', 'https://rawgit.com/Naramsim/FLL-Italy/master/fll-2016/fllJrTeams.json', true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.response);
      var regions = {	'R': ['Rovereto', 0], 
                      'G': ['Genova', 0],
                      'C': ['Catania', 0],
                      'B': ['Brescia', 0],
                      'P': ['Pachino', 0],
                      'ST': ['Settimo Torinese', 0]};
      Object.keys(data).forEach(function(key) {
      	regions[data[key].region][1] += 1;
      })
      var intermidiate = '';
      Object.keys(regions).forEach(function(key){
      	intermidiate += '<tr><td>' + regions[key][0] + '</td><td>' + regions[key][1] + '</td></tr>'
      })
      table = table.replace('#', intermidiate)
      document.getElementById('registration').insertAdjacentHTML('beforeend', table);
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
})