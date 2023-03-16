const grpc = require('grpc'); 
const PROTO_PATH = '../notes.proto'; // Estamos passando o endereço do arquivo .proto
const MMC = grpc.load(PROTO_PATH).MMC

const client = new MMC('localhost:30031', // Criando uma chamada com o server
    grpc.credentials.createInsecure());
    
module.exports = client;