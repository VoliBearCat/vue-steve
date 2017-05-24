# vue-steve

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

| key           | value         | default  |
| ------------- |:-------------:| --------:|
| width         | 画布宽度       |   480    |
| height        | 画布高度       |   640    |
| maxStep       | 步伐距离 0 ~ 1 |   0.6    |
| cameraPosX    | 相机 X 轴位置 -3 ~ 3 |1.2 |
| cameraPosY    | 相机 Y 轴位置 ≥ -2   | 1  |
| cameraPosZ    | 相机 Z 轴位置 3 ~ 10 | 5  |
| skinUrl       | 自定义皮肤 URL  | "./static/char.png" |
| modelScale    | 模型缩放 ≥ 0    |   1     |

## refer to
[erisdev/steve.js](https://github.com/erisdev/steve.js)

