<template>
  <div>
    <canvas id="canvas" width="650" height="650">此浏览器不支持canvas</canvas>
    <div id="controller" :style="{width:controllerW}">
      <div id="black_btn" :class="['color_btn', colorType == 'black'?'color_selected':'']" @click="color_btn('black')"></div>
      <div id="blue_btn"  :class="['color_btn', colorType == 'blue'?'color_selected':'']" @click="color_btn('blue')"></div>
      <div id="green_btn" :class="['color_btn', colorType == 'green'?'color_selected':'']" @click="color_btn('green')"></div>
      <div id="red_btn"  :class="['color_btn', colorType == 'red'?'color_selected':'']"  @click="color_btn('red')"></div>
      <div id="orange_btn" :class="['color_btn', colorType == 'orange'?'color_selected':'']" @click="color_btn('orange')"></div>
      <div id="yellow_btn"  :class="['color_btn', colorType == 'yellow'?'color_selected':'']" @click="color_btn('yellow')"></div>
      <div class="clearfix"></div>
    </div>
    <div class="clearBox"   :style="{width:controllerW}">
      <div id="clear_btn" class="op_btn" @click="clear_btn">清除</div>
    </div>  
  </div>
</template>
<script>
export default {
  name: "editPc",
  data() {
    return {
      canvasWidth:0,   //画布宽度
      canvasHeight:0,  //画布高度
      context:null,
      controllerW:0,  //调色板宽度
      colorType:'black',
      strokeColor:'black', 
    };
  },
  created() {},
  mounted() {  
    this.init();
  },
  methods: {
    isMobile() {
      let mobile = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return (mobile = mobile ? true : false);
    },
     
    init() {
      let that = this;
      let isMouseDown = false;
      let lastLoc = { x: 0, y: 0 }; 
      let canvas = document.getElementById("canvas");
      this.canvasWidth = Math.min(650, $(window).width() - 20);
      this.canvasHeight = this.canvasWidth; 
      this.context = canvas.getContext("2d");
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight; 
      this.drawGrid(this.context, this.canvasWidth, this.canvasHeight); 
      this.controllerW = `${this.canvasWidth}px`  
      if (this.isMobile()) {
        this.app(isMouseDown, lastLoc, this.context, this.strokeColor);
      } else {
        this.web(isMouseDown, lastLoc, this.context, this.strokeColor);
      }
    },
    clear_btn(){
         this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.drawGrid(this.context, this.canvasWidth, this.canvasHeight);
    },
    color_btn(val){
      this.colorType = val
      this.strokeColor = val
    },
    web(isMouseDown, lastLoc, context) {
      let that = this;
      canvas.onmousedown = function (e) {
        e.preventDefault();
        isMouseDown = true;
        lastLoc = that.windowToCanvas(e.clientX, e.clientY);
      };
      canvas.onmouseup = function (e) {
        e.preventDefault();
        isMouseDown = false;
      };
      canvas.onmouseout = function (e) {
        e.preventDefault();
        isMouseDown = false;
      };
      canvas.onmousemove = function (e) {
        e.preventDefault();
        if (isMouseDown) {
          var curLoc = that.windowToCanvas(e.clientX, e.clientY);
          context.beginPath();
          context.moveTo(lastLoc.x, lastLoc.y);
          context.lineTo(curLoc.x, curLoc.y);
          context.strokeStyle = that.strokeColor;
          context.lineWidth = 10;
          context.lineCap = "round";
          context.lineJoin = "round";
          context.stroke();
          lastLoc = curLoc;
        }
      };
    },
    app(isMouseDown, lastLoc, context, strokeColor) {
      let that = this;
      canvas.addEventListener("touchstart", function (e) {
        e.preventDefault();
        isMouseDown = true;
        lastLoc = that.windowToCanvas(
          e.touches[0].clientX,
          e.touches[0].clientY
        );
      });

      canvas.addEventListener("touchend", function (e) {
        e.preventDefault();
        isMouseDown = false;
      });
      canvas.addEventListener("touchmove", function (e) {
        e.preventDefault();
        if (isMouseDown) {
          var curLoc = that.windowToCanvas(
            e.touches[0].clientX,
            e.touches[0].clientY
          );
          context.beginPath();
          context.moveTo(lastLoc.x, lastLoc.y);
          context.lineTo(curLoc.x, curLoc.y);
          context.strokeStyle = that.strokeColor;
          context.lineWidth = 10;
          context.lineCap = "round";
          context.lineJoin = "round";
          context.stroke();
          lastLoc = curLoc;
        }
      });
    },
    drawGrid(context, canvasWidth, canvasHeight) {
      context.save();
      context.strokeStyle = "rgb(230,11,9)";
      context.beginPath();
      context.moveTo(3, 3);
      context.lineTo(canvasWidth - 3, 3);
      context.lineTo(canvasWidth - 3, canvasHeight - 3);
      context.lineTo(3, canvasHeight - 3);
      context.closePath();

      context.lineWidth = 6;
      context.stroke();
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(canvasWidth, canvasHeight);

      context.moveTo(0, canvasHeight);
      context.lineTo(canvasWidth, 0);

      context.moveTo(0, canvasHeight / 2);
      context.lineTo(canvasWidth, canvasHeight / 2);

      context.moveTo(canvasWidth / 2, 0);
      context.lineTo(canvasWidth / 2, canvasHeight);

      context.lineWidth = 1;
      context.stroke();

      context.restore();
    },
    windowToCanvas(x, y) {
      var bbox = canvas.getBoundingClientRect();
      return { x: Math.round(x - bbox.left), y: Math.round(y - bbox.top) };
    },
  },
};
</script>
<style>
#canvas {
  display: block;
  margin: 0 auto;
}

/*清除器样式*/
#controller {
  margin: 0 auto;
}

.op_btn {
  margin: 20px 0 0 9px;
  border: 2px solid #aaa;
  width: 80px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
  font-weight: bold;
  font-family: Arial;
}

.clearBox{
  margin: 0 auto;
}

.op_btn:hover {
  background: #def;
}

.clearfix {
  clear: both;
}

/*颜色按钮*/
.color_btn {
  float: left;
  margin: 16px 0 0 9px;
  border: 5px solid white;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
}

.color_btn:hover {
  border: 5px solid violet;
}

/*默认边框*/
.color_selected {
  border: 5px solid blueviolet;
}

#black_btn {
  background-color: black;
}

#blue_btn {
  background-color: blue;
}

#green_btn {
  background-color: green;
}

#red_btn {
  background-color: red;
}

#orange_btn {
  background-color: orange;
}

#yellow_btn {
  background-color: yellow;
}
</style>


