const client = require('./client-grpc'); // Importando o modulo criado no passo anterior

client.numeros({}, (error, variaveis) => { // Chamando o metodo List RPC e retornando os dados no console
    if (!error) {
        console.log(variaveis);
    } else {
        console.error(error);
    }
})