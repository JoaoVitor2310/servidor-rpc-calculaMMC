var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = '../notes.proto'; // Estamos passando o endereço do arquivo .proto

var packageDefinition = protoLoader.loadSync(PROTO_PATH);
var notes_proto = grpc.loadPackageDefinition(packageDefinition).notes;

// const MMC = grpc.load(PROTO_PATH).MMC

const main = () => {
    console.log('main');
    const client = new notes_proto.MMC('localhost:30031', grpc.credentials.createInsecure()); // Criando uma chamada com o server

    let args = process.argv.slice(2);
    // console.log(args[0], args[1]);
    let argumentos = { primeiro: Number(args[0]), segundo: Number(args[1]) }
    console.log(argumentos);
    // const client = require('./client-grpc'); // Importando o modulo criado no passo anterior

    client.calculandoMMC(argumentos, (error, response) => { // Chamando o metodo List RPC e retornando os dados no console
        console.log('client calculando mmc');
        if (error) {
            console.log(error);
        } else {
            console.log(response.resultado);
        }
    })
}

main();


