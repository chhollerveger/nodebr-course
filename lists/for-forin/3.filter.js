const { getPessoas } = require('./service')

Array.prototype.meuFilter = function (callback) {
  const lista = []
  for (index in this) {
    const item = this[index]
    const result = callback(item, index, this)
    if(!result) continue;
    lista.push(item)
  }
  return lista;
}

async function main() {
  try {
    const {results} = await getPessoas(`a`)

    // const familiaLars = results.filter(function (item) {
    //   //naõ encontrou = -1 / encontrou = posicaoNoArray
    //   const result = item.name.toLowerCase().indexOf(`lars`) !== -1
    //   return result
    // })

    const familiaLars = results.meuFilter((item, index, lista) => {
      console.log(`index: ${index}`, lista.length)
      return item.name.toLowerCase().indexOf('lars') !== -1      
    })

    const names = familiaLars.map((pessoa) => pessoa.name)
    console.log(names)

  } catch (error) {
    console.error(`Deu ruim.`, error)
  }
}

main()
