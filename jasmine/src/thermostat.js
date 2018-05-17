const DEFAULT_TEMP = 20;
const MIN_TEMP = 10;
const MAX_TEMP_POWERSAVER = 25;
const MAX_TEMP_NOPOWERSAVER = 32;
const DEFAULT_POWERSAVER = true;
const LOW_USAGE_UPPER_THRESHOLD = 18;
const MEDIUM_USAGE_UPPER_THRESHOLD = 25;

var Thermostat = function () {
  this.temperature = DEFAULT_TEMP;
  this.powerSaver = DEFAULT_POWERSAVER;
};

Thermostat.prototype.temperatureUp = function (number) {
  if(this.powerSaver === true){
    var limit = MAX_TEMP_POWERSAVER;
  } else {
    var limit = MAX_TEMP_NOPOWERSAVER;
  };
  if(this.temperature + number > limit){
    this.temperature = limit;
    throw 'Maximum temperature is ' + limit + ' degrees';
  };
  this.temperature += number;
};

Thermostat.prototype.temperatureDown = function (number) {
  if (this.temperature - number < MIN_TEMP) {
    this.temperature = MIN_TEMP;
    throw 'Minimum temperature is 10 degrees'
  }
  this.temperature -= number;
};

Thermostat.prototype.switchOff = function () {
  this.powerSaver = false;
};

Thermostat.prototype.switchOn = function () {
  this.powerSaver = true;
};

Thermostat.prototype.resetTemperature = function () {
  this.temperature = DEFAULT_TEMP;
};

Thermostat.prototype.energyUse = function () {
  if (this.temperature < LOW_USAGE_UPPER_THRESHOLD){
    return 'low-usage';
  } else if (this.temperature >= LOW_USAGE_UPPER_THRESHOLD &&
    this.temperature < MEDIUM_USAGE_UPPER_THRESHOLD) {
    return 'medium-usage';
  }else {
    return 'high-usage';
  }
}
