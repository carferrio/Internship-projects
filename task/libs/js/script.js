$(window).on('load', function () {
    if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function () {
    $(this).remove();
    });
    }
    });
    
$('#weatherSubmit').click(function() {

    $.ajax({
        url: "libs/php/getWeather.php",
        type: 'POST',
        dataType: 'json',
        data: {
            north: $('#selNorth').val(),
            south: $('#selSouth').val(),
            east: $('#selEast').val(),
            west: $('#selWest').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#txtTemperature').html(result['data'][0]['temperature']);
                $('#txtClouds').html(result['data'][0]['clouds']);
                

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

});

$('#earthquakeSubmit').click(function() {

    $.ajax({
        url: "libs/php/getEarthquakes.php",
        type: 'POST',
        dataType: 'json',
        data: {
            north: $('#eNorth').val(),
            south: $('#eSouth').val(),
            east: $('#eEast').val(),
            west: $('#eWest').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#txtMagnitude').html(result['data'][0]['magnitude']);
                $('#txtDatetime').html(result['data'][0]['datetime']);
                

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

});

$('#oceanSubmit').click(function() {

    $.ajax({
        url: "libs/php/getOcean.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#selLat').val(),
            lng: $('#selLng').val()
            
        },
        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

                $('#txtName').html(result['data']['name']);
                
               
                

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

});

