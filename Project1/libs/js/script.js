// ---------------------------------------------------------
// GLOBAL DECLARATIONS
// ---------------------------------------------------------

var map;

// tile layers

/*var streets = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
  }
);

var satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
  }
);

var basemaps = {
  "Streets": streets,
  "Satellite": satellite
};

// buttons

var infoBtn = L.easyButton("fa-info", function (btn, map) {
  $("#exampleModal").modal("show");
});*/
// ---------------------------------------------------------
// EVENT HANDLERS
// ---------------------------------------------------------

$(document).ready(function () {

  $.ajax({
      url: "libs/php/countryBorders.php",
      type: 'POST',
      dataType: 'json',
      
      success: function(result) {

          console.log(JSON.stringify(result));

          if (result.status.name == "ok") {

            for (var index = 0; index < result.data.features.length; index++) {
              $('#selCountry').append($('<option>', {
                value: result.data.features[index].properties.iso_a3,
                text: result.data.features[index].properties.name,
            }));

          }
        }
      
      },
      error: function(jqXHR, textStatus, errorThrown) {
          // your error code
      }
  }); 

})
// initialise and add controls once DOM is ready

$(document).ready( async function () {
  
    if (navigator.geolocation) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
        

            map = L.map('map').setView([latitude, longitude], 13);
          };

          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
        }
    
  // setView is not required in your application as you will be
  // deploying map.fitBounds() on the country border polygon

 
)




   
  

