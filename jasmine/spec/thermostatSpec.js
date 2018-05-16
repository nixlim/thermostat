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
  });
});