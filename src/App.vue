<template>
  <div id="app">
    <Steve :class="{'scope-border': followScope==='box'}"
           :skinUrl="skin" 
           :followScope="followScope" 
           :stareMouse="stareMouse"
           :walkable="walkable"
           :rotationX="rotationX"
           :rotationY="rotationY"
           :throttle="8"
           :pace="pace" 
           :speed="speed">
    </Steve>
  
    <table>
      <thead>
        <tr>
          <th>key</th>
          <th>value</th>
          <th>default</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>width</td>
          <td>画布宽度</td>
          <td>480</td>
        </tr>
        <tr>
          <td>height</td>
          <td>画布高度</td>
          <td>640</td>
        </tr>
        <tr>
          <td>pace</td>
          <td>步伐距离 1 ~ 10</td>
          <td>
            <input type="number" v-model.number.lazy="pace" max="10" min="1">
          </td>
        </tr>
        <tr>
          <td>speed</td>
          <td>速度 -18 ~ 18</td>
          <td>
            <input type="number" v-model.number.lazy="speed" max="18" min="-18">
          </td>
        </tr>
        <tr>
          <td>rotationX</td>
          <td>水平旋转 Number(deg)</td>
          <td>
            <input type="number" v-model.number="rotationX">
          </td>
        </tr>
        <tr>
          <td>rotationY</td>
          <td>垂直旋转 Number(deg)</td>
          <td>
            <input type="number" v-model.number="rotationY">
          </td>
        </tr>
        <tr>
          <td>skinUrl</td>
          <td>自定义皮肤
            <br>base64 or URL (32px*64px)</td>
          <td>steve-skin by base64
            <br>
            <button @click="changeSkin">切换皮肤</button><button @click="clickSkinBtn">自定义皮肤</button>
          </td>
        </tr>
        <tr>
          <td>scale</td>
          <td>模型缩放 ≥ 0</td>
          <td>1</td>
        </tr>
        <tr>
          <td>stareMouse</td>
          <td>视线是否跟随鼠标 Boolean</td>
          <td>
            <select v-model="stareMouse">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </select>
          </td>
          </td>
        </tr>
        <tr>
          <td>followScope</td>
          <td>视野跟随鼠标区域
            <br>"window"|"box"</td>
          <td>
            <select v-model="followScope">
              <option>box</option>
              <option>window</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>walkable</td>
          <td>行走动作 Boolean</td>
          <td>
            <select v-model="walkable">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>throttle</td>
          <td>节流时间(毫秒)</td>
          <td>8</td>
        </tr>
      </tbody>
      <input accept="image/*" ref='input_file' type="file" @change="loadSkin" hidden>
    </table>
  </div>
</template>

<script>
import Steve from './components/Steve'

export default {
  name: 'app',
  components: {
    Steve
  },
  data() {
    return {
      rotationX: 10,
      rotationY: 10,
      speed: 2,
      pace: 6,
      stareMouse: true,
      followScope: 'window',
      walkable: true,
      skin: "./static/technologist.png",
      skinArray: ['./static/technologist.png','./static/KiritoGamer.png','./static/char.png'],
      skinIndex: 0
    }
  },
  mounted() {
    document.querySelector('body').addEventListener('touchmove', function(e) {
      e.preventDefault();
    })
  },
  methods: {
    clickSkinBtn() {
      this.$refs.input_file.click()
    },
    loadSkin() {
      var file = this.$refs.input_file.files[0];
      var reader = new FileReader()
      reader.onload = () => {
        this.skin = reader.result;
      }
      reader.readAsDataURL(file)
    },
    changeSkin(){
      this.skin = this.skinArray[++this.skinIndex % 3]
    },
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  line-height: 1.5;
  background: #666;
}

#app {
  margin-top: 50px;
  text-align: center;
}

table {
  display: inline-table;
  margin: 20px 0 0 50px;
  vertical-align: top;
  background: #fff;
  border-spacing: 0;
  border-collapse: collapse;
}

button{
  padding: 6px;
  margin: 6px;
  color: #fff;
  border: none;
  background: #66ccff url();
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}

button:active{
  background: #66bbff url();
}

button:active{
  background: #66bbff url();
}

th,
td {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
  text-align: left;
}

tr:nth-child(2n) {
  background-color: #f6f8fa;
}

.scope-border {
  background: #555;
}

input,
select {
  width: 100%;
  border: 1px solid #ccc;
  padding: 6px;
  background: rgba(255, 255, 255, .3);
}
</style>