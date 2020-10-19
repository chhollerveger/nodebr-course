const { deepStrictEqual, ok } = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = { nome: 'Flash', poder: 'Speed', id: 1 }
const DEFAULT_ITEM_ATUALIZAR = { nome: 'Lanterna Verde', poder: 'Energia do Anel', id: 2 }


describe('Suite de manipulação de herois', () => {

  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)

  })

  it('deve pesquisar um heroi usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const [result] = await database.listar(expected.id)
    deepStrictEqual(result, expected)
  })

  it('deve cadastrar um heroi usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const result = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
    
    deepStrictEqual(actual, expected)
  })

  it('deve remover um heroi pelo id', async () => {
    const expected = true;
    const result = await database.remover(DEFAULT_ITEM_CADASTRAR.id)

    deepStrictEqual(result, expected)
  })
  
  it('deve atualizar um heroi pelo id', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'Dinheiro'
    }
    const novoHeroi = {
      nome: 'Batman',
      poder: 'Dinheiro'
    }
    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoHeroi)
    const [result] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id) 

    deepStrictEqual(result, expected)
  })
})