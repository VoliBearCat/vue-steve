# vue-steve

> A Vue.js project, Minecraft's Steve-Model

## Usage

``` bash
npm install three --save
npm install vue-steve --save
```

```
<steve skinUrl="./xxx.png" followMouseMode="window-scope" ref="mSteve"></steve>
```

```
import Steve from 'vue-steve'

export default {
    ...
    components:{
      Steve
    },
    mounted() {
      this.$refs.mSteve.setSpeed(2)
    }
    ...
}

```

## Demo

### [Vue-steve](http://volibearcat.top:4000)

## Dependencies

### [three.js](https://github.com/mrdoob/three.js)

## Props

| prop            | value                                             | default                |
| :-------------- | :------------------------------------------------ | :--------------------- |
| width           | 画布宽度                                          | 480                    |
| height          | 画布高度                                          | 640                    |
| pace            | 步伐距离 1 ~ 10                                   | 6                      |
| speed           | 速度 Number  -20 ~ 20                             | 2                      |
| rotationX       | 水平旋转 Number(deg)                              | 10                     |
| rotationY       | 垂直旋转 Number(deg)                              | 10                     |
| skinUrl         | 自定义皮肤<br>base64 or URL (32px*64px)           | steve-skin by base64   |
| scale           | 模型缩放 ≥ 0                                      | 1                      |
| followMouse     | 视线是否跟随鼠标 <br>"enable"\|"disable"           | "enable"               |
| followMouseMode | 视野跟随鼠标区域 <br>"window-scope"\|"box-scope"   | "window-scope"         |
| walkable        | 行走动作 <br>"enable"\|"disable"                   | "enable"              |
| throttle        | 节流时间(毫秒)                                     | 8                      |

## Interface

```
<Steve ref="mSteve"></Steve>

this.$refs.mSteve.rotateX(Number rotationX)

this.$refs.mSteve.rotateY(Number rotationY)

this.$refs.mSteve.setSpeed(Number speed)

this.$refs.mSteve.setPace(Number pace)

this.$refs.mSteve.setFollowMouse("enable" or "disable")

this.$refs.mSteve.setFollowMouseMode("window-scope" or "box-scope")

this.$refs.mSteve.setWalkable("enable" or "disable")

this.$refs.mSteve.setSkin(base64 or imageURL)

```