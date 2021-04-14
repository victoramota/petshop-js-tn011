const moment = require('moment');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => res.send('Olá Mundo!'));
app.get('/contatos', (req, res) => res.send({nome:'Victor', idade: '35',}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'))
});


// Criando Servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));



const nomeArquivo = "pets.json";
const nomePetshop = "Petshoperson";

let petsJSON = fs.readFileSync(nomeArquivo); // Lê conteúdo do arquivo
let arquivoPets = JSON.parse(petsJSON); // Converte para o formato JS

//console.log(arquivoPets.pets);

const atualizarJson = () => {
    let listaJson = JSON.stringify(arquivoPets, null, 2); // objeto para converter, null para não minificar, 2 para numero de linhas - Converte objeto literal para JSON 
    fs.writeFileSync(nomeArquivo, listaJson, 'utf-8'); //caminho arquivo, conteúdo novo, formato
}

const adicionarPet = (infoPet) => {
    arquivoPets.pets.push(infoPet);
    atualizarJson();

    console.log(`${infoPet.nome} foi cadastrado no nosso sistema!`)
};

const listarPet = (listaDePets) => {
    for (let i = 0; i < listaDePets.length; i++){
        console.log(`${listaDePets[i].nome}, ${listaDePets[i].idade}, ${listaDePets[i].raca}, ${(listaDePets[i].vacinado) ? 'vacinado' : 'não vacinado'}, ${listaDePets[i].genero}`);

        for (let iServicos = 0; iServicos < listaDePets[i].servicos.length; iServicos++) {
            console.log(`${listaDePets[i].servicos[iServicos].nome} - ${listaDePets[i].servicos[iServicos].data}`);
        }
    }
}

const vacinarPet = (pet) => {
    if (!pet.vacinado) {
        pet.vacinado = true;
        atualizarJson();
        console.log(`${pet.nome} foi vacinado com sucesso!`);
    } else {
        console.log(`${pet.nome} já está vacinado!`);
    }
}

const campanhaVacina = (listaPets) => {
    let totalVacinados = 0;
    for (let i = 0; i < listaPets.length; i++) {
        if(!listaPets[i].vacinado) {
            listaPets[i].vacinado = true;
            totalVacinados++;
        }
        
    }
    atualizarJson();

    console.log(`Parabéns, ${totalVacinados} pets foram vacinados nessa campanha`);
};

const darBanhoPet = (pet) => {
    pet.servicos.push({
        nome: 'banho',
        data: moment().format('DD-MM-YYYY')
    });
    atualizarJson();
    console.log(`${pet.nome} está cheirosx!`)
}

const tosarPet = (pet) => {
    pet.servicos.push({
        nome: 'tosa',
        data: moment().format('DD-MM-YYYY')
    });
    atualizarJson();
    console.log(`${pet.nome} está com cabelinho na régua`)
}

const apararUnhasPet = (pet) => {
    pet.servicos.push({
        nome: 'corte de unhas',
        data: moment().format('DD-MM-YYYY')
    });
    atualizarJson();
    console.log(`${pet.nome} está de unhas aparadas!`)
}

const buscarPet = (nomePet) => {
    const petEncontrado = arquivoPets.pets.find((pet) => {
        return pet.nome == nomePet;
    });

    console.log(petEncontrado ? petEncontrado : `Nenhum pet encontrado com o nome ${nomePet}`);
}

const atenderCliente = (pet, servico) => {
    console.log(`Olá, ${pet.nome}`);
    servico(pet);
    console.log('Até Mais!');
}

const addInfoCastrado = () => {
    arquivoPets.pets = listaPets.map((pet) => {
        pet.castrado = true;
        return pet;
    })
    atualizarJson();
}

const listarVacinados = () => {
    console.log('** VACINADO **');
    let = totalVacinado = 0;
    let vacinados = arquivoPets.pets.filter((pet) => {
        return pet.vacinado;
    });

    console.log(vacinados);
    console.log(`Temos ${vacinados.length} pets vacinados`);
}

/*
listarVacinados();
buscarPet("Jaçom");
atenderCliente(arquivoPets.pets[0], tosarPet);
buscarPet("Jaçom");
campanhaVacina(arquivoPets.pets)
listarPet(arquivoPets.pets);
darBanhoPet(arquivoPets.pets[0])
tosarPet(arquivoPets.pets[0])
apararUnhasPet(arquivoPets.pets[0])
*/
