var grpc = require('@grpc/grpc-js'); // Chamada do pacote ‘grpc’
var protoLoader = require('@grpc/proto-loader'); // Chamada do pacote proto-loader’, que irá ler o arquivo .proto
const PROTO_PATH = '../model.proto'; // Guarda o endereço do arquivo .proto

var packageDefinition = protoLoader.loadSync(PROTO_PATH); // Lê o arquivo .proto
var model_proto = grpc.loadPackageDefinition(packageDefinition).model; // Lê o arquivo .proto

const main = () => { // Função main para executar o client
    const client = new model_proto.MMC('localhost:30031', grpc.credentials.createInsecure()); // Cria uma chamada com o servidor
    
    let args = process.argv.slice(2); // Args irá identificar os números digitados pelo usuário depois do comando "node client-grpc.js"
    let argumentos = { primeiro: Number(args[0]), segundo: Number(args[1]) } // Objeto "argumentos", com os números do client

    client.calculandoMMC(argumentos, (error, response) => { // Chamada do metodo RPC calculandoMMC
        if (error) { // Se voltar um arro do callback
            console.log(error); // Mostra na tela o erro
        } else { // Senão tiver erro
            console.log('O MMC é ' + response.resultado); // Printa o resultado do MMC
        }
    })
}

main(); // Executa a função main