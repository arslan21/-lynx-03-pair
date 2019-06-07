let pair = new Vue ({
  el: '#box',
  components: {
    timer: {
      template: '#timer'
    },
    cell: {
      template: `
        <div class="cell">
        </div>
      `,
    }
  },
  data: {
    timerHours: '0',
    timerMinutes: '00',
    timerSeconds: '00',
    base: 60,
    gameStart: false,
    items: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ],
    //цвета для рендера
    colors: [
      'red',
      'aqua',
      'purple',
      'lime',
      'silver',
      'gold',
      'brown',
      'navy'
    ],
  },
  methods: {
    //секндомер
    getStartTime() {
      var date = new Date();
      var cureSeconds = date.getSeconds();
      if (this.startSeconds > cureSeconds) {
        cureSeconds = this.base + cureSeconds
      }
      this.timerSeconds = this.zero(cureSeconds - this.startSeconds);
      if (this.timerSeconds == 0) {
        var minutes = +this.timerMinutes;
        this.timerMinutes = this.zero(minutes);
      }
      if (this.timerMinutes == this.base) {
        this.timerHours = + this.timerHours + 1;
        this.timerMinutes = 0;
      }
    },
    //добавление нуля к значению секнд и минут ниже 10
    zero(value) {
      if (value < 10) {
        value = '0' + value;
      }
      return value
    },
    //перемешать массив
    shuffle(arr) {
    	var j;
      var temp;
    	for(var i = arr.length - 1; i > 0; i--){
    		j = Math.floor(Math.random()*(i + 1));
    		temp = arr[j];
    		arr[j] = arr[i];
    		arr[i] = temp;
    	}
    	return arr;
    },
    //генерация массива items и наполнение цветами
    renderColor() {
      var col1 = [];
      for (var j = 0; j < (this.colors.length); j++) {
        col1[j] = {};
        col1[j].color = this.colors[j];
        col1[j].rank = 1;
      }
      var col2 = [];
      for (var j = 0; j < (this.colors.length); j++) {
        col2[j] = {};
        col2[j].color = this.colors[j];
        col2[j].rank = 2;
      }
      this.items = this.shuffle(col1.concat(col2));
    },
    timer() {
      var startDate = new Date();
      this.startSeconds = startDate.getSeconds();
      this.renderColor();
      this.gameStart = true;
      setInterval(this.getStartTime, 1000);
    }
  }
})
