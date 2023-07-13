const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const {Readable} =  require('stream')
const readline = require('readline')
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '123456',
    database: 'financeiro',
  },
});

const app = express();
const upload = multer();

app.post('/import', upload.single('file'), async (req, res) => {
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
  ativo: true,
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
   

 

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
