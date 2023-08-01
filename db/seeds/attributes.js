const attributes = {
    skinColour: ["blue", "purple", "green"],
    horns: [0, 2, 4],
    eyes: [1, 2, 3, 4, 5],
    eyeColour: ["red", "yellow", "orange"],
    hasAntenna: [true, false],
    isFriendly: [true, false],
    skinTexture: ["furry", "scaly", "normal"],
    planet: ["desert", "ice", "lava"],
    isActive: [true]
  };

  const testAttributes = {
    skinColour: ["blue", "purple"],
    horns: [0, 2],
    eyes: [1, 2],
    eyeColour: ["red", "green"],
    hasAntenna: [true, false],
    isFriendly: [true, false],
    skinTexture: ["furry"],
    planet: ["desert"],
    isActive: [true]
  };

  module.exports = { attributes, testAttributes }