<template>
  <div class="steve-container">
  </div>
</template>

<style>
.steve-container {
  position: relative;
  display: inline-block;
}
</style>

<script>
var THREE = require('three')
// import 'three'
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
    pace: {
      default: 0.6,
      validator: (val) => val >= 0 && val <= 1
    },
    speed: {
      default: 2
    },
    rotationX: {
      default: 10
    },
    rotationY: {
      default: 10
    },
    skinUrl: {
      default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABONJREFUaEPll99rVEcUx6+IUk1ijbQYosYfG+OaRtb4g2JEY42/EYuRipqioqIxMQiLVlDE+INqKlSfAkq0UChIUXzwFyL2sU956X9TmofjfM/u9/ZknLs30cUN8cJh5s6cuTvfz5w5MzslSnmaF9QIXP4bGYmmT5um3qjjGfl3arT/28aSX7j9+p8pab8xofsBoLHuC8kt/FKN72iDnd+ek55NK+XnfWviEnW0wya0uLFMDoIpvql+ZiKATCYj1gBlUgDg6nPlURIKSkbApAVgxSICYHY7fBYAAMEXz3yQBKAz2zQ5tgDFQ/Dy+dUKYuHsqjghEgD2vG+TIgcAAIUzCpgMmQOY8UPlWBJtRX2y82YKDKKWzatSsasys2XFooLlFtXINw2FkyA7v0qPPviiDQDohzEYi2+gn99l0sQ4W8c7Iqmi4vHjFgAm3tIwS4VA4OrGWi1peN/cPEfam79WPwChD8agjVFiAZS6R1QcgE66rrBqBeFOmFvFxjq+18jLgTPy9te8/D3YL29v5139nDz+6ZCsWTpHx8AXYzA23i7um/h22j2i4gB0pepdKC+YVVhV944wRj23pFb+vHxSnt/o0/JJf58M5X+UNwN5GTq9Ww0+8MUYjEUd38I38Z52j5gYAOI8UC2ZuTPk5oE2GTq+VdqyX6l4PJ0bBuTFpVMqHnU8gAIf+GIMxjbVV8f7HwDS7hETB4BbMWyFloZaudHZKoNHvpNbh9Y5cdvk2aVj8upaPj7m/rp1Rn7v2S797s4PH/hiDMbiG1x9Aih1j6g4AIY9wvZYR04e9Hwv949v0T83ONbuHu5wAjfJhc1rR9mdwxvl6r516gNfjMFYfEO3QHE7pN0jKg4Ak6cAlEOnduiK/nJwvZzbkZOzW1ukr6NZxcIu7lkt139Yr4Y6fOD7W/dOHXv/xK5CWYRIkPYOgTrBVRyAP4H9O4fFWjabFWupEx4ejv8K+xejyPVFR4+WtrQfePRI9DswV8ftc2/r0rhMG57aXw4AoWsx2soCgOKL5ecNwEWAXX2F/LFPOSIg6b9BWSLA2wIfDWBlNi+wpsVdWm5r+2OU2T6/v611QKIrV/63ri6J7t2T6OFDTZg4Kpk80aZm/VFHG0TRnj6VCMb3JH/6+P0czzItIijwQwAAlgrq7i4Y6px4EQIAqEhOyPpjDPz9SVsA/Da/zz6UBGp//0MBMBLGEwEKIDRBThITRERYkdYf9ZB4GwUhwHaM3//JASDsKQp1OwECsG1J/gBFcLbuC7TR9KkiwOYB7HtrKh6iaJg8BUAQ62y3vgSGCAkBcONxKaPddJcv/P+whjbr4/enpYAolOQoECHu54j3AFhBgGEBhIRZYNwCoTHFbRMCMHi2K4aAfguhLABsHih1CsQ5gBAIgCFv9z9hEAC3jQ175goDxIpjBBAAyhAAbS9CGlMEMAGO9xgMngJ++FMUAfinQAhWAgCItSvsAwhtkbIAKAXovWPQJjz/BMB7Wtb2sjgjgGUIQKkckQqgvb1dYKWOQfTRr7e3V6zFgngh4er54c+E6AOw/vQxCdGK8yMAMGyOYL/dImMGkCSQ7Un9NkfgMuXfI/CuN0YDAH724sXEqveFIhC0YWwSAIoMRUjFAIRyCIEoBCcu9WrtfCxEf4VHJUCX6ELH4HgAvAMPTt9mhQSK5wAAAABJRU5ErkJggg==",
    },
    scale: {
      default: 1,
      validator: (val) => val > 0
    },
    followMouse: {
      default: "true",
      validator: (val) => ~['true', 'false'].indexOf(val)
    },
    followMouseMode: {
      default: "box-scope",
      validator: (val) => ~['box-scope', 'window-scope'].indexOf(val)
    },
    walkable: {
      default: "true",
      validator: (val) => ~['true', 'false'].indexOf(val)
    },
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
      stepDirection: 1,
      baseValue: 0,
      head_offset_x: 0,
      head_offset_y: 0,
      hover: false,
      tempX: 0,
      tempY: 0,
      throttleSwich: true
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
      this.model.rotation.y = this.rotationX / 180 * Math.PI
      this.model.rotation.x = this.rotationY / 180 * Math.PI
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
      this.$el.appendChild(this.renderer.domElement)
      // this.renderer.setClearColor(0xFFFFFF, 0)
      // this.renderer.setClearAlpha(0)

      if (this.followMouse == "true" && this.followMouseMode == "window-scope") {
        document.addEventListener('mousemove', (event) => {
          if (this.throttleSwich) {
            this.throttleSwich = false
            setTimeout(() => {
              this.throttleSwich = true
            }, 5)
          } else {
            return
          }
          var rect = this.$el.getBoundingClientRect()
          var marginLeft = rect.left + this.width / 2
          var offsetX = event.clientX - marginLeft
          var marginTop = rect.top + this.height / 3
          var offsetY = event.clientY - marginTop
          this.tempX = this.head_offset_x
          this.tempY = this.head_offset_y
          var offsetDegressX = this.rotationX / 180 * Math.PI
          var offsetDegressY = this.rotationY / 360 * Math.PI
          if (offsetX === 0) {
            this.tempX = -offsetDegressX
          }
          else if (Math.abs(offsetX) <= 500) {
            this.tempX = offsetX / 500 * 0.6 - offsetDegressX
          }
          else if (Math.abs(offsetX) <= 1000) {
            this.tempX = (offsetX > 0 ? 0.5 : -0.5) + offsetX / 5000 - offsetDegressX
          }
          else if (Math.abs(offsetX) <= 2000) {
            this.tempX = (offsetX > 0 ? 0.6 : -0.6) + offsetX / 10000 - offsetDegressX
          }
          else {
            this.tempX = (offsetX > 0 ? 0.8 : -0.8) - offsetDegressX
          }

          if (offsetY === 0) {
            this.tempY = 0.1 - offsetDegressY
          }
          else if (Math.abs(offsetY) <= 300) {
            this.tempY = offsetY / 1500 + 0.1 - offsetDegressY
          }
          else if (Math.abs(offsetY) <= 900) {
            this.tempY = (offsetY > 0 ? 0.2 : offsetY / 6000 + 0.05) + offsetY / 3000 - offsetDegressY
          }
          else {
              this.tempY = (offsetY > 0 ? 0.5 : -0.4) - offsetDegressY
          }

          if (Math.abs(this.tempX) > Math.PI / 3 || this.tempY > Math.PI / 5 || this.tempY < -Math.PI / 5) this.hover = false
          else {
            this.hover = true
          }

        })
      } else if (this.followMouse == "true" && this.followMouseMode == "box-scope") {
        this.renderer.domElement.addEventListener('mousemove', (event) => {
          if (this.throttleSwich) {
            this.throttleSwich = false
            setTimeout(() => {
              this.throttleSwich = true
            }, 5)
          } else {
            return
          }
          var offsetX = event.offsetX
          var offsetY = event.offsetY
          this.tempX = this.head_offset_x
          this.tempY = this.head_offset_y
          if (offsetX === 0) {
            this.tempX = -this.rotationX / 180 * Math.PI
          }
          else if (Math.abs(offsetX) <= this.width) {
            this.tempX = 2 * (offsetX - this.width / 2) / this.width * 0.8 - this.rotationX / 180 * Math.PI
          }
          else {
            this.tempX = 0
          }

          if (offsetY === 0) {
            this.tempY = 0.1 - this.rotationY / 360 * Math.PI
          }
          else if (Math.abs(offsetY) <= this.height) {
            this.tempY = 2 * (offsetY - this.height / 3) / this.height * 0.5 + 0.1 - this.rotationY / 360 * Math.PI
          }
          else {
            this.tempY = 0
          }
          if (Math.abs(this.tempX) > Math.PI / 3 || this.tempY > Math.PI / 5 || this.tempY < -Math.PI / 5) this.hover = false
          else {
            this.hover = true
          }
        })
      }

      this.renderer.domElement.addEventListener('mouseout', (event) => {
        this.hover = false
      })
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 100)
      this.camera.position.x = 0
      this.camera.position.y = 0
      this.camera.position.z = 5
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
      this.model.scale.set(0.1 * this.scale, 0.1 * this.scale, 0.1 * this.scale)
      this.scene.add(this.model)
    },
    animation() {
      this.tasks
      this.walkAction()
      this.followMouseAction()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animation)
    },
    walkAction() {
      if (this.walkable !== "true") return;
      this.armL_x = this.legR_x = this.legR_x = this.baseValue = this.baseValue + this.stepDirection * this.speed / 100
      this.armR_x = this.legL_x = -this.baseValue + this.stepDirection * this.speed / 100
      this.model.rotation.y = this.model.rotation.y + this.baseValue / 400
      this.head_y = this.baseValue / -8
      this.head_x = this.baseValue / 24
      if (Math.abs(this.baseValue) > this.pace) {
        this.stepDirection *= -1
      }
    },
    followMouseAction() {
      if (this.followMouse !== "true") return;
      if (!this.hover) {
        if (this.head_offset_x > 0.01) this.head_offset_x -= 0.01
        else if (this.head_offset_x < -0.01) this.head_offset_x += 0.01
        if (this.head_offset_y > 0.01) this.head_offset_y -= 0.01
        else if (this.head_offset_y < -0.01) this.head_offset_y += 0.01
      } else {
        if (this.head_offset_x - this.tempX > 0.2) this.head_offset_x -= 0.08
        else if (this.head_offset_x - this.tempX < -0.2) this.head_offset_x += 0.08
        else this.head_offset_x = this.tempX
        if (this.head_offset_y - this.tempY > 0.2) this.head_offset_y -= 0.08
        else if (this.head_offset_y - this.tempY < -0.2) this.head_offset_y += 0.08
        else this.head_offset_y = this.tempY
        // this.head_offset_x = this.tempX
        // this.head_offset_y = this.tempY
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
            Object.defineProperties(this, {
              [childPart.name + '_x']: {
                set: function (x) {
                  childPart.rotation.x = x
                },
                get: function () {
                  return childPart.rotation.x
                }
              },
              [childPart.name + '_y']: {
                set: function (y) {
                  childPart.rotation.y = y
                },
                get: function () {
                  return childPart.rotation.y || 0
                }
              },
              [childPart.name + '_z']: {
                set: function (z) {
                  childPart.rotation.z = z
                },
                get: function () {
                  return childPart.rotation.z || 0
                }
              }
            })
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
