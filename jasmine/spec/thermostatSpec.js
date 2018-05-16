describe('Thermostat', function () {
  var thermostat = new Thermostat;

  describe('Temperature Property of Thermostat', function () {
    it('should have a default temperature of 20 degrees', function () {
      expect(thermostat.temperature).toEqual(20);
    });
  });

  describe('Changing temperature', function () {
    afterEach(function () {
      thermostat.temperature = 20;
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
});
