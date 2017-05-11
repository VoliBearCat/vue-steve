<template>
  <div id="steve">
  
  </div>
</template>

<style type="text/css" scoped>
#steve {
  position: relative;
  display: inline-block;
}
</style>

<script>
var THREE = require('../../node_modules/three/build/three.min.js')
import steveJson from '../assets/steve'
export default {
  name: 'steve',
  props: {
    width: {
      default: 480,
      validator: (val) => val >= 0
    },
    height: {
      default: 640,
      validator: (val) => val >= 0
    },
    maxStep: {
      default: 0.6,
      validator: (val) => val >= 0 && val <= 1
    },
    cameraPosX: {
      default: -1.2,
      validator: (val) => val >= -3 && val <= 3
    },
    cameraPosY: {
      default: 1,
      validator: (val) => val >= -2
    },
    cameraPosZ: {
      default: 5,
      validator: (val) => val >= 3 && val <= 10
    },
    skinUrl: {
      default: "./static/char.png",
    },
    modelScale: {
      default: 1,
      validator: (val) => val > 0
    }
  },
  data() {
    return {
      renderer: '',
      camera: '',
      scene: '',
      light: '',
      modelUV: {},
      skin: '',
      parts: {},
      model: {},
      stepCycle: 0.02,
      stepDirection: 1,
      baseValue: 0,
      head_offset_x: 0,
      head_offset_y: 0,
      hover: false,
    }
  },
  mounted() {
    this.initThree()
    this.initCamera()
    this.initScene()
    this.initLight()
    this.initObject()
    setTimeout(() => {
      this.model.add(this.buildModel(steveJson))
      this.animation()
    }, 0)
  },
  methods: {
    initThree() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      this.renderer.setSize(this.width, this.height)
      document.getElementById('steve').appendChild(this.renderer.domElement)
      // this.renderer.setClearColor(0xFFFFFF, 0)
      // this.renderer.setClearAlpha(0)

      this.renderer.domElement.addEventListener('mousemove', (event) => {
        this.head_offset_x = event.offsetX / this.width * 1.6 - 1
        this.head_offset_y = event.offsetY / this.height * 0.6 - 0.2
        this.hover = true
      })
      this.renderer.domElement.addEventListener('mouseout', (event) => {
        this.hover = false
      })
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 100)
      this.camera.position.x = this.cameraPosX
      this.camera.position.y = this.cameraPosY
      this.camera.position.z = this.cameraPosZ
      this.camera.up.x = 0
      this.camera.up.y = 1
      this.camera.up.z = 0
      this.camera.lookAt({
        x: 0,
        y: 0,
        z: 0
      })
    },
    initScene() {
      this.scene = new THREE.Scene()
      this.scene.add(new THREE.AmbientLight(0xCCCCCC))
    },
    initLight() {
      this.light = new THREE.PointLight(0xFFFFFF)
      this.light.position.set(0, 3, 10)
      this.scene.add(this.light)
    },
    initObject() {
      var loader = new THREE.TextureLoader()
      this.skin = loader.load(this.skinUrl)
      this.skin.magFilter = THREE.NearestFilter
      this.skin.minFilter = THREE.NearestFilter

      this.modelUV.materials = [
        new THREE.MeshBasicMaterial({
          map: this.skin,
          side: THREE.DoubleSide,
          transparent: false,
          color: 0xFFFFFF
        }), new THREE.MeshBasicMaterial({
          map: this.skin,
          side: THREE.DoubleSide,
          transparent: true,
          color: 0xFFFFFF
        })
      ]
      this.modelUV.uRatio = 1 / 64
      this.modelUV.vRatio = 1 / 32
      this.modelUV.mapUV = (box, uv) => {
        var face, faceUV, i, u0, u1, v0, v1, _i, _ref1
        for (face = _i = 0; _i < 6; face = ++_i) {
          i = face * 4
          _ref1 = uv.slice(i, i + 4), u0 = _ref1[0], v0 = _ref1[1], u1 = _ref1[2], v1 = _ref1[3]
          faceUV = box.faceVertexUvs[0][face * 2]
          faceUV[0].set(u0 * this.modelUV.uRatio, v0 * this.modelUV.vRatio)
          faceUV[1].set(u0 * this.modelUV.uRatio, v1 * this.modelUV.vRatio)
          faceUV[2].set(u1 * this.modelUV.uRatio, v0 * this.modelUV.vRatio)
          faceUV = box.faceVertexUvs[0][face * 2 + 1]
          faceUV[0].set(u0 * this.modelUV.uRatio, v1 * this.modelUV.vRatio)
          faceUV[1].set(u1 * this.modelUV.uRatio, v1 * this.modelUV.vRatio)
          faceUV[2].set(u1 * this.modelUV.uRatio, v0 * this.modelUV.vRatio)
        }
      }
      this.modelUV.recenter = function (box, _arg) {
        var matrix, x, y, z
        x = _arg[0], y = _arg[1], z = _arg[2]
        matrix = new THREE.Matrix4()
        matrix.makeTranslation(-x, -y, -z)
        box.applyMatrix(matrix)
      }

      this.model = new THREE.Object3D()
      this.model.scale.set(0.1 * this.modelScale, 0.1 * this.modelScale, 0.1 * this.modelScale)
      this.scene.add(this.model)
    },
    animation() {
      this.tasks
      this.walk()
      this.followMouse()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animation)
    },
    walk() {
      this.armL_x = this.legR_x = this.legR_x = this.baseValue = this.baseValue + this.stepDirection * this.stepCycle
      this.armR_x = this.legL_x = -this.baseValue + this.stepDirection * this.stepCycle
      this.model.rotation.y = this.baseValue / 5
      this.head_y = this.baseValue / -8
      this.head_x = this.baseValue / 24
      if (Math.abs(this.baseValue) > this.maxStep) {
        this.stepDirection *= -1
      }
    },
    followMouse() {
      if (!this.hover) {
        if (this.head_offset_x > 0.01) this.head_offset_x -= 0.01
        else if (this.head_offset_x < -0.01) this.head_offset_x += 0.01
        if (this.head_offset_y > 0.01) this.head_offset_y -= 0.01
        else if (this.head_offset_y < -0.01) this.head_offset_y += 0.01
      }
      this.head_y = this.baseValue / -8 + this.head_offset_x
      this.head_x = this.baseValue / 24 + this.head_offset_y
    },
    loadSkin(url) {
      this.skin.image.src = url
    },
    buildModel(data) {
      var child, d, geometry, h, part, subdata, w, _i, _len, _ref1, _ref2, _ref3
      if (data.size) {
        _ref1 = data.size, w = _ref1[0], h = _ref1[1], d = _ref1[2]
        geometry = new THREE.BoxGeometry(w, h, d, 1, 1, 1)
        if (data.anchor != null) {
          this.modelUV.recenter(geometry, data.anchor)
        }
        if (data.uv != null) {
          this.modelUV.mapUV(geometry, data.uv)
        }
        part = new THREE.Mesh(geometry, this.modelUV.materials[+(!!data.transparent)])
      } else {
        part = new THREE.Object3D()
      }
      if (data.eulerOrder != null) {
        part.rotation.order = data.eulerOrder
      }
      if (data.children != null) {
        _ref2 = data.children
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          subdata = _ref2[_i]
          child = this.buildModel(subdata)
          part.add(child)
        }
        part.traverse((childPart) => {
          if (childPart.name) {
            Object.defineProperty(this, [childPart.name] + '_x', {
              set: function (x) {
                childPart.rotation.x = x
              },
              get: function () {
                return childPart.rotation.x
              }
            })
            Object.defineProperty(this, [childPart.name] + '_y', {
              set: function (y) {
                childPart.rotation.y = y
              },
              get: function () {
                return childPart.rotation.y || 0
              }
            })
            Object.defineProperty(this, [childPart.name] + '_z', {
              set: function (z) {
                childPart.rotation.z = z
              },
              get: function () {
                return childPart.rotation.z || 0
              }
            })
          }else{

          }
        })
      }
      if (data.name != null) {
        part.name = data.name
      }
      if (data.offset != null) {
        (_ref3 = part.position).set.apply(_ref3, data.offset)
      }
      return part
    }
  }
}
</script>
