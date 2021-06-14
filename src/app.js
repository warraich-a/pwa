var pwaCard = document.querySelector('#pwa');
var pwaCycle = document.querySelector('#cycle');
var pwaTips = document.querySelector('#tips');
var pwaProduct = document.querySelector('#productivity')
var pwaCardContent = pwaCard.querySelector('.card__cycle');
var pwaCardDetails = pwaCard.querySelector('.card__tips');
var pwaCardProduct = pwaCard.querySelector('.card__productivity');
//var detailsShown = false;

// if('serviceWorker' in navigator){
// navigator.serviceWorker.register('/sw.js')
// .then(function(){
//   console.log('SW registered');
// });
// }

pwaTips.addEventListener('click', function (event) {
    pwaCardContent.style.opacity = 0;
    pwaCardProduct.style.opacity = 0;
    pwaCardDetails.style.display = 'block';
    pwaCardContent.style.display = 'none';
    pwaCardProduct.style.display = 'none';
    setTimeout(function () {
      pwaCardDetails.style.opacity = 1;
    }, 300);

});

pwaCycle.addEventListener('click', function(event){
    detailsShown = false;
    pwaCardDetails.style.opacity = 0;
    pwaCardProduct.style.opacity = 0;    
    pwaCardContent.style.display = 'block';
    pwaCardDetails.style.display = 'none';
    pwaCardProduct.style.display = 'none';
    setTimeout(function () {
      pwaCardContent.style.opacity = 1;
    }, 300);
})

pwaProduct.addEventListener('click', function(event){
  detailsShown = false;
  pwaCardDetails.style.opacity = 0;
  pwaCardContent.style.opacity = 0;
  pwaCardProduct.style.display = 'block'
  pwaCardContent.style.display = 'none';
  pwaCardDetails.style.display = 'none';
  setTimeout(function () {
    pwaCardProduct.style.opacity = 1;
  }, 300);
})

function dropdown(){
  var x = document.getElementById("links");
  if(x.style.display === "block"){
    x.style.display = "none";
  }else {
    x.style.display = "block";
  }
}
