function chooseAliens(alienData) {
  const spreadAlienData = [...alienData];
  const data = [];
  for (let i = 0; i < 24; i++) {
    let randomIndex = Math.floor(Math.random() * spreadAlienData.length);
    data.push(spreadAlienData[randomIndex]);
    spreadAlienData.splice(randomIndex, 1);
  }
  return data;
}
module.exports = chooseAliens;
