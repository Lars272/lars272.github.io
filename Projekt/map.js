window.onload = function() {
    // WMTS-Layer basemap.at - Quelle: http://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml
    var layers = {
        OpenMapSurfer_Roads: L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
		maxZoom: 22,
		attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}),
		OpenTopoMap: L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
		maxZoom: 17,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
		}),
		Esri_WorldImagery: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		}),
    };

    var hillshade = L.tileLayer('http://{s}.tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap Contributors</a> <br> &copy; <a href="http://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units">EuroGeographics bezüglich der Verwaltungsgrenzen</a>'
    });

    // Karte definieren
    var map = L.map('map', {
        layers: [layers.OpenTopoMap],
        center: [46.467727, 13.191869],
        zoom: 13,
        zoomControl: true
    });

    // Maßstab hinzufügen
    L.control.scale({
        maxWidth: 200,
        metric: true,
        imperial: false
    }).addTo(map);

    //add fullscreen Button
    L.control.fullscreen({
        position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, defaut topleft
        title: 'Vollbildmodus an/aus', // change the title of the button, default Full Screen
        forceSeparateButton: true, // force seperate button to detach from zoom buttons, default false
        forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
    }).addTo(map);

    // add sidebar
    var sidebar = L.control.sidebar('sidebar', {
        closeButton: true,
        position: 'left'
    });

    // add sidebar control
    map.addControl(sidebar);

    // leaflet-hash aktivieren
    var hash = new L.Hash(map);

    // variable to control fullscreen-state
    var fs = false;

    // events are fired when entering or exiting fullscreen.
    map.on('enterFullscreen', function() {
        fs = true;
        if (map.hasLayer(urban)) {
            map.fitBounds(overview.getBounds(), {
                paddingBottomRight: [200, 0]
            });
        } else {
            map.fitBounds(overview.getBounds());
        }
    });

    // events fired when exiting fullscreen
    map.on('exitFullscreen', function() {
        fs = false;
        sidebar.hide();
        map.fitBounds(overview.getBounds());
    });

    //eigenen Nordpfeil hinzufuegen
    var north = L.control({
        position: "bottomleft"
    });
    north.onAdd = function(map) {
        var div = L.DomUtil.create("div", "arrow");
        div.innerHTML = '<img width=20 src="icons/northarrow_darkgrey.png">';
        return div;
    }
    north.addTo(map);
	
	//Letzter klick trakc
	var lastClick = null;
	
	//Alle Tracks laden
	var Trestelle = omnivore.gpx('data/3Stelle.gpx').addTo(map);
	Trestelle.on('ready', function () {
            // Popup hinzufügen
            var markup = '<h3>Les Tres Stelle!</h3>';
				markup += '<p>Schwierigkeitsgrad: Sehr Schwer.</p>'
				markup += '<p>Höhenmeter: 3000</p>';
				markup += '<p>Streckenlänge (in km): 45</p>';
				markup += '<p><a href="http://www.carniabike.it/?page_id=5829">Download GPX Track</a></p>';
				Trestelle.bindPopup(markup, { maxWidth : 450 })
				
				
				//Zoom und Gelbe Einfärbung hinzufügen 
				Trestelle.on('click', function(evt) {
				map.fitBounds(Forca.getBounds());
				if (lastClick){
					lastClick.setStyle({color:"blue"});
					lastClick = evt.layer
				}
				else {
					lastClick = evt.layer
				}
				console.log(evt.layer)
				evt.layer.setStyle({color:"yellow"});
				});        
	
    });
            	
	var Balcon = omnivore.gpx('data/BalconDiProvezi.gpx').addTo(map);
	Balcon.on('ready', function () {
            // Popup hinzufügen
            var markup = '<h3>Balcon Di Provezi!</h3>';
				markup += '<p>Schwierigkeitsgrad: Sehr Schwer.</p>'
				markup += '<p>Höhenmeter: 600</p>';
				markup += '<p>Streckenlänge (in km): 11</p>';
				markup += '<p><a href="http://www.carniabike.it/?page_id=3137">Download GPX Track</a></p>';
				Balcon.bindPopup(markup, { maxWidth : 450 })
				
				
				//Zoom und Gelbe Einfärbung hinzufügen 
				Balcon.on('click', function(evt) {
				map.fitBounds(Balcon.getBounds());
				if (lastClick){
					lastClick.setStyle({color:"blue"});
					lastClick = evt.layer
				}
				else {
					lastClick = evt.layer
				}
				console.log(evt.layer)
				evt.layer.setStyle({color:"yellow"});
				});
			            
	});
	
	var Chiasut = omnivore.gpx('data/ChiasutDalSior.gpx').addTo(map);
	Chiasut.on('ready', function () {
            // Popup hinzufügen
            var markup = '<h3>Chiasut Dal Sior!</h3>';
				markup += '<p>Schwierigkeitsgrad: Sehr Schwer.</p>'
				markup += '<p>Höhenmeter: 1400</p>';
				markup += '<p>Streckenlänge (in km): 27</p>';
				markup += '<p><a href="http://www.carniabike.it/?page_id=5813">Download GPX Track</a></p>';
				Chiasut.bindPopup(markup, { maxWidth : 450 })
				
				
				//Zoom und Gelbe Einfärbung hinzufügen 
				Chiasut.on('click', function(evt) {
				map.fitBounds(Chiasut.getBounds());
				if (lastClick){
					lastClick.setStyle({color:"blue"});
					lastClick = evt.layer
				}
				else {
					lastClick = evt.layer
				}
				console.log(evt.layer)
				evt.layer.setStyle({color:"yellow"});
				});
	            
	});
	
	var Monticello = omnivore.gpx('data/Monticello.gpx').addTo(map);
	Monticello.on('ready', function () {
            // Popup hinzufügen
            var markup = '<h3>Monte Monticello!</h3>';
				markup += '<p>Schwierigkeitsgrad: Schwer.</p>'
				markup += '<p>Höhenmeter: 1000</p>';
				markup += '<p>Streckenlänge (in km): 15</p>';
				markup += '<p><a href="http://www.carniabike.it/?page_id=3214">Download GPX Track</a></p>';
				Monticello.bindPopup(markup, { maxWidth : 450 })
				
				
				//Zoom und Gelbe Einfärbung hinzufügen 
				Monticello.on('click', function(evt) {
				map.fitBounds(Monticello.getBounds());
				if (lastClick){
					lastClick.setStyle({color:"blue"});
					lastClick = evt.layer
				}
				else {
					lastClick = evt.layer
				}
				console.log(evt.layer)
				evt.layer.setStyle({color:"yellow"});
				});
	            
	});
	
	var Forca = omnivore.gpx('data/ForcaVualt.gpx').addTo(map);
	
            		
		Forca.on('ready', function () {
				// Popup hinzufügen
				var markup = '<h3>Forca del Vualt!</h3>';
				markup += '<p>Schwierigkeitsgrad: Sehr Schwer.</p>'
				markup += '<p>Höhenmeter: 1000</p>';
				markup += '<p>Streckenlänge (in km): 24</p>';
				markup += '<p><a href="http://www.carniabike.it/?page_id=5800">Download GPX Track</a></p>';
				Forca.bindPopup(markup, { maxWidth : 450 })
				
				
				//Zoom und Gelbe Einfärbung hinzufügen 
				Forca.on('click', function(evt) {
				map.fitBounds(Forca.getBounds());
				if (lastClick){
					lastClick.setStyle({color:"blue"});
					lastClick = evt.layer
				}
				else {
					lastClick = evt.layer
				}
				console.log(evt.layer)
				evt.layer.setStyle({color:"yellow"});
				});
				
			});
		
	
	var Jouf = omnivore.gpx('data/JoufDiMuec.gpx').addTo(map);
	Jouf.on('ready', function () {
            // Popup hinzufügen
            var markup = '<h3>Jouf di Muec!</h3>';
				markup += '<p>Schwierigkeitsgrad: Sehr Schwer.</p>'
				markup += '<p>Höhenmeter: 600</p>';
				markup += '<p>Streckenlänge (in km): 14</p>';
				markup += '<p><a href="http://www.carniabike.it/?page_id=5804">Download GPX Track</a></p>';
				Jouf.bindPopup(markup, { maxWidth : 450 })
				
				
				//Zoom und Gelbe Einfärbung hinzufügen 
				Jouf.on('click', function(evt) {
				map.fitBounds(Jouf.getBounds());
				if (lastClick){
					lastClick.setStyle({color:"blue"});
					lastClick = evt.layer
				}
				else {
					lastClick = evt.layer
				}
				console.log(evt.layer)
				evt.layer.setStyle({color:"yellow"});
				});
	            
	});
	
	var Raduna = omnivore.gpx('data/RadunoChiasut.gpx').addTo(map);
	Raduna.on('ready', function () {
            // Popup hinzufügen
            var markup = '<h3>Raduna Chiasut!</h3>';
				markup += '<p>Schwierigkeitsgrad: Anspruchsvoll.</p>'
				markup += '<p>Höhenmeter: 1500</p>';
				markup += '<p>Streckenlänge (in km): 20</p>';
				markup += '<p><a href="http://www.carniabike.it/trofeocarniamtb/?page_id=3779">Download GPX Track</a></p>';
				Raduna.bindPopup(markup, { maxWidth : 450 })
				
				
				//Zoom und Gelbe Einfärbung hinzufügen 
				Raduna.on('click', function(evt) {
				map.fitBounds(Raduna.getBounds());
				if (lastClick){
					lastClick.setStyle({color:"blue"});
					lastClick = evt.layer
				}
				else {
					lastClick = evt.layer
				}
				console.log(evt.layer)
				evt.layer.setStyle({color:"yellow"});
				});
			           
	});
	
	var Flop = omnivore.gpx('data/flop e altro.gpx').addTo(map);
	Flop.on('ready', function () {
            // Popup hinzufügen
            var markup = '<h3>Otto del Monte Flop!</h3>';
				markup += '<p>Schwierigkeitsgrad: Schwer.</p>'
				markup += '<p>Höhenmeter: 2400</p>';
				markup += '<p>Streckenlänge (in km): 40</p>';
				markup += '<p><a href="http://www.carniabike.it/?page_id=4044">Download GPX Track</a></p>';
				Flop.bindPopup(markup, { maxWidth : 450 })
				
				
				//Zoom und Gelbe Einfärbung hinzufügen 
				Flop.on('click', function(evt) {
				map.fitBounds(Flop.getBounds());
				if (lastClick){
					lastClick.setStyle({color:"blue"});
					lastClick = evt.layer
				}
				else {
					lastClick = evt.layer
				}
				console.log(evt.layer)
				evt.layer.setStyle({color:"yellow"});
				});
	
	});
	
	var Giro = omnivore.gpx('data/giro infinito paularo.gpx').addTo(map);
	Giro.on('ready', function () {
            // Popup hinzufügen
            var markup = '<h3>Giro Infinito Paularo!</h3>';
				markup += '<p>Schwierigkeitsgrad: Sehr Schwer.</p>'
				markup += '<p>Höhenmeter: 3000</p>';
				markup += '<p>Streckenlänge (in km): 67</p>';
				markup += '<p><a href="http://www.carniabike.it/?page_id=3133">Download GPX Track</a></p>';
				Giro.bindPopup(markup, { maxWidth : 450 })
				
				
				//Zoom und Gelbe Einfärbung hinzufügen 
				Giro.on('click', function(evt) {
				map.fitBounds(Giro.getBounds());
				if (lastClick){
					lastClick.setStyle({color:"blue"});
					lastClick = evt.layer
				}
				else {
					lastClick = evt.layer
				}
				console.log(evt.layer)
				evt.layer.setStyle({color:"yellow"});
				});
	});
	//Popup mit Unterkunft
	
	var popup = L.popup()
    .setLatLng([46.467727, 13.191869])
    .setContent("<b>Dordolla!</b><br>Ihr perfekter Start- und Zielort um mit dem Mountainbike das Aupatal und die Geisterstädte zu erkunden.<br> Nächtigen Sie zum Beispiel authentisch bei Kaspar: http://de.tiereviere.net/zubesuch/urlaubambauernhof")
    .openOn(map);
	
	//Marker Geisterstädte
	
			var huts = [
			L.marker([46.44007,13.21288], {title: "Riulade", icon: L.icon({
			iconAnchor: [16, 35],
			iconUrl: 'icons/cabin-2.png'})}),
				
			
			L.marker([46.41756,13.15268], {title: "Mogessa di Qua", icon: L.icon({
			iconAnchor: [16, 35],
			iconUrl: 'icons/cabin-2.png'})}),
								
			];
					
		var hutslayer = L.featureGroup();
		
		for (var i=0; i < huts.length; i++) {
			hutslayer.addLayer(huts[i]);				
		};
		
		hutslayer.addTo(map);

    // WMTS-Layer Auswahl hinzufügen
    var layerControl = L.control.layers({
        "OpenMap": layers.OpenMapSurfer_Roads,
		"Topographisch": layers.OpenTopoMap,
		"Satellit": layers.Esri_WorldImagery,
    }, {
                "Hillshade": hillshade,
				"Geisterstädte": hutslayer,
				
    }).addTo(map);
	
	map.fitBounds(popup.getBounds());
	
};