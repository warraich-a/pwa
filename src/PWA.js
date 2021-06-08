// window.addEventListener('devicemotion', function(event) {
//     console.log(event.acceleration.x + ' m/s2');
//   });

  
// if ("serviceWorker" in navigator) {
//   var lastTimestamp;
//   speedY = 0, speedZ = 0;   
//   window.addEventListener("load", function() {
//     navigator.serviceWorker
//       .register('/serviceWorker.js', {scope: '/pwa/'})
//       .then(res => 
       
//         // setTimeout(detectSpeed, 30)
//         setInterval(detectSpeed(), 2000)
//         // detectSpeed()
        
//       )
//       .catch(err => console.log("service worker not registered", err))
//   })
// }


/** @enum {number} */
const readoutUnits = {
  mph: 2.23694,
  kmh: 3.6
};

/** @const */
const appOpts = {
  dom: {
    body: document.querySelector('body'),
    start: document.querySelector('#start'),
    readout: document.querySelector('#readout'),
    showMph: document.querySelector('#show-mph'),
    showKmh: document.querySelector('#show-kmh'),
  },
  readoutUnit: readoutUnits.mph,
  watchId: null,
  wakeLock: null
};

document.querySelector('#show-mph').addEventListener('click', (event) => {
  appOpts.readoutUnit = readoutUnits.mph;
  if (!appOpts.dom.showMph.classList.contains('selected')) {
    toggleReadoutButtons();
  }
});

document.querySelector('#show-kmh').addEventListener('click', (event) => {
  appOpts.readoutUnit = readoutUnits.kmh;
  if (!appOpts.dom.showKmh.classList.contains('selected')) {
    toggleReadoutButtons();
  }
});

document.querySelector('#start').addEventListener('click', (event) => {
  if (appOpts.watchId) {
    navigator.geolocation.clearWatch(appOpts.watchId);

    if (appOpts.wakeLock) {
      appOpts.wakeLock.cancel();
    }

    appOpts.watchId = null;
    appOpts.dom.start.textContent = '🔑 Start';
    appOpts.dom.start.classList.toggle('selected');
  } else {
    const options = {
      enableHighAccuracy: true
    };
    appOpts.watchId = navigator.geolocation.watchPosition(parsePosition,
      null, options);
    startWakeLock();

    appOpts.dom.start.textContent = '🛑 Stop';
    appOpts.dom.start.classList.toggle('selected');
  }
});

const toggleReadoutButtons = () => {
  appOpts.dom.showKmh.classList.toggle('selected');
  appOpts.dom.showMph.classList.toggle('selected');
};

const startAmbientSensor = () => {
  if ('AmbientLightSensor' in window) {
    navigator.permissions.query({ name: 'ambient-light-sensor' })
      .then(result => {
        if (result.state === 'denied') {
          return;
        }
        const sensor = new AmbientLightSensor({frequency: 0.25});
        sensor.addEventListener('reading', () => {
          if (sensor['illuminance'] < 3 && !appOpts.dom.body.classList.contains('dark')) {
            appOpts.dom.body.classList.toggle('dark');
          } else if (sensor['illuminance'] > 3 && appOpts.dom.body.classList.contains('dark')) {
            appOpts.dom.body.classList.toggle('dark');
          };
        });
        sensor.start();
    });
  }
}

const startWakeLock = () => {
  try {
    navigator.getWakeLock("screen").then((wakeLock) => {
      appOpts.wakeLock = wakeLock.createRequest();
    });
  } catch(error) {
    // no experimental wake lock api build
  }
}

const parsePosition = (position) => {
  appOpts.dom.readout.textContent = Math.round(
    position.coords.speed * appOpts.readoutUnit);
};

const startServiceWorker = () => {
  navigator.serviceWorker
  .register('/pwa/serviceWorker.js', {scope: '/pwa/'})
  .then(res => 
   console.log("Registered")
    // setTimeout(detectSpeed, 30)
    // setInterval(detectSpeed(), 2000)
    // detectSpeed()
    
  )
  .catch(err => console.log("service worker not registereddd", err));
}

startAmbientSensor();
startServiceWorker();


// function detectSpeed(){
//   //your code
//   const status = document.querySelector('#status');
//   const speed = document.querySelector('#speed');


//   status.textContent = 'Locating again';
//   // if(!navigator.geolocation) {
//   //   status.textContent = 'Geolocation is not supported by your browser';
//   // } else {
//   //   navigator.geolocation.getCurrentPosition(position => {
//   //     // const { speed } = position.coords;
//   //     speed.textContent = Math.round(
//   //       position.coords.speed * 3.6);
//   //     // Show a map centered at latitude / longitude.
//   //   });
//   // }
//   navigator.geolocation.getCurrentPosition(firstGeolocationSuccess);

// }


// function calculateSpeed(t1, lat1, lng1, t2, lat2, lng2) {
//   // From Caspar Kleijne's answer starts
//   /** Converts numeric degrees to radians */
//   if (typeof(Number.prototype.toRad) === "undefined") {
//     Number.prototype.toRad = function() {
//       return this * Math.PI / 180;
//     }
//   }
//   // From Caspar Kleijne's answer ends
//   // From cletus' answer starts
//   var R = 6371; // km
//   var dLat = (lat2-lat1).toRad();
//   var dLon = (lng2-lng1).toRad();
//   var lat1 = lat1.toRad();
//   var lat2 = lat2.toRad();

//   var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) *    Math.cos(lat2); 
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//   var distance = R * c;
//   // From cletus' answer ends

//   return distance / t2 - t1;
// }

// function firstGeolocationSuccess(position1) {
//   var t1 = Date.now();
//    const speed = document.querySelector('#speed');
//   navigator.geolocation.getCurrentPosition(
//     function (position2) {
//       var speed1 = calculateSpeed
//       (t1 / 1000, 
//         position1.coords.latitude, 
//         position1.coords.longitude, Date.now() / 1000, 
//         position2.coords.latitude, 
//         position2.coords.longitude
        
//         );
//         speed.textContent = speed1;

//     }
//   )

//   }

// function geoFindMe() {

//   const mapLink = document.querySelector('#map-link');

//   mapLink.href = '';
//   mapLink.textContent = '';

//   function success(position) {
//     // const latitude  = position.coords.latitude;
//     // // const longitude = position.coords.longitude;
//     // speed.textContent = Math.round(
//     // position.coords.speed * 3.6);

//     // console.log("Service worker is registered")
//     // console.log(position.coords.speed)


//     // status.textContent = '';
//     // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
//     // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
//   }

//   function error() {
//     status.textContent = 'Unable to retrieve your location';
//   }

//   if(!navigator.geolocation) {
//     status.textContent = 'Geolocation is not supported by your browser';
//   } else {
//     status.textContent = 'Locating…';
//     navigator.geolocation.getCurrentPosition(position => {
//       const { speed } = position.coords;
//       speed.textContent = Math.round(
//         position.coords.speed * 3.6);
//       // Show a map centered at latitude / longitude.
//     });
//   }

// }

// document.querySelector('#find-me').addEventListener('click', geoFindMe);
