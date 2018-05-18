


$(document).ready(function(){
  var thermostat = new Thermostat();

  $.getJSON('http://localhost:9292/', function (data) {
    thermostat.temperature = data.temp;
    thermostat.powerSaver = data.mode;
    $('.slider').val(thermostat.temperature);
    $('.temperature-display').html(thermostat.temperature);
    $('body').attr('class', thermostat.energyUse());
    console.log(data.mode);
    if (thermostat.powerSaver == "false") {
       $('#PowerSaverOff').attr("checked", true);
    } else { $('#PowerSaverOn').attr("checked", true);}
  });




  $('.weatherButton').click(function(){
    var city = $('.city').val();
    $.get('http://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=metric&APPID=9b17508b9c89e36716d8257b41b462bb', function (response) {

      $('.cityName').html(response.name);
      $('.cityTemp').html(response.main.temp);
    })
    .fail(function() {
      alert("city not available, please try again")
    })
  });

  function ghostBusters () {
    $.post('http://localhost:9292/', {temperature: thermostat.temperature, mode: thermostat.powerSaver});
  }


  function upOrDown (value) {
    if (value - thermostat.temperature > 0) {
      try { thermostat.temperatureUp(value-thermostat.temperature); }
      catch (e) {
        $('.error_message').html(e).fadeOut(1000, function () {
          $('.error_message').html('').fadeIn();
        });
      }
    } else {
      try { thermostat.temperatureDown(thermostat.temperature-value); }
      catch (e) {
        $('.error_message').html(e).fadeOut(1000, function () {
          $('.error_message').html('').fadeIn();
        });
      }
    }
  }

  $('.slider').click(function(){
    var sliderTempValue = $('.slider').val();
    upOrDown(sliderTempValue);
    $('.temperature-display').html(thermostat.temperature);
    $('.slider').val(thermostat.temperature);
    $('body').attr('class', thermostat.energyUse());
    ghostBusters();
  });

  $('#PowerSaverOn').click(function(){
    thermostat.switchOn()
    ghostBusters();
    });

  $('#PowerSaverOff').click(function(){
    thermostat.switchOff()
    ghostBusters();
    });
  $('#Reset').click(function () {
    thermostat.resetTemperature();
    $('.temperature-display').html(thermostat.temperature);
    $('.slider').val(thermostat.temperature);
    $('body').attr('class', thermostat.energyUse());
    ghostBusters();
  })

    $('body').attr('class', thermostat.energyUse());



});
