// needed: 
// <script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js"></script>
// <script src="//cdnjs.cloudflare.com/ajax/libs/topojson/1.6.9/topojson.min.js"></script>
// <script src="https://cdn.rawgit.com/markmarkoh/datamaps/master/dist/datamaps.none.min.js"></script>
// <link rel="stylesheet" type="text/css" href="https://rawgit.com/Naramsim/FLL-Italy/master/fll-2016/map.css">
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
        responsive: true,
        geographyConfig: {
            popupOnHover: true,
            borderColor: '#545454',
            borderWidth: 1,
            highlightFillColor: false,
            highlightOnHover: true,
            highlightBorderColor: '#848484',
            highlightBorderWidth: 1,
            highlightFillOpacity: 0.85,
            popupTemplate: function(geography, data) {
                return  '<div class="ttContainer">' +
                '<div class="tt"><strong class="xl">' + up(data.name) + '</strong><br/><br/><strong class="l">' +
                data.referrer + '</strong> organizzerà la <i>FIRST</i>® LEGO® League a <strong class="l">' + data.location +
                '</strong> e parteciperanno <strong class="l">' + subscriptions[regions[geography.id]["name"]] + '</strong> squadre. ' +
                '<br/><hr/>L\'evento si terrà il <strong class="l">' + time[regions[geography.id]["name"]] + '</strong>'+
                '<br/><br/><a class="onlyMobile" href=http://fll-italia.it/fll/2016/' + data.name + '/#' + data.name + '>Link alla fase ' + up(data.name) + '</a></div>'+
                '</div>'
            },
            dataUrl: 'https://cdn.rawgit.com/Naramsim/FLL-Italy/master/art/registrationMap/topo.json'
        },
        scope: 'sub',
        setProjection: function(element) {
            var projection = d3.geo.albers()
            .center([12, 38])
            .rotate([0, 0])
            .scale(2050)
            .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
            var path = d3.geo.path()
            .projection(projection);

            return {path: path, projection: projection};
        },
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                    if (!mobilecheck) {
                        window.location = 'http://fll-italia.it/fll/2016/' + regions[geography.id]["name"] + '/#' + regions[geography.id]["name"];
                }
            });
        },
        fills: {
            defaultFill: '#F5F5F5',
            NE: 'rgba(255, 0, 0, .7)',
            NO: 'rgba(255, 246, 77, .7)',
            C: 'rgba(33, 191, 52, .7)',
            CEI: 'rgba(185, 16, 255, .7)',
            S: 'rgba(56, 182, 252, .7)'
        },
        data: regions
    });
    d3.select(window).on('resize', function() {
        map.resize();
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

function mobilecheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};