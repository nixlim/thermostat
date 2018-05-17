$(document).ready(function(){
  var thermostat = new Thermostat();

  $('.slider').val(thermostat.temperature);
  $('.slider').click(function(){
    var val = $('.slider').val();
    if (val > thermostat.temperature){
      thermostat.temperatureUp(val-thermostat.temperature);
      $('.temperature-display').html(thermostat.temperature);
    } else if (val < thermostat.temperature){
      thermostat.temperatureDown(thermostat.temperature-val);
      $('.temperature-display').html(thermostat.temperature);

    };
  });

  $('.temperature-display').html(thermostat.temperature);

});
