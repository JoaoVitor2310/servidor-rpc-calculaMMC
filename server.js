var grpc = require('@grpc/grpc-js'); // Chamada do pacote ‘grpc’
var protoLoader = require('@grpc/proto-loader'); // Chamada do pacote proto-loader’, que irá ler o arquivo .proto
const PROTO_PATH = './model.proto'; // Guarda o endereço do arquivo .proto

var packageDefinition = protoLoader.loadSync(PROTO_PATH); // Lê o arquivo .proto
var model_proto = grpc.loadPackageDefinition(packageDefinition).model; // Lê o arquivo .proto

let calculaMMC = (call) => { // Função que irá calcular o MMC
    const var1 = call.request.primeiro; // Identifica os números enviados pelo usuário e armazena em var1 e var2
    const var2 = call.request.segundo;
    let mmc = 1; // Variável que irá identificar o MMC, começa em 1.
    
    while (!(eh_multiplo(mmc, var1) && (eh_multiplo(mmc, var2)))) { // Enquanto a variável mmc não for múltiplo dos 2 números
        mmc++; // Soma mais 1 e tenta de novo
    }

    return mmc; // Retorna o mmc identificado
}

let eh_multiplo = (var1, var2) => { // Função auxiliar que irá identificar se o número é múltiplo
    return var1 % var2 === 0; // Um número é múltiplo quando o resto da divisão é 0
}

let calculandoMMC = (call, callback) => { // Função de callback recebida do client, recebe os números digitados pelo usuário
    callback(null, {resultado: calculaMMC(call)}); // O callback de erro será null e o resultado virá da função calculaMMC
}

const server = new grpc.Server(); //Criação do server gRPC

server.addService(model_proto.MMC.service, {calculandoMMC: calculandoMMC}); //Adiciona o serviço MMC criado no arquivo .proto
server.bindAsync('127.0.0.1:30031', grpc.ServerCredentials.createInsecure(), () => { // Inicia o servidor
    console.log('Servidor rodando em http://127.0.0.1:30031'); // Porta que o servidor usará
    server.start(); // Instância do servidor
});