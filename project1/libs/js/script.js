// ---------------------------------------------------------
// GLOBAL DECLARATIONS
// ---------------------------------------------------------

//var map;
var countryCode;
var countryBorder;
// tile layers


var streets = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
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

var map = L.map("map", {
  layers: [streets]
});

L.control.layers(basemaps).addTo(map);
// buttons

/*var infoBtn = L.easyButton("fa-info", function (btn, map) {
  $("#exampleModal").modal("show");
});*/
// ---------------------------------------------------------
// EVENT HANDLERS
// ---------------------------------------------------------

//Populate select list

$(document).ready(function () {
  
  $.ajax({
      url: "libs/php/getCountryList.php",
      type: 'POST',
      dataType: 'json',
      
      success: function(result) {

          console.log(JSON.stringify(result));

          if (result.status.name == "ok") {

            $.each(result.data, function(index) {
              $('#selCountry').append($("<option>", {
                  value: result.data[index].iso_a2,
                  text: result.data[index].name
              })); 
          }); 

          
        }
      
      },
      error: function(jqXHR, textStatus, errorThrown) {
          
      }
  }); 

})


/*async function countrySelect() {
  if ('geolocation' in navigator) {
      try {
          const position = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          countryCode = await new Promise((resolve, reject) => {
              $.ajax({
                  url: "libs/php/getCountryCode.php",
                  data: {
                      lat: latitude,
                      lng: longitude,
                  },
                  success: function (result) {
                      resolve(result.data);
                  },
                  error: function (error) {
                      reject(error);
                  },
              });
          });

          console.log(countryCode);
          getBorders(countryCode);

          

          
        } catch (error) {
            console.error("Error getting geolocation:", error);
            throw error;
        }
    } else {
        alert("Error: Please give access to your location.");
        return null;
    }
    getBorders(countryCode);
}*/
//Get user location and select location

/*$(document).ready(function() {
  navigator.geolocation.getCurrentPosition( geolocationCallback );  
});


function geolocationCallback( position ){

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  $.ajax({
    url: "libs/php/getCountryCode.php",
    type: 'POST',
    dataType: 'json',
    data: {
      lat: latitude,
      lng: longitude
    },
    success: function(result) {

      console.log(JSON.stringify(result));

      if (result.status.name == "ok") {

        countryCode= result.data;
        

      }
    
    },
    error: function(jqXHR, textStatus, errorThrown) {
      
    }
  })
}*/



$(document).ready( async function () {

 
  
    if (navigator.geolocation) {
      
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    
    

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;


    countryCode = await new Promise((resolve, reject) => {
    $.ajax({
			url: "libs/php/getCountryCode.php",
			type: 'POST',
			dataType: 'json',
			data: {
				lat: latitude,
				lng: longitude
			},
			success: function(result) {

				console.log(JSON.stringify(result));

				if (result.status.name == "ok") {

          resolve(result.data);

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				
			}
    })
  
		}); 
    getBorders(countryCode);


    
 
}
getBorders(countryCode);
console.log(countryCode);
})

//get borders
//getBorders("GB");
function getBorders (code) {
  
  $.ajax({
      url: "libs/php/getBorders.php",
      type: 'GET',
      dataType: 'json',
      data: {
				iso_a2: code
				
			},
      success: function(result) {

          console.log(JSON.stringify(result));

          if (result.status.name == "ok") {

            countryBorder = L.geoJSON(result.data, {
              style: {
              color: 'green',
              fillOpacity: 0,
              weight: 1,      
            },
            
          }).addTo(map);
        map.fitBounds(countryBorder.getBounds());
          
        }
      
      },
      error: function(jqXHR, textStatus, errorThrown) {
          
      }
  }); 

}
            


          
        
    
 

 





   
  

