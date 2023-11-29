var user_location;

function getData() {

    user_location = $("#searchleft").val();
    if(user_location==""){
        alert("Enter location first!")
        return false
    }
    
    
    $.ajax({
       
        url: "http://api.weatherapi.com/v1/forecast.json?key=ad1f01cca57f40b2909103412232604&q="+user_location,
        
        success: function(data) {
            
            console.log(data);
            
            let location = data.location.name+", "+data.location.region;
            let temp = data.current.temp_c;
            let condition = data.current.condition.text;
            let humidity = data.current.humidity+"%";
            let wind = data.current.wind_kph+"Km/h"+" "+data.current.wind_degree+"°"+" "+data.current.wind_dir;
            let pressure = data.current.pressure_mb+"mb";
            let visibility = data.current.vis_km+"Km";

            localStorage.setItem('user_location',location);
        

            let original_url = "https:"+data.current.condition.icon;
            let weather_icon = original_url.replace("64x64", "128x128");

            let temp_high = data.forecast.forecastday[0].day.maxtemp_c;
            let temp_low = data.forecast.forecastday[0].day.mintemp_c;
            
            $(".location").html('<span id="location_icon" class="material-icons">location_on</span> '+location);
            $("#temperature").html(temp+"°C");

            $(".temp_high").html("High : "+temp_high+"°C");
            $(".temp_low").html("Low : "+temp_low+"°C");

            $("#weather-description").html(condition);
            $("#weather_icon").attr("src",weather_icon);

            $(".Wind").html("Wind : "+wind);
            $(".Pressure").html("Pressure : "+pressure);
            $(".Humidity").html("Humidity : "+humidity);
            $(".Visibility").html("Visibility : "+visibility);

            $(".location").show();
            $("#weather-container").show();
            $("#weather-container2").show();
        }
            
        })
        
    }

    function checkWeather(){
        var saved_location = localStorage.getItem('user_location');
        if(saved_location!=null){
            //alert(saved_location)
            //user_location==saved_location;
            $("#searchleft").val(saved_location);
            getData();
            $(".button-2").show();
        }
    }

    function deleteSavedLocation(){
        if (confirm("Do you want to delete saved location?")) {
            localStorage.removeItem('user_location');
            window.location.reload();
        }
    }
    
