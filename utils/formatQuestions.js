const formatQuestions = (attribute, variation) => {
    let question = ""

    // first word
    if (attribute === "isFriendly" || attribute === "planet") question += "a "
    else if (variation === "ice") question += "an "
    else if ((attribute === "hasAntenna" || attribute === "horns") && !variation) question += "no "

    // variation
    if (variation !== 0 && attribute !== "hasAntenna" && attribute !== "isFriendly") question += variation + " "

    // attribute
    if (attribute === "skinColour") question += "skin"
    else if (attribute === "eyeColour") question += "eyes"
    else if (attribute === "hasAntenna") question += "antenna"
    else if (attribute === "isFriendly") question += `${variation ? "friendly" : "scary"} face`
    else if (attribute === "skinTexture") question += "skin"
    else question += attribute
    
    return question + "?"
}

module.exports = formatQuestions