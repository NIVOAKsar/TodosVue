<template>
  <section id="s_color_picker_id">
    <canvas id="color_picker" width="200" height="200"></canvas>
    <div id="color_id"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      color_picker: null,
      color_id: null
    }
  },
  mounted() {
    this.color_picker = document.getElementById("color_picker");
    this.color_id = document.getElementById("color_id");
    // color_picker.onmousedown = select_color;
    this.color_picker_add();




  },
  methods: {
    color_picker_add() {
      console.log(this.color_picker);

      this.color_picker = this.color_picker.getContext("2d");
      let center_x = (this.color_picker.width) / 2;
      let center_y = (this.color_picker.height) / 2;
      let sx = center_x;
      let sy = center_y;
      let palette = new this.color_picker_element(center_x, center_y, sx, sy);
      palette.draw();
    },
    // select_color(e) {
    //   var x = e.pageX - color_picker.offsetLeft,
    //     y = e.pageY - color_picker.offsetTop,
    //     pixel = color_picker.getContext("2d").getImageData(x, y, 1, 1).data,
    //     pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
    //   color_id.style.backgroundColor = pixelColor;
    // },

    color_picker_element(center_x, center_y, sx, sy) {
      this.center_x = center_x;
      this.center_y = center_y;
      this.sx = sx;
      this.sy = sy;
      this.draw = function () {
        for (var i = 0; i < 360; i += 0.1) {
          var rad = (i - 45) * (Math.PI) / 180;
          color_picker_.strokeStyle = "hsla(" + i + ", 100%, 50%, 1.0)";
          color_picker_.beginPath();
          color_picker_.moveTo(center_x, center_y);
          color_picker_.lineTo(center_x + sx * Math.cos(-rad), center_y + sy * Math.sin(-rad));
          color_picker_.stroke();
        }
      }
    }
  }
}
</script>

<style scoped>
#s_color_picker_id {
  text-align: center;
}
#color_id {
  height: 100px;
  background-color: #000;
}
</style>