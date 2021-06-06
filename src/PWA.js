// window.addEventListener('devicemotion', function(event) {
//     console.log(event.acceleration.x + ' m/s2');
//   });

  
if ("serviceWorker" in navigator) {
  var lastTimestamp;
  speedY = 0, speedZ = 0;   
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register('/pwa/serviceWorker.js', {scope: '/pwa/'})
      .then(res => window.addEventListener
        ('devicemotion', function(event) {
        // const speed = document.querySelector('#speed');
        // console.log("Service worker is registered")
        // console.log(event.acceleration.x + ' m/s2');
        // // document.getElementById("speed").innerHTML = "Bonjour";
        // speed.textContent = event.acceleration.x + ' m/s2';

        
        // }
        const speed = document.querySelector('#speed');

        var currentTime = new Date().getTime();
        if (lastTimestamp === undefined) {
          lastTimestamp = new Date().getTime();
          return; //ignore first call, we need a reference time
        }
        //  m/s² / 1000 * (miliseconds - miliseconds)/1000 /3600 => km/h (if I didn't made a mistake)
        speed.textContent += event.acceleration.x / 1000 * ((currentTime - lastTimestamp)/1000)/3600;
        //... same for Y and Z
        lastTimestamp = currentTime;
      },
      false),
           
        geoFindMe()
      )
      .catch(err => console.log("service worker not registeredd", err))
  })
}


function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

// document.querySelector('#find-me').addEventListener('click', geoFindMe);
