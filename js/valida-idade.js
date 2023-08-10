export default function ehMaiorDeIdade (campo) {
    const dataNascimento = new Date(campo.value); // converte a data de nascimento do HTML para uma maneira que o JS entende
    if(!validaIdade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade');
    }
}

function validaIdade (data) {
    const dataAtual = new Date(); // recebe data do momento atual
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate()); // recebe todas as informações sobre data de nascimento e adiciona + 18 anos

    return dataAtual >= dataMais18;
    // *******Exemplo*******
    // dataAtual = 08/08/2023
    // Nascimento 27/02/2002: dataMais18 = 27/02/2002 + 18 anos = 27/02/2020
    // 08/08/2023 >= 27/02/2020 verdadeiro
}