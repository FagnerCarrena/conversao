// const knex = require('../bancodedados/conexao');

// const  cadastrarBoleto = async(req, res) => {

//     const { nome_sacado,id_lote, valor, linha_digitavel,  criado_em} = req.body;
//     console.log(req.body);
    
//     try {
//         // const UsuarioEncontrado = await knex('usuarios').where({ email }).first();

//         // if (UsuarioEncontrado) {
//         //     return res.status(400).json({mensagem: "O usuario ja existe"});
//         // }

    

//         const usuario = await knex('boletos')
//             .insert({
//                 nome_sacado,
//                 id_lote, valor, linha_digitavel, criado_em
//             }).returning('*');

// //o returning retorna um array, por isso pegamos o do indice [0]
//         return res.status(201).json(usuario[0]);

//     } catch (error) {
//         return res.status(400).json(error.message);
//     }
  

        
   

// }

// module.exports = {
// cadastrarBoleto

// }