function chooseAliens(alienData) {
    console.log('>>>>>>>>>>>>>>>',alienData)
    const spreadAlienData = [...alienData];
    const data = [];
    for (let i = 0; i < 10; i++) {
      let randomIndex = Math.floor(Math.random() * 10);
      data.push(spreadAlienData[randomIndex]);
      spreadAlienData.splice(randomIndex, 1);
    }
    return data;
  }
  module.exports = chooseAliens
  