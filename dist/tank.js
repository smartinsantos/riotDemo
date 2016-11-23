riot.tag2('tank', '<h3 class="text-center">{opts.title}</h3> <div class="row container center-block"> <form class="col-xs-12 customForm"> <div class="form-group"> <label for="pumpSetPointInput">Water Pump</label> <input min="0" class="form-control" id="pumpSetPointInput" placeholder="Strokes/Sec (max 100)" type="number"> </div> <button type="submit" class="btn btn-block btn-info" onclick="{startPump}">Start Pump</button> </form> <form class="col-xs-12 customForm"> <div class="form-group"> <label for="alarmSetPointInput">Alarm Set Point</label> <input class="form-control" id="alarmSetPointInput" placeholder="Gallons" type="number"> </div> <button __disabled="{pump.on}" type="submit" class="btn btn-block btn-success" onclick="{changeSetPoint}">Set</button> </form> </div> <div> <p class="{variable}">Alarm SetPoint: {alarmSetPoint}</p> <p>Water Level: {waterLevel}</p> <p>{levelAlarm}</p> <p>{overflowAlarm}</p> </div> <div class="chart-gauge"></div>', '.customForm { margin-bottom: 20px }', '', function(opts) {
'use strict';

var _this = this;

// init values
this.on('mount', function () {
  _this.waterLevel = 0;
  _this.alarmSetPoint = 5000;
  _this.tankCapacity = 10000;
  _this.levelAlarm = '';
  _this.overflowAlarm = '';
  _this.pump = new pumpModel();
});

// life hooks
this.on('update', function () {
  console.log('updating');
  checkAlarms();
});

// on init
// set vw setPoint
this.alarmSetPointInput = this.alarmSetPoint;

this.startPump = function (e) {
  if (_this.pumpSetPointInput.value) {
    var pumpRate = parseInt(_this.pumpSetPointInput.value);
    console.log('starting pump at: ', pumpRate);
    _this.pump.start(pumpRate);
  } else {
    alert('invalid value');
  }
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
  this.interval = 0;

  this.start = function (pumpRate) {
    // set maximum rate to 100
    pumpRate = pumpRate >= 100 ? 100 : pumpRate;

    _this2.interval = setInterval(function () {
      // if tank is overflowed stop
      _this.waterLevel >= _this.tankCapacity ? _this2.stop() : _this2.on = true;

      if (_this2.on) {
        _this.waterLevel += pumpRate;
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
  _this.levelAlarm = _this.waterLevel >= _this.alarmSetPoint ? 'CAUTION WATER LEVEL REACHED' : '';

  _this.overflowAlarm = _this.waterLevel >= _this.tankCapacity ? 'TANK OVERFLOW' : '';
}
});