document.addEventListener('DOMContentLoaded', function() {
  var baseURL = 'http://fll-italia.it/fll/2016/teams/#';
	 var table = "<font size='+1'><b>Squadre Iscritte</b></font>" + 
    '<table><thead><tr><th>Fase</th><th>Iscritte</th></tr></thead>#</table>';
	var request = new XMLHttpRequest();
  request.open('GET', 'https://rawgit.com/Naramsim/FLL-Italy/master/fll-2016/fllTeams.json', true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.response);
      var regions = {	'NE': ['Nord Est', 0], 
                      'NO': ['Nord Ovest', 0],
                      'C' : ['Centro', 0],
                      'S' : ['Sud', 0],
                      'IC': ['Isole e Calabria', 0]};
      Object.keys(data).forEach(function(key) {
      	regions[data[key].region][1] += 1;
      })
      var intermediate = '';
      Object.keys(regions).forEach(function(key){
      	intermediate += '<tr><td><a href="' + baseURL + regions[key][0].replace('\s', '-').toLowerCase() + '">' + regions[key][0] + '</a></td><td>' + regions[key][1] + '</td></tr>'
      })
      table = table.replace('#', intermediate)
      document.getElementById('registration').insertAdjacentHTML('beforeend', table);
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
})