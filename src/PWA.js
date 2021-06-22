
 var fruits;
function fitBitData(){
  const access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzlaRjkiLCJzdWIiOiI5RFhWS0siLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNjI1OTE0MzY3LCJpYXQiOjE2MjMzMjIzNjd9.GEVVbwj2siALHV3HgA3N5JaGuJbz1qwx3sZCHaJThCo"

  fetch('https://api.fitbit.com/1.2/user/-/sleep/list.json?afterDate=2021-03-27&sort=desc&offset=0&limit=4', {
    method: "GET",
    headers: {"Authorization": "Bearer " + access_token}
  })
  .then(response => response.json())
  .then(data => {
    document.querySelector("#day1").innerText = "Day 1: "+data.sleep[0].minutesAsleep/60 + " Hours",
    document.querySelector("#day2").innerText = "Day 2: "+data.sleep[1].minutesAsleep/60 + " Hours",
    // document.querySelector("#day3").innerText = "Day 3: "+data.sleep[2].minutesAsleep/60 + " Hours",


    console.log(data.sleep[0])

  }
    // appOpts.dom.data.textContent = json.sleep.efficiency,
    // console.log(json.sleep.duration)
    )
}

/** @enum {number} */
const readoutUnits = {
  mph: 2.23694,
  kmh: 3.6
};

/** @const */
const appOpts = {
  dom: {
    body: document.querySelector('#body'),
    start: document.querySelector('#start'),
    readout: document.querySelector('#readout'),
    showMph: document.querySelector('#show-mph'),
    showKmh: document.querySelector('#show-kmh'),
    data: document.querySelector('#data'),

  },
  readoutUnit: readoutUnits.mph,
  watchId: null,
  wakeLock: null
};

// document.querySelector('#show-mph').addEventListener('click', (event) => {
//   appOpts.readoutUnit = readoutUnits.mph;
//   if (!appOpts.dom.showMph.classList.contains('selected')) {
//     toggleReadoutButtons();
//   }
// });

// document.querySelector('#show-kmh').addEventListener('click', (event) => {
//   appOpts.readoutUnit = readoutUnits.kmh;
//   if (!appOpts.dom.showKmh.classList.contains('selected')) {
//     toggleReadoutButtons();
//   }
// });

var checkbox = document.querySelector("input[name=checkbox]")

checkbox.addEventListener('change', function() { 
  if(this.checked){
  if (appOpts.watchId) {
    navigator.geolocation.clearWatch(appOpts.watchId);

    if (appOpts.wakeLock) {
      appOpts.wakeLock.cancel();
    }

    appOpts.watchId = null;
    // appOpts.dom.start.textContent = '🔑 Start';
    // appOpts.dom.start.classList.toggle('selected');
  } else {
    const options = {
      enableHighAccuracy: true
    };
    appOpts.watchId = navigator.geolocation.watchPosition(parsePosition,
      null, options);
    startWakeLock();

    // appOpts.dom.start.textContent = '🛑 Stop';
    // appOpts.dom.start.classList.toggle('selected');
  
  }
}
});

const toggleReadoutButtons = () => {
  appOpts.dom.showKmh.classList.toggle('selected');
  appOpts.dom.showMph.classList.toggle('selected');
};



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
  var detectedSpeed = Math.round(
    position.coords.speed * 3.6);
    
  // appOpts.dom.readout.textContent = detectedSpeed;
  console.log("Detecting the speed")
  if(detectedSpeed>=30){
    // appOpts.dom.readout.textContent = "yeyeyeyey";
    navigator.vibrate([3000]);
    


  }

};

function vibrate(ms){
  navigator.vibrate(ms)
}

const startServiceWorker = () => {
  navigator.serviceWorker
  .register('/pwa/serviceWorker.js')
  .then(res => 
  //  console.log("Registered")
    // setTimeout(detectSpeed, 30)
    // setInterval(detectSpeed(), 2000)
    // detectSpeed()
    console.log("regisetered"),
   fitBitData()
    
  )
  .catch(err => console.log("service worker not registereddd", err));
}

// startAmbientSensor();
startServiceWorker();

