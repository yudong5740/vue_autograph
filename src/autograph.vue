<template>
  <div>
    <canvas id="canvas" width="650" height="650">此浏览器不支持canvas</canvas>
    <div id="controller">
      <div id="black_btn" class="color_btn color_btn_selected"></div>
      <div id="blue_btn" class="color_btn"></div>
      <div id="green_btn" class="color_btn"></div>
      <div id="red_btn" class="color_btn"></div>
      <div id="orange_btn" class="color_btn"></div>
      <div id="yellow_btn" class="color_btn"></div>
      <div class="clearfix"></div>
    </div>
    <div class="clearBox" id="controller">
      <div id="clear_btn" class="op_btn">清除</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "editPC",
  data() {
    return {};
  },
  mounted() {
    var src =
      "https://s1.pstatp.com/cdn/expire-1-M/jquery/1.11.3/jquery.min.js";
    var script_dom = document.createElement("script");
    script_dom.src = src;
    script_dom.language = "javascript";
    script_dom.type = "text/javascript";
    var head = document.getElementsByTagName("head").item(0); //这个是往本页面动态加载js脚本
    head.appendChild(script_dom);

    if (this.isMobile()) {
      this.initApp();
    } else {
      this.init();
    }
  },
  methods: {
    isMobile() {
      let mobile = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return (mobile = mobile ? true : false);
    },
    initApp() {
      let that = this;
      var canvasWidth = Math.min(650, $(window).width() - 20);
      var canvasHeight = canvasWidth;
      var isMouseDown = false;
      var lastLoc = { x: 0, y: 0 };
      var strokeColor = "black";
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      this.drawGrid(context, canvasWidth, canvasHeight);
      $(" #controller").css("width", canvasWidth + "px");
      $("#clear_btn").click(function() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        that.drawGrid(context, canvasWidth, canvasHeight);
      });
      $(".color_btn").click(function(e) {
        $(".color_btn").removeClass("color_btn_selected");
        $(this).addClass("color_btn_selected");
        strokeColor = $(this).css("background-color");
      });
      canvas.addEventListener("touchstart", function(e) {
        e.preventDefault();
        isMouseDown = true;
        lastLoc = that.windowToCanvas(
          e.touches[0].clientX,
          e.touches[0].clientY
        );
      });

      canvas.addEventListener("touchend", function(e) {
        e.preventDefault();
        isMouseDown = false;
      });
      canvas.addEventListener("touchmove", function(e) {
        e.preventDefault();
        if (isMouseDown) {
          var curLoc = that.windowToCanvas(
            e.touches[0].clientX,
            e.touches[0].clientY
          );
          context.beginPath();
          context.moveTo(lastLoc.x, lastLoc.y);
          context.lineTo(curLoc.x, curLoc.y);
          context.strokeStyle = strokeColor;
          context.lineWidth = 10;
          context.lineCap = "round";
          context.lineJoin = "round";
          context.stroke();
          lastLoc = curLoc;
        }
      });
    },
    init() {
      let that = this;
      var canvasWidth = Math.min(650, $(window).width() - 20);
      var canvasHeight = canvasWidth;
      var isMouseDown = false;
      var lastLoc = { x: 0, y: 0 };
      var strokeColor = "black";
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      this.drawGrid(context, canvasWidth, canvasHeight);
      $(" #controller").css("width", canvasWidth + "px");
      $("#clear_btn").click(function() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        that.drawGrid(context, canvasWidth, canvasHeight);
      });
      $(".color_btn").click(function(e) {
        $(".color_btn").removeClass("color_btn_selected");
        $(this).addClass("color_btn_selected");
        strokeColor = $(this).css("background-color");
      });
      canvas.onmousedown = function(e) {
        e.preventDefault();
        isMouseDown = true;
        lastLoc = that.windowToCanvas(e.clientX, e.clientY);
      };
      canvas.onmouseup = function(e) {
        e.preventDefault();
        isMouseDown = false;
      };
      canvas.onmouseout = function(e) {
        e.preventDefault();
        isMouseDown = false;
      };
      canvas.onmousemove = function(e) {
        e.preventDefault();
        if (isMouseDown) {
          var curLoc = that.windowToCanvas(e.clientX, e.clientY);
          context.beginPath();
          context.moveTo(lastLoc.x, lastLoc.y);
          context.lineTo(curLoc.x, curLoc.y);
          context.strokeStyle = strokeColor;
          context.lineWidth = 10;
          context.lineCap = "round";
          context.lineJoin = "round";
          context.stroke();
          lastLoc = curLoc;
        }
      };
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
    }
  }
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
.color_btn_selected {
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


