const express = require('express')
const rotas = express()
 const knex = require('./bancodedados/conexao');
 const multer = require('multer');
 const upload = multer();
 const {Readable} =  require('stream')
const readline = require('readline')



 rotas.post('/import', upload.single('file'), async (req, res) => {
    const {file} = req;
    const {buffer} = file
  
    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);
  
    const productLine = readline.createInterface({
      input: readableFile
    })

   
    
   
  const bd = []
  
    for await(let line of productLine){
      const lineSplit = line.split(';')

    
      
      bd.push({
        nome_sacado: lineSplit[0],
        unidade: lineSplit[1],
        valor: Number(lineSplit[2]),
        linha_digitavel: lineSplit[3]
      })
    }
  for await(let {nome_sacado, unidade, valor, linha_digitavel} of bd){
  try {
    const produto = await knex('boletos').insert({
    nome_sacado,
    valor,
    linha_digitavel
  }).returning('*')
  
    return res.status(200).json(produto);
  } catch (error) {
    return res.status(400).json(error.message);
  }
  
  }
  
  return res.send(bd)
  
    
     });
module.exports = rotas
