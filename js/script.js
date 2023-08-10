import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
const camposDoFormulario = document.querySelectorAll("[required]"); // tudo que está com o atributo required no HTML
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => { 
    e.preventDefault(); 

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas)); // armazenamento local, converte objeto em JSON

    window.location.href = './abrir-conta-form-2.html'; // redireciona para a próxima parte do formulário
})

camposDoFormulario.forEach ((campo) => { // forEach = para cada elemento daquela lista, cada campo vai ser chamado de "campo"
    campo.addEventListener("blur", () => verificaCampo(campo)) // fica "ouvindo"/esperando algo acontecer, que nesse caso seria o blur (quando deixamos de selecionar um elemento, clicamos fora do input)
    campo.addEventListener("invalid", evento => evento.preventDefault()); // retirou o pop-up padrão de "Preencha este campo", o objetivo é personalizar do 0
} )

const tiposDeErro = [
    'valueMissing', // campo vazio
    'typeMismatch', // quando o dado não está de acordo com o tipo, inserção de um e-mail sem o símbolo @
    'patternMismatch', // ocorre especialmente no campo de CPF que possui um padrão de expressão regular
    'tooShort', // relacionado aos atributos minlength e maxlength
    'customError' // erros customizados, como nos casos em que inserimos as lógicas de validação ehUmCPF e ehMaiorDeIdade
]

const mensagens = {
    nome: { // objeto que recebe vários objetos
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo (campo) {
    let mensagem = "";
    campo.setCustomValidity(''); // caso o usuário preencha um valor errado e substituia por um valor correto, a mensagem de erro desaparece
    if(campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }
    if(campo.name == "aniversario" && campo.value != "") { // se o campo for data de nascimento E se não estiver vazio
        ehMaiorDeIdade(campo);
    }
    tiposDeErro.forEach(erro => {
        if(campo.validity[erro]) { // verifica se para cada campo há "true" em validity, ou seja, se existe algum erro
            mensagem = mensagens[campo.name][erro]; // recebe mensagem condizente ao tipo de erro
            console.log(mensagem);
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro'); // mensagem-erro: class no HTML, pega só um span do input mais próximo, não seleciona todos
    const validadorDeInput = campo.checkValidity(); // checa se o campo está válido

    if(!validadorDeInput) { // se não estiver válido...
        mensagemErro.textContent = mensagem;
    } else { 
        mensagemErro.textContent = "";
    } 
} 