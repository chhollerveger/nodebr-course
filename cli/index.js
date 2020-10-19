const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
  Commander
  .version('v1')

  .option('-n, --nome [value]', "Nome do Heroi")
  .option('-p, --poder [value]', "Poder do Heroi")
  .option('-i, --id [value]', "Id do Heroi")


  .option('-c, --cadastrar [value]', "Cadastrar um Heroi")
  .option('-l, --listar [value]', "Listar um Heroi")
  .option('-r, --remover', "Remove um Heroi pelo id")
  .option('-a, --atualizar [value]', "Atualizar um Heroi pelo id")



  
  .parse(process.argv)

  const heroi = new Heroi(Commander)

  try {

    if(Commander.cadastrar) {
      delete heroi.id
      const result = await Database.cadastrar(heroi)
      if(!result) {
        console.error('Heroi não foi cadastrado!')
        return;
      }
      console.log('Heroi cadastrado com sucesso!')
    }

    if(Commander.listar) {
      const result = await Database.listar()
      console.log(result)
      return;
    }

    if(Commander.remover) {
      const result = await Database.remover(heroi.id)
      if(!result) {
        console.error("Não foi possivel remover o heroi.")
        return;
      }
      console.log('Heroi removido com sucesso!')
    }

    if(Commander.atualizar) {
      const idParaAtualizar = parseInt(Commander.atualizar)
      const dado = JSON.stringify(heroi)
      const heroiAtualizar = JSON.parse(dado)
      const result = await Database.atualizar(idParaAtualizar, heroiAtualizar)
      if(!result) {
        console.error("Não foi possivel atualizar o heroi.")
        return;
      }
      console.log('Heroi atualizado com sucesso!')
    }

  } catch (error) {
    console.error('Deu ruim.', error)
  }
}

main()