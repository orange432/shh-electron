const { randomString } = require("../enigma")

describe("General functionality",()=>{
  test("randomString",()=>{
    expect(/[A-Za-z0-9]{34}$/.test(randomString(34))).toBeTruthy()
  })
})