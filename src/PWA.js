var lastDaySleep;
var fruits;
function fitBitData() {
  const access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzlaRjkiLCJzdWIiOiI5RFhWS0siLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdhY3Qgd3NldCB3bG9jIiwiZXhwIjoxNjI1OTE0MzY3LCJpYXQiOjE2MjQzNjkyNzB9.D_r4nXw51vgJ86pMDdXG5lQBrOz4r3YyM0pmN9RRwNc"

  fetch('https://api.fitbit.com/1.2/user/-/sleep/list.json?afterDate=2021-03-27&sort=desc&offset=0&limit=4', {
    method: "GET",
    headers: { "Authorization": "Bearer " + access_token }
  })
    .then(response => response.json())
    .then(data => {
      document.querySelector("#day1").innerText = "Day 1: No data",
        document.querySelector("#day2").innerText = "Day 2: No data",
        document.querySelector("#day3").innerText = "Day 3:  No data",
        document.querySelector("#day4").innerText = "Day 4:  No data",
        document.querySelector("#day5").innerText = "Day 5:  No data",
        document.querySelector("#day6").innerText = "Day 6: " + (data.sleep[0].minutesAsleep / 60).toFixed(2) + " Hours",
        document.querySelector("#day7").innerText = "Day 7: " + (data.sleep[1].minutesAsleep / 60).toFixed(2) + " Hours",

        lastDaySleep = (data.sleep[1].minutesAsleep / 60).toFixed(2);
      console.log(data.sleep[0])

    }
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
    data: document.querySelector('#data'),

  },
  readoutUnit: readoutUnits.mph,
  watchId: null,
  wakeLock: null
};


var checkbox = document.querySelector("input[name=checkbox]")

checkbox.addEventListener('change', function () {
  if (this.checked) {
    if (appOpts.watchId) {
      navigator.geolocation.clearWatch(appOpts.watchId);

      if (appOpts.wakeLock) {
        appOpts.wakeLock.cancel();
      }

      appOpts.watchId = null;
    } else {
      const options = {
        enableHighAccuracy: true
      };
      appOpts.watchId = navigator.geolocation.watchPosition(parsePosition,
        null, options);
      startWakeLock();

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
  } catch (error) {
    // no experimental wake lock api build
  }
}

const parsePosition = (position) => {
  var detectedSpeed = Math.round(
    position.coords.speed * 3.6);

  // appOpts.dom.readout.textContent = detectedSpeed;
  if (lastDaySleep < 2.0) {
    console.log("Detecting the speed")

    if (detectedSpeed >= 30) {
      // appOpts.dom.readout.textContent = "yeyeyeyey";
      navigator.vibrate([3000]);
    }
  }

};

function vibrate(ms) {
  navigator.vibrate(ms)
}

const startServiceWorker = () => {
  navigator.serviceWorker
    .register('/pwa/serviceWorker.js')
    .then(res =>
      console.log("regisetered"),
      fitBitData()

    )
    .catch(err => console.log("service worker not registered", err));
}
startServiceWorker();

const inpKey = document.getElementById("inpKey");


function insert() {
  const key = inpKey.value;
  console.log(key);

  if (key) {
    localStorage.setItem("Rating: ", key);
    if (key <= 3) {
      alert("We noticed that you did not have a productive day, try getting some sleep tonight!")
    }
    location.reload();

  }


};
