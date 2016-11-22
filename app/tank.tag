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
    <p>Alarm SetPoint: {this.alarmSetPoint}</p>  
    <p>Water Level: {this.waterLevel}</p>  
  </div>
  <div class="chart-gauge"></div>

  <script type='text/babel'>
    let ctrl = this
    // default values
    ctrl.waterLevel = 200
    ctrl.alarmSetPoint = 500
    
    // on init 

    ctrl.addWater = (e) => {
      if (this.addWaterInput.value) {
        ctrl.waterLevel += parseInt(this.addWaterInput.value)
      } else {
        alert('invalid value')
      }
    };
    
    ctrl.changeSetPoint = (e) => {
      if (this.alarmSetPointInput.value) {
        ctrl.alarmSetPoint = this.alarmSetPointInput.value
      } else {
        alert('invalid value')
      }
    };


  </script>

  <style>
    .customForm {
      margin-bottom: 20px
    }

    

  </style>
</tank>