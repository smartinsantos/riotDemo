<tank>
  <h3 class='text-center'>Tank Demo</h3>
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

  <div id="banner">
  <div class="pour"></div>
  <div class="fill">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="300px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve">
      <path fill="#04ACFF" id="waveShape" d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
        c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
        c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z" />
    </svg>
  </div>
</div>

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