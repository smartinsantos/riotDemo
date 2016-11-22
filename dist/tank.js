riot.tag2('tank', '<h3 class="text-center">{opts.title}</h3> <div class="row container center-block"> <form class="col-xs-12 customForm"> <div class="form-group"> <label for="addWaterInput">Water Pump</label> <input min="0" class="form-control" id="addWaterInput" placeholder="Add More Gallons" type="number"> </div> <button type="submit" class="btn btn-block btn-info" onclick="{addWater}">Add Water</button> </form> <form class="col-xs-12 customForm"> <div class="form-group"> <label for="alarmSetPointInput">Alarm Set Point</label> <input class="form-control" id="alarmSetPointInput" placeholder="Gallons" type="number"> </div> <button type="submit" class="btn btn-block btn-success" onclick="{changeSetPoint}">Set</button> </form> </div> <div> <p>Alarm SetPoint: {this.alarmSetPoint}</p> <p>Water Level: {this.waterLevel}</p> </div> <div class="chart-gauge"></div>', '.customForm { margin-bottom: 20px }', '', function(opts) {
'use strict';

var _this = this;

var ctrl = this;
// default values
ctrl.waterLevel = 200;
ctrl.alarmSetPoint = 500;

// on init

ctrl.addWater = function (e) {
  if (_this.addWaterInput.value) {
    ctrl.waterLevel += parseInt(_this.addWaterInput.value);
  } else {
    alert('invalid value');
  }
};

ctrl.changeSetPoint = function (e) {
  if (_this.alarmSetPointInput.value) {
    ctrl.alarmSetPoint = _this.alarmSetPointInput.value;
  } else {
    alert('invalid value');
  }
};
});