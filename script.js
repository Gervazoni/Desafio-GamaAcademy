//CPF
function validaCPF(cpf) {
    if (cpf.length != 11) {
        return false;
    }
    else {
        var numeros = cpf.substring(0, 9);
        var digitos = cpf.substring(9);
        var soma = 0
        for (var i = 10; i > 1; i--){
            soma += numeros.charAt(10 - i) * i;
        }
        var resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(0)) {
            return false;
        }
        soma = 0;
        numeros = cpf.substring(0, 10);
        for (var k = 11; k > 1; k--){
            soma += numeros.charAt(11 - k) * k;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
         
        if (resultado != digitos.charAt(1)) {
            return false;
        }
        return true;
    };
}

function validacaoCPF() {   
    var cpf = document.getElementById('cpf').value;
    var resultadoValidacao = validaCPF(cpf); 
    
    if (!resultadoValidacao) {
        document.getElementById('erroCPF').style.display='block';
        return false;
    } 
    else {
        document.getElementById('erroCPF').style.display='none';
        return true;
    }
}
document.getElementById('cpf')
        .addEventListener('focusout', validacaoCPF);

}

//CEP
const preencherForm = (logradouro) =>{
    document.getElementById('logradouro').value = logradouro.logradouro;
    document.getElementById('bairro').value = logradouro.bairro;
    document.getElementById('cidade').value = logradouro.localidade;
    document.getElementById('uf').value = logradouro.uf;
}

const limpaForm = (logradouro) =>{
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep); 
const pesquisarCep = async() => {
    limpaForm();
    
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const logradouro = await dados.json();
        if (logradouro.hasOwnProperty('erro')){
            document.getElementById('logradouro').value;
            alert('CEP inexistente, verifique e tente novamente.');
        }else {
            preencherForm(logradouro);
        }
    }else{
        document.getElementById('logradouro').value;
        alert('CEP no formato incorreto, digite apenas números.')
    }    
}
document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep);

//FORM
const formularioDb = () => {
    let form = {
        nome: document.getElementById('nome').value,
        cargo: document.getElementById('cargo').value,
        cargo: document.getElementById('formacao').value,
        data: document.getElementById('data').value,
        civil: document.getElementById('civil').value,
        genero: document.getElementById('genero').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('estado').value,
        telefone: document.getElementById('telefone').value,
        celular: document.getElementById('celular').value,
        email: document.getElementById('email').value,
        identidade: document.getElementById('identidade').value,
        orgao: document.getElementById('orgao').value,
        cpf: document.getElementById('cpf').value,
        veiculo: document.getElementById('veiculo').value,
        cnh: document.getElementById('cnh').value,
    };
    console.log(form);
    return form
}

const criarCandidato = async (candidato) => {
    const usuario = await fetch('https://jobsnet-desafio-gamaacademy.netlify.app/ ', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formularioDb())
        });
        if (usuario.status === 200) {
            alert('Seu cadastro foi concluído!');
        }
        if (usuario.status === 500) {
        alert('Erro: CPF ou e-mail já cadastrado.');
    }
}

//CHECK
function checagem() {
    let email = document.getElementById('email').value;

    if (email == false || validacaoCPF() == false) {
        alert('Por gentileza, preencher os campos corretamente e tentar novamente o envio do formulário.');
    } else {
        criarCandidato();
        alert('Deseja enviar o formulário? Clique OK para prosseguir.');
    }
}
