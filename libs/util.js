const createArray = len => Array.apply(null, Array(len))

const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min)

const characters = "AaBbC0cDdEe1FfGgH2hIiJj3KkLlM4mNnOo5PpQqR6rSsTt7UuVvW8wXxYy9Zz"
const randStr = len => createArray(len).map(() => characters.charAt(Math.floor(Math.random() * characters.length))).join("")

const arrayToVec3 = a => { return { x: a[0], y: a[1], z: a[2] } }

module.exports = {
  createArray,
  randInt,
  randStr,
  arrayToVec3
}
