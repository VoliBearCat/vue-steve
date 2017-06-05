# vue-steve

> A Vue.js project, Minecraft's Steve-Model

## Demo

[vue-steve](http://volibearcat.top:4000)

## Usage

``` bash
npm install three --save
npm install vue-steve --save

import 'three'
import Steve from 'vue-steve'

export default {
    ...
    components:{
      Steve
    },
    ...
}

<steve skinUrl="./xxx.png" followMouseMode="window-scope"></steve>
```

## Dependencies

[three.js](https://github.com/mrdoob/three.js)

## Props

| key             | value                                             | default                |
| :-------------- | :------------------------------------------------ | :--------------------- |
| width           | 画布宽度                                          | 480                    |
| height          | 画布高度                                          | 640                    |
| pace            | 步伐距离 0 ~ 1                                    | 0.6                    |
| speed           | 速度 Number                                       | 2                      |
| rotationX       | 水平旋转 Number(deg)                              | 10                     |
| rotationY       | 垂直旋转 Number(deg)                              | 10                     |
| skinUrl         | 自定义皮肤 (32px*64px imageURL)                   | steve-skin by base64   |
| scale           | 模型缩放 ≥ 0                                      | 1                      |
| followMouse     | 视线是否跟随鼠标 "true"\|"false"                   | "true"                 |
| followMouseMode | 视野跟随鼠标区域 <br> "window-scope"\|"box-scope"  | "box-scope"            |
| walkable        | 行走动作 "true"\|"false"                          | "true"                 |

