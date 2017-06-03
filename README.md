# vue-steve

> A Vue.js project, Minecraft's Steve-Model

## Demo

[vue-steve](http://volibearcat.top:4000)

## Usage

``` bash
npm install vue-steve --save

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

## Props

| key             | value                                             | default                |
| :-------------- | :------------------------------------------------ | :--------------------- |
| width           | 画布宽度                                          | 480                    |
| height          | 画布高度                                          | 640                    |
| pace            | 步伐距离 0 ~ 1                                    | 0.6                    |
| cameraPosX      | 相机 X 轴位置 -3 ~ 3                              | 1.2                    |
| cameraPosY      | 相机 Y 轴位置 ≥ -2                                | 1                      |
| cameraPosZ      | 相机 Z 轴位置 3 ~ 10                              | 5                      |
| skinUrl         | 自定义皮肤 (32px*64px image) URL                  | steve-skin by base64   |
| scale           | 模型缩放 ≥ 0                                      | 1                      |
| followMouse     | 视线是否跟随鼠标 "true"\|"false"                   | "true"                 |
| followMouseMode | 视野跟随鼠标区域 <br> "window-scope"\|"box-scope"  | "box-scope"            |
| walkable        | 行走动作 "true"\|"false"                          | "true"                 |

