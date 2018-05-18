$(document).ready(function(){
  var thermostat = new Thermostat();

  $('.slider').val(thermostat.temperature);
  $('.temperature-display').html(thermostat.temperature);

  $.getJSON('http://localhost:9292/', function (data) {
    console.log(data)
  });



  $('.weatherButton').click(function(){
    var city = $('.city').val()
    $.get('http://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=metric&APPID=9b17508b9c89e36716d8257b41b462bb', function (response) {

      $('.cityName').html(response.name);
      $('.cityTemp').html(response.main.temp);
    })
    .fail(function() {
      alert("city not available, please try again")
    })
  });


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
  });

  $('#PowerSaverOn').click(function(){
      thermostat.switchOn()
    });

  $('#PowerSaverOff').click(function(){
      thermostat.switchOff()
    });
  $('#Reset').click(function () {
    thermostat.resetTemperature();
    $('.temperature-display').html(thermostat.temperature);
    $('.slider').val(thermostat.temperature);
    $('body').attr('class', thermostat.energyUse());
  })

    $('body').attr('class', thermostat.energyUse());



});
