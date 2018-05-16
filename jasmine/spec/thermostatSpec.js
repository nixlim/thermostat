describe('Thermostat', function () {
  var thermostat = new Thermostat;

  describe('Temperature Property of Thermostat', function () {
    it('should have a default temperature of 20 degrees', function () {
      expect(thermostat.temperature).toEqual(20);
    });
    it('should reset the temperature to 20', function () {
      thermostat.temperatureUp(2);
      thermostat.resetTemperature();
      expect(thermostat.temperature).toEqual(20);
    });
  });

  describe('Changing temperature', function () {
    beforeEach(function () {
      thermostat.temperature = 20;
      thermostat.powerSaver = true;
    });
    afterEach(function () {
      thermostat.temperature = 20;
      thermostat.powerSaver = true;
    });
    it('should increase temperature by a specified amount', function () {
      thermostat.temperatureUp(5);
      expect(thermostat.temperature).toEqual(25);
    });
    it('should decrease temperature by a specified amount', function () {
      thermostat.temperatureDown(5);
      expect(thermostat.temperature).toEqual(15);
    });
    it('should prevent temperature from decreasing below 10', function () {
      expect(function () {
        thermostat.temperatureDown(11)
      }).toThrow('Minimum temperature is 10 degrees');
    });
    it('should prevent temperature from rising above 25 when power saver is on', function(){
      expect(function(){
        thermostat.temperatureUp(6)
      }).toThrow('Maximum temperature is 25 degrees');
    });
    it('should prevent temperature from rising above 32 when power saver is off', function(){
      thermostat.switchOff();
      expect(function(){
        thermostat.temperatureUp(13)
      }).toThrow('Maximum temperature is 32 degrees');
    });
  });

  describe('Power saving mode', function(){
    afterEach(function() {
      thermostat.powerSaver = true;
    });
    it('be set to on by default', function(){
      expect(thermostat.powerSaver).toBeTruthy();
    });
    it('should switch off', function(){
      thermostat.switchOff();
      expect(thermostat.powerSaver).toBeFalsy();
    });
    it('should switch on', function(){
      thermostat.switchOff();
      thermostat.switchOn();
      expect(thermostat.powerSaver).toBeTruthy();
    });
  });

  describe('Energy usage', function () {
    afterEach(function () {
      thermostat.temperature = 20;
      thermostat.powerSaver = true;
    });
    it('should return \'low-usage\' if the temp is below 18 degrees', function () {
      thermostat.temperatureDown(3);
      expect(thermostat.energyUse()).toEqual('low-usage');
    });
    it('should return \'medium-usage\' if the temp is >= 18 but below 25 degrees', function () {
      expect(thermostat.energyUse()).toEqual('medium-usage');
    });
    it('should return \'high-usage\' if the temp is >= 25', function () {
      thermostat.switchOff();
      thermostat.temperatureUp(10);
      expect(thermostat.energyUse()).toEqual('high-usage');
    });
  });
});
