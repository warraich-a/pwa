// window.addEventListener('devicemotion', function(event) {
//     console.log(event.acceleration.x + ' m/s2');
//   });

  
if ("serviceWorker" in navigator) {
  var lastTimestamp;
  speedY = 0, speedZ = 0;   
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register('/pwa/serviceWorker.js', {scope: '/pwa/'})
      .then(res => 
        {
        while(true){
        const speed = document.querySelector('#speed');
        if(!navigator.geolocation) {
          status.textContent = 'Geolocation is not supported by your browser';
        } else {
          status.textContent = 'Locating…';
          navigator.geolocation.getCurrentPosition(position => {
            speed.textContent = Math.round(
              position.coords.speed * 3.6);
            // Show a map centered at latitude / longitude.
          });
        }
      }}
      //   window.addEventListener
      //   ('devicemotion', function(event) {
        
      // },
      // false),
           
        
      )
      .catch(err => console.log("service worker not registeredd", err))
  })
}


// function geoFindMe() {

//   const status = document.querySelector('#status');
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
