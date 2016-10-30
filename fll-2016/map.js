// needed: 
// <script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js"></script>
// <script src="//cdnjs.cloudflare.com/ajax/libs/topojson/1.6.9/topojson.min.js"></script>
// <script src="https://cdn.rawgit.com/markmarkoh/datamaps/master/dist/datamaps.none.min.js"></script>
// <div id="container" style="position: relative; width: 100%; height: 400px;"></div>

var subscriptions = {
    'nord-ovest': 0,
    'nord-est': 0,
    'centro': 0,
    'sud': 0,
    'isole-e-calabria': 0
};
var time = {
    'nord-ovest': "11 febbraio 2017",
    'nord-est': "27 - 28 gennaio 2017",
    'centro': "18 febbraio 2017",
    'sud': "15 febbraio 2017",
    'isole-e-calabria': "7 febbraio 2017"
};
var cityToRegion = {
    'genova': 'nord-ovest',
    'reggio emilia': 'nord-est',
    'pistoia': 'centro',
    'napoli': 'sud',
    'catania': 'isole-e-calabria'
};
var regions = {
    "R1": {
        "fillKey": "NO",
        "referrer": "Scuola di robotica",
        "name": "nord-ovest",
        "mail": "micheli@scuoladirobotica.it",
        "website": "http://www.scuoladirobotica.it/",
        "location": "Genova"
    },
    "R2": {
        "fillKey": "NO",
        "referrer": "Scuola di robotica",
        "name": "nord-ovest",
        "mail": "micheli@scuoladirobotica.it",
        "website": "http://www.scuoladirobotica.it/",
        "location": "Genova"
    },
    "R3": {
        "fillKey": "NO",
        "referrer": "Scuola di robotica",
        "name": "nord-ovest",
        "mail": "micheli@scuoladirobotica.it",
        "website": "http://www.scuoladirobotica.it/",
        "location": "Genova"
    },
    "R7": {
        "fillKey": "NO",
        "referrer": "Scuola di robotica",
        "name": "nord-ovest",
        "mail": "micheli@scuoladirobotica.it",
        "website": "http://www.scuoladirobotica.it/",
        "location": "Genova"
    },
    "R4": {
        "fillKey": "NE",
        "referrer": "Fondazione Museo Civico di Rovereto",
        "name": "nord-est",
        "mail": "fll@fondazionemcr.it",
        "website": "http://www.fondazionemcr.it/",
        "location": "Reggio Emilia"
    },
    "R5": {
        "fillKey": "NE",
        "referrer": "Fondazione Museo Civico di Rovereto",
        "name": "nord-est",
        "mail": "fll@fondazionemcr.it",
        "website": "http://www.fondazionemcr.it/",
        "location": "Reggio Emilia"
    },
    "R6": {
        "fillKey": "NE",
        "referrer": "Fondazione Museo Civico di Rovereto",
        "name": "nord-est",
        "mail": "fll@fondazionemcr.it",
        "website": "http://www.fondazionemcr.it/",
        "location": "Reggio Emilia"
    },
    "R8": {
        "fillKey": "C",
        "referrer": "ITTS Fedi-Fermi",
        "name": "centro",
        "mail": "r.niccolai@ittfedifermi.gov.it",
        "website": "http://www.ittfedifermi.gov.it/",
        "location": "Pistoia"
    },
    "R9": {
        "fillKey": "C",
        "referrer": "ITTS Fedi-Fermi",
        "name": "centro",
        "mail": "r.niccolai@ittfedifermi.gov.it",
        "website": "http://www.ittfedifermi.gov.it/",
        "location": "Pistoia"
    },
    "R10": {
        "fillKey": "C",
        "referrer": "ITTS Fedi-Fermi",
        "name": "centro",
        "mail": "r.niccolai@ittfedifermi.gov.it",
        "website": "http://www.ittfedifermi.gov.it/",
        "location": "Pistoia"
    },
    "R11": {
        "fillKey": "C",
        "referrer": "ITTS Fedi-Fermi",
        "name": "centro",
        "mail": "r.niccolai@ittfedifermi.gov.it",
        "website": "http://www.ittfedifermi.gov.it/",
        "location": "Pistoia"
    },
    "R12": {
        "fillKey": "C",
        "referrer": "ITTS Fedi-Fermi",
        "name": "centro",
        "mail": "r.niccolai@ittfedifermi.gov.it",
        "website": "http://www.ittfedifermi.gov.it/",
        "location": "Pistoia"
    },
    "R13": {
        "fillKey": "C",
        "referrer": "ITTS Fedi-Fermi",
        "name": "centro",
        "mail": "r.niccolai@ittfedifermi.gov.it",
        "website": "http://www.ittfedifermi.gov.it/",
        "location": "Pistoia"
    },
    "R14": {
        "fillKey": "S",
        "referrer": "Associazione Officinelonardo Onlus",
        "name": "sud",
        "mail": "",
        "website": "",
        "location": "Napoli"
    },
    "R15": {
        "fillKey": "S",
        "referrer": "Associazione Officinelonardo Onlus",
        "name": "sud",
        "mail": "",
        "website": "",
        "location": "Napoli"
    },
    "R16": {
        "fillKey": "S",
        "referrer": "Associazione Officinelonardo Onlus",
        "name": "sud",
        "mail": "",
        "website": "",
        "location": "Napoli"
    },
    "R17": {
        "fillKey": "S",
        "referrer": "Associazione Officinelonardo Onlus",
        "name": "sud",
        "mail": "",
        "website": "",
        "location": "Napoli"
    },
    "R18": {
        "fillKey": "CEI",
        "referrer": "I.T. Archimede Catania",
        "name": "isole-e-calabria",
        "mail": "domhardy@virgilio.it",
        "website": "http://www.itisarchimede.com/",
        "location": "Catania"
    },
    "R19": {
        "fillKey": "CEI",
        "referrer": "I.T. Archimede Catania",
        "name": "isole-e-calabria",
        "mail": "domhardy@virgilio.it",
        "website": "http://www.itisarchimede.com/",
        "location": "Catania"
    },
    "R20": {
        "fillKey": "CEI",
        "referrer": "I.T. Archimede Catania",
        "name": "isole-e-calabria",
        "mail": "domhardy@virgilio.it",
        "website": "http://www.itisarchimede.com/",
        "location": "Catania"
    }
}
fetchJSONFile('https://rawgit.com/Naramsim/FLL/master/fll-2016/fllTeams.json', function(teams){
    teams.forEach(function(team) {
        subscriptions[convertCityToRegion(team['iscrizione a qualificazione regionale'].replace(' (no Lecce perché team Junior)', ''))]++;
    });
    var map = new Datamap({
        element: document.getElementById('container'),
        geographyConfig: {
            popupOnHover: true,
            highlightOnHover: false,
            highlightBorderColor: '#bada55',
            highlightBorderWidth: 3,
            popupTemplate: function(geography, data) {
                return  '<div class="ttContainer">' +
                '<div class="tt"><strong class="xl">' + up(data.name) + '</strong><br/><br/><strong class="l">' +
                data.referrer + '</strong> organizzerà la <i>FIRST</i>® LEGO® League a <strong class="l">' + data.location +
                '</strong> e parteciperanno <strong class="l">' + subscriptions[regions[geography.id]["name"]] + '</strong> squadre. ' +
                '<br/><br/>L\'evento si terrà il <strong class="l">' + time[regions[geography.id]["name"]] + '</strong></div>'+
                '</div>'
            },
            dataUrl: 'https://cdn.rawgit.com/Naramsim/FLL-Italy/master/art/registrationMap/topo.json'
        },
        scope: 'sub',
        setProjection: function(element) {
            var projection = d3.geo.albers()
            .center([13, 42])
            .rotate([0, 0])
            .scale(2000)
            .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
            var path = d3.geo.path()
            .projection(projection);

            return {path: path, projection: projection};
        },
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {

                console.log(regions[geography.id]["name"])
            });
        },
        fills: {
            defaultFill: 'rgba(171, 221, 164, .7)',
            NE: 'rgba(255, 0, 0, .7)',
            NO: 'rgba(255, 246, 77, .7)',
            C: 'rgba(33, 191, 52, .7)',
            CEI: 'rgba(185, 16, 255, .7)',
            S: 'rgba(56, 182, 252, .7)'
        },
        data: regions
    });
})

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

function convertCityToRegion(city) {
    return cityToRegion[city.replace(' (no Lecce perché team Junior)', '').toLowerCase()];
}

function up(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase().replace('-', ' ');
}