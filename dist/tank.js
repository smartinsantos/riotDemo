riot.tag2('tank', '<h3 class="text-center">{opts.title}</h3> <div class="row"> <div class="row container center-block col-xs-12 col-sm-6"> <form class="col-xs-12 customForm"> <div class="form-group"> <label for="pumpSetPointInput">Water Pump</label> <input min="0" class="form-control" id="pumpSetPointInput" placeholder="Gallons/Sec (max 100)" type="number"> </div> <div class="row container center-block col-xs-12"> <button __disabled="{pump.on === true}" onclick="{startPump}" type="submit" class="btn btn-info col-xs-5"> Start Pump </button> <button __disabled="{pump.on === false}" onclick="{stopPump}" type="submit" class="btn btn-danger col-xs-5 col-xs-offset-1"> Stop Pump </button> </div> </form> <form class="col-xs-12 customForm"> <div class="form-group"> <label for="alarmSetPointInput">Alarm Set Point</label> <input class="form-control" id="alarmSetPointInput" placeholder="Gallons ( def 5000 Gal )" type="number"> </div> <button type="submit" class="btn btn-block btn-success" onclick="{changeSetPoint}">Set</button> </form> </div> <div class="col-xs-6 col-sm-3 center-block"> <h3>Tank:</h3> <p>Capacity: {tankCapacity} Gals.</p> <p>Water Level: {waterLevel} Gals.</p> <h3>Alarms:</h3> <p>Alarm SetPoint: {alarmSetPoint} Gals.</p> <p>Level Alarm: <span class="{alarm: levelAlarm !== \'OK\'}">{levelAlarm}</span></p> <p>OverFlow Alarm: <span class="{alarm: overflowAlarm !== \'OK\'}">{overflowAlarm}</span></p> <h3>Pump:</h3> <p>Status: {pump.on ? \'On.\' : \'Off.\'}</p> <p>Input: {24/100 * pump.pumpRate} mA.</p> <p>Output Rate: {pump.pumpRate} Gals/sec.</p> </div> <div class="col-xs-6 col-sm-3"> <svg id="fillgauge1" width="80%" height="300"></svg> </div> </div>', '.customForm { margin-bottom: 20px } .alarm { color: red; }', '', function(opts) {
'use strict';

var _this = this;

// init values
this.on('mount', function () {
  _this.waterLevel = 0;
  _this.alarmSetPoint = 5000;
  _this.tankCapacity = 10000;
  _this.levelAlarm = 'OK';
  _this.overflowAlarm = 'OK';
  _this.pump = new pumpModel();
  _this.update();

  // D3 Gauge
  _this.gauge1 = loadLiquidFillGauge("fillgauge1", 0);
  _this.config1 = liquidFillGaugeDefaultSettings();
  _this.config1.circleColor = "#FF7777";
  _this.config1.textColor = "#FF4444";
  _this.config1.waveTextColor = "#FFAAAA";
  _this.config1.waveColor = "#FFDDDD";
  _this.config1.circleThickness = 0.2;
  _this.config1.textVertPosition = 0.2;
  _this.config1.waveAnimateTime = 1000;
});

// life hooks
this.on('update', function () {
  checkAlarms();
});

this.startPump = function (e) {
  if (_this.pumpSetPointInput.value) {
    var pumpRate = parseInt(_this.pumpSetPointInput.value);
    _this.pump.start(pumpRate);
  } else {
    alert('invalid value');
  }
};

this.stopPump = function (e) {
  _this.pump.stop();
};

this.changeSetPoint = function (e) {
  if (_this.alarmSetPointInput.value) {
    _this.alarmSetPoint = _this.alarmSetPointInput.value;
  } else {
    alert('invalid value');
  }
};

// helper methods
// pump constructor
function pumpModel() {
  var _this2 = this;

  this.on = false;
  this.pumpRate = 0;
  this.interval = 0;

  this.start = function (pumpRate) {
    // set maximum rate to 100
    _this2.pumpRate = pumpRate >= 100 ? 100 : pumpRate;

    _this2.interval = setInterval(function () {
      // if tank is overflowed stop
      _this.waterLevel >= _this.tankCapacity ? _this2.stop() : _this2.on = true;

      if (_this2.on) {
        _this.waterLevel += _this2.pumpRate;
        updateTank();
        _this.update();
      }
    }, 1000);
  };

  this.stop = function () {
    _this2.on = false;
    clearInterval(_this2.interval);
  };
};

// update alarm for water level
function checkAlarms() {
  _this.levelAlarm = _this.waterLevel >= _this.alarmSetPoint ? 'CAUTION WATER LEVEL REACHED' : 'OK';

  _this.overflowAlarm = _this.waterLevel >= _this.tankCapacity ? 'TANK OVERFLOW (pump stopped!)' : 'OK';
}
// update tank gauge
function updateTank() {
  _this.gauge1.update(_this.waterLevel / 100);
}
});