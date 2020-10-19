const util = require('util')
const getEnderecoAsync = util.promisify(getEndereco)

function getUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: "Peter Parker",
        dataNascimento: new Date()
      })
    }, 1000);    
  })
}

function getTelefone(idUsario) {
  return new Promise(function resolveTelefone(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "999999999",
        ddd: 51
      })
    }, 2000);
  })
  
}

function getEndereco(idUsario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "Avenida AJ Renner",
      numero: 1903
    })
  }, 2000);  
}

main()
async function main () {
  try {
    const usuario = await getUsuario()
    // const telefone = await getTelefone(usuario.id)
    // const endereco = await getEnderecoAsync(usuario.id)
    const result = await Promise.all([
      getTelefone(usuario.id),
      getEnderecoAsync(usuario.id)
    ])
    const endereco = result[1]
    const telefone = result[0]

    console.log(`
      Nome: ${usuario.nome}
      Telefone: (${telefone.ddd}) ${telefone.telefone}
      Endereco: ${endereco.rua}, ${endereco.numero}    
    `)
  } catch (error) {
    console.error("Deu ruim.", error)
  }
}

/*Segunda chamada

const usuarioPromise = getUsuario()

usuarioPromise
  .then(function (usuario) {
    return getTelefone(usuario.id)
      .then(function resolveTelefone(result) {
        return {
          usuario: {
            nome: usuario.nome,
            id: usuario.id
          },
          telefone: result
        }
      })
  })
  .then(function (resultado) {
    const endereco = getEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolveEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      }
    })
  })
  .then(function (resultado) {
    console.log(`
      Nome: ${resultado.usuario.nome}
      Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
      Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
    `)
  })
  .catch(function (error) {
    console.error("Deu Ruim.", error);
  })
  */

/*Prieira chamada

getUsuario(function resolveUsuario(error, usuario) {
  if(error) {
    console.error("Usuário não encontrado.", error)
    return;
  }

  getTelefone(usuario.id, function resolveTelefone(error1, telefone) {
    if(error1) {
      console.error("Telefone não encontrado.", error)
      return;
    }

    getEndereco(usuario.id, function resolveEndereco(error2, endereco) {
      if(error2) {
        console.error("Endereço não encontrado.", error)
        return;
      }

      console.log(`
        Nome: ${usuario.nome}
        Endereco: ${endereco.rua}, ${endereco.numero}
        Telefone: ${telefone.ddd}, ${telefone.telefone}
      `)
    })

  })
})
*/
