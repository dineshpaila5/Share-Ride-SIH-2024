const params = new URLSearchParams(window.location.search);
const source = params.get('source');
const destination = params.get('destination');

mapboxgl.accessToken = 'pk.eyJ1IjoiYmFsYTE3NCIsImEiOiJjbG5idmkweHAwOWFtMnVscWc5aGN6YmxrIn0.1UD-WmHvd9me-P9l-cJKLg';

navigator.geolocation.getCurrentPosition(successLocation,errorLocation,{enableHighAccuracy:true})

function successLocation(position){
    console.log(position);
    setupMap([position.coords.longitude,position.coords.latitude])
}

function errorLocation(){
    setupMap([77.18886, 28.59688])
}

function setupMap(center){
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom : 11
    }) ;

    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav);

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit : 'metric',
        profile : 'mapbox/Traffic',
        interactive : true,
      });
    
    directions.setOrigin(source);
    directions.setDestination(destination);
    map.addControl(directions, 'top-left');

    directions.on('route', function(e) {
        var route = e.route[0];
        var distance = route.distance;
        var duration = route.duration;
        var km = distance/1000;
        var dis = Math.round(km);
        const time = new Date(duration*1000)
            .toISOString().slice(11, 19);
        // console.log('duration: ' + time + ' hours');
        // console.log('Distance: ' + Math.round(km) + ' KM');
        console.log(dis);
        let add = document.getElementById("fair");
        let append = `<h2>Total Distance: ${dis}</h2><h2>Total Duration: ${time}</h2>`
        let fair = `${dis*20} will be charged for your journey`;
        // if(dis >= 1 && dis <= 30){
        //     fair = '₹20 will be charged for your journey';
        // }
        // else if(dis >= 31 && dis <= 80){
        //     fair = '₹70 will be charged for your journey'
        // }
        // else if(dis >= 81 && dis <= 150){
        //     fair = '₹130 will be charged for your journey'
        // }
        // else if(dis >= 151 && dis <= 200){
        //     fair = '₹240 will be charged for your journey'
        // }
        // else if(dis >= 201 && dis <= 300){
        //     fair = '₹410 will be charged for your journey'
        // }
        // else if(dis >= 301 && dis <= 600){
        //     fair = '₹710 will be charged for your journey'
        // }
        let fariappend = `<h2>Total fair: ${fair}</h2>`;
        add.innerHTML = append + fariappend;
    });

}