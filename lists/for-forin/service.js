const axios = require('axios')
const URL = `https://swapi.co/api/people`

async function getPessoas(nome) {
  const url = `${URL}/?search=${nome}&format=json`
  const response = await axios.get(url)
  return response.data
}

getPessoas()
  .then(function (result) {
    // console.log('resultado', result)
  })
  .catch(function (error) {
    console.error('Deu ruim.', error)
  })

  module.exports = { getPessoas }