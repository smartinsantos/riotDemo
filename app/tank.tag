<tank>
  <h3 class='text-center'>{opts.title}</h3>
  <div class='row'>
    <div class='row container center-block col-xs-6'>
      <form class='col-xs-12 customForm'>
        <div class="form-group">
          <label for="pumpSetPointInput">Water Pump</label>
          <input type="number" min="0" class="form-control" id="pumpSetPointInput" placeholder="Gallons/Sec (max 100)">
        </div>
        <div class='row container center-block col-xs-12'>
          <button disabled={ pump.on === true } 
                  onclick="{ startPump }"
                  type="submit" 
                  class="btn btn-info col-xs-5">      
            Start Pump
          </button>        
          <button disabled={ pump.on === false } 
                  onclick="{ stopPump }"
                  type="submit" 
                  class="btn btn-danger col-xs-5 col-xs-offset-1">
            Stop Pump
          </button>           
        </div>

      </form>
      
      <form class='col-xs-12 customForm'>
        <div class="form-group">
          <label for="alarmSetPointInput">Alarm Set Point</label>
          <input type="number" class="form-control" id="alarmSetPointInput" placeholder="Gallons ( def 5000 Gal )">
        </div>
        <button type="submit" class="btn btn-block btn-success" onclick="{ changeSetPoint }">Set</button>         
      </form>
    </div>
    
    <div class='col-xs-6'>
      <h3>Tank Capacity: {tankCapacity} Gals.</h3>
      <h3>Alarm SetPoint: {alarmSetPoint} Gals.</h3>  
      <h3>Water Level: {waterLevel} Gals.</h3>
      <h3>Level Alarm: <span class= { alarm: levelAlarm !== 'OK' }>{levelAlarm}</span></h3>
      <h3>OverFlow Alarm: <span class={ alarm: overflowAlarm !== 'OK' }>{overflowAlarm}</span></h3>
    </div>
  
  </div>
  
  <script type='text/babel'>
    let _this = this
    
  // curious about all events ?
  this.on('*', function(eventName) {
    console.info(eventName)
  })

    // init values
    this.on('mount', function() {
      _this.waterLevel = 0
      _this.alarmSetPoint = 5000
      _this.tankCapacity = 10000
      _this.levelAlarm = 'OK'
      _this.overflowAlarm = 'OK'
      _this.pump = new pumpModel()
      _this.update()
    })
    
    // life hooks 
    this.on('update', function() {
      console.log('updating')
      checkAlarms()
    })

    // on init
    // set vw setPoint 
    // this.alarmSetPointInput = this.alarmSetPoint

    this.startPump = (e) => {
      if (_this.pumpSetPointInput.value) {
        let pumpRate = parseInt(_this.pumpSetPointInput.value)
        _this.pump.start(pumpRate)
      
      } else {
        alert('invalid value')
      }
    };

    this.stopPump = (e) => {
      _this.pump.stop()
    };
    
    this.changeSetPoint = (e) => {
      if (_this.alarmSetPointInput.value) {
        _this.alarmSetPoint = _this.alarmSetPointInput.value
      } else {
        alert('invalid value')
      }
    };


  // helper methods
    // pump constructor
    function pumpModel () {
      this.on = false
      this.interval = 0
      
      this.start = (pumpRate) => {
        // set maximum rate to 100
        pumpRate = pumpRate >= 100 ? 100 : pumpRate 

        this.interval = setInterval( () => {
          // if tank is overflowed stop
          _this.waterLevel >= _this.tankCapacity ? this.stop() : this.on = true
          
          if (this.on) {
            _this.waterLevel += pumpRate
            _this.update()            
          }
          
        }, 1000)
      }
      
      this.stop = () => {
        this.on = false
        clearInterval(this.interval)
      }
    };

  // update alarm for water level
    function checkAlarms () {
      _this.levelAlarm = _this.waterLevel >= _this.alarmSetPoint
      ? 'CAUTION WATER LEVEL REACHED'
      : 'OK' 

      _this.overflowAlarm = _this.waterLevel >= _this.tankCapacity
      ? 'TANK OVERFLOW (pump stopped!)'
      : 'OK' 
    }

  </script>

  <style>
    .customForm {
      margin-bottom: 20px
    }

    .alarm {
      color: red;
    }

  </style>
</tank>