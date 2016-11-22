<tank>
  <h3 class='text-center'>{opts.title}</h3>
  <div class='row container center-block'>
    <form class='col-xs-12 customForm'>
      <div class="form-group">
        <label for="addWaterInput">Water Pump</label>
        <input type="number" min="0" class="form-control" id="addWaterInput" placeholder="Add More Gallons">
      </div>
      <button type="submit" class="btn btn-block btn-info" onclick="{ addWater }">Add Water</button>        
    </form>
    
    <form class='col-xs-12 customForm'>
      <div class="form-group">
        <label for="alarmSetPointInput">Alarm Set Point</label>
        <input type="number" class="form-control" id="alarmSetPointInput" placeholder="Gallons">
      </div>
      <button type="submit" class="btn btn-block btn-success" onclick="{ changeSetPoint }">Set</button>         
    </form>
  </div>

  <div>
    <p class='{variable}'>Alarm SetPoint: {alarmSetPoint}</p>  
    <p>Water Level: {waterLevel}</p>
    <p>{alarm}</p>
  </div>
  <div class="chart-gauge"></div>

  <script type='text/babel'>
    let _this = this
    // default values
    this.waterLevel = 0
    this.alarmSetPoint = 500
    this.alarm = ''
    
    // on init
    this.alarmSetPointInput = this.alarmSetPoint

    this.on('update', function() {
      checkLevel()
    })

    this.addWater = (e) => {
      if (_this.addWaterInput.value) {
        _this.waterLevel += parseInt(_this.addWaterInput.value)
      } else {
        alert('invalid value')
      }
    };
    
    this.changeSetPoint = (e) => {
      if (_this.alarmSetPointInput.value) {
        _this.alarmSetPoint = _this.alarmSetPointInput.value
      } else {
        alert('invalid value')
      }
    };

    function checkLevel () {
      if (_this.waterLevel >= _this.alarmSetPoint) {
        _this.alarm = 'CAUTION WATER LEVEL REACHED'
      }
    }


  </script>

  <style>
    .customForm {
      margin-bottom: 20px
    }

  </style>
</tank>