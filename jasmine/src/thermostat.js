const DEFAULT_TEMP = 20;
const MIN_TEMP = 10;

var Thermostat = function () {
  this.temperature = DEFAULT_TEMP;
};

Thermostat.prototype.temperatureUp = function (number) {
  this.temperature += number;
};

Thermostat.prototype.temperatureDown = function (number) {
  if (this.temperature - number < MIN_TEMP) {
    throw 'Minimum temperature is 10 degrees'
  }
  this.temperature -= number;
};