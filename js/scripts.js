//Calculo da gorjeta
var erroInputs = [true, true, true]; //Caso haja algum erro nos inputs (impossibilita de calcular os valores)

//Setando valores iniciais
var valorPedido = null;
var porcentagemGorjeta = null;
var numPessoas = null;

//Inputs dos resultados
var gorjetaValor = document.getElementById("gorjeta_valor"); 
var gorjetaPessoa = document.getElementById("gorjeta_pessoa");
gorjetaValor.value = " "; //Valores iniciais
gorjetaPessoa.value = " "; //Valores iniciais

//Tratando do valor do pedido
//Função para verificar se o valor do input é válido
function verificaInputValorPedido()
{
    valorPedido = inputValorPedido.value; //Valor inserido pelo usuário
    
    if (isNaN(valorPedido) || valorPedido <= 0 || valorPedido == "")
    {
        //Valor inválido
        inputValorPedido.setAttribute("class", "interativo error"); //Atribuindo a estilização de erro
        inputValorPedido.focus(); //Focando no input para que o usuário insera novamente um valor
        valorPedido = null; //Resetando o valor inserido
        erroInputs[0] = true; //Setando o erro
    } else {
        //Valor válido
        inputValorPedido.setAttribute("class", "interativo"); //Removendo a estilização de erro caso haja
        erroInputs[0] = false; //No primeiro input não há erro
        valorPedido = parseFloat(valorPedido).toFixed(2); //Modificando o valor para duas casas decimais
        inputValorPedido.value = valorPedido; //Setando o valor do input
    }
    
    calcularGorjeta(erroInputs, valorPedido, porcentagemGorjeta, numPessoas);
}

var inputValorPedido = document.getElementById("valor_pedido");

//Quando o usuário pressionar Enter ou sair do input, verificaremos o input com a função
inputValorPedido.onfocus = () => {
    document.onkeydown = (evento) => {
        if (evento.key === "Enter")
        {
            verificaInputValorPedido();
        }
    }
}

inputValorPedido.onblur = () => {
    verificaInputValorPedido();
}

//Tratando da % de gorjeta
var inputGorjeta = document.getElementById("gorjeta_personalizada");
var radios_inputs = document.getElementsByName("valor_gorjeta");
var radio_selected = false; //Existe algum radio selecionado?

function verificaGorjeta(porcentagemGorjeta)
{
    if (porcentagemGorjeta > 100 || porcentagemGorjeta <= 0)
    {
        return false;
    } else {
        return true;
    }
}

radios_inputs.forEach((radio) => {
    radio.onclick = (event) => {
        if (radio.checked)
        {
            radio_selected = true; //Temos um radio selecionado
            
            //Verificando valor do radio selecionado
            if (verificaGorjeta(radio.value))
            {
                //Valor ok, vamos salvar
                porcentagemGorjeta = parseInt(radio.value);
                inputGorjeta.value = "";
                erroInputs[1] = false;
            } else {
                erroInputs[1] = true;
                inputGorjeta.focus();
            }
        }
        
        calcularGorjeta(erroInputs, valorPedido, porcentagemGorjeta, numPessoas);
    }
});

function verificaInputGorjeta()
{
    if (inputGorjeta.value == "" || inputGorjeta.value === null)
    {
        //Usuário deixou o campo de gorjeta personalizada vazio
        //Verificando se existe algum radio selecionado, caso não tenha damos foco no input de % personalizado
        if (radio_selected === false)
        {
            inputGorjeta.focus();
        }
    } else {
        if (!verificaGorjeta(inputGorjeta.value))
        {
            //O valor personalizado inserido é inválido
            inputGorjeta.setAttribute("class", "interativo error");
            inputGorjeta.focus();
            porcentagemGorjeta = null;
            erroInputs[1] = true;
        } else {
            //Valor válido
            inputGorjeta.setAttribute("class", "interativo");

            radios_inputs.forEach((radio) => {
                radio.checked = false;
                radio_selected = false;
            })

            porcentagemGorjeta = parseInt(inputGorjeta.value);
            erroInputs[1] = false;
        }
    }
    
    calcularGorjeta(erroInputs, valorPedido, porcentagemGorjeta, numPessoas);
}

//Quando o usuário pressionar Enter ou sair do input, verificaremos o input com a função
inputGorjeta.onblur = () => {
    verificaInputGorjeta();
}

inputGorjeta.onfocus = () => {
    document.onkeydown = (ev) => {
        if (ev.key === "Enter")
        {
            verificaInputGorjeta();
        }
    }
}

var inputNumPessoas = document.getElementById("num_pessoas");

function verificaInputNumPessoas()
{
    numPessoas = document.getElementById("num_pessoas").value;
    
    if (isNaN(numPessoas) || numPessoas <= 0)
    {
        //Valor inválido
        inputNumPessoas.setAttribute("class", "interativo error");
        inputNumPessoas.focus();
        numPessoas = null;
        erroInputs[2] = true;
    } else {
        //Valor inválido
        inputNumPessoas.setAttribute("class", "interativo");
        numPessoas = parseInt(numPessoas);
        erroInputs[2] = false;
    }

    calcularGorjeta(erroInputs, valorPedido, porcentagemGorjeta, numPessoas);
}

//Quando o usuário pressionar Enter ou sair do input, verificaremos o input com a função
inputNumPessoas.onblur = () => {
    verificaInputNumPessoas();
}

inputNumPessoas.onfocus = () => {
    document.onkeydown = (ev) => {
        if (ev.key === "Enter")
        {
            verificaInputNumPessoas();
        }
    }
}

function verificaErro()
{
    if (erroInputs.includes(true))
    {
        //Um dos inputs está com erro
        return false;
    } else {
        return true;
    }
}

function calcularGorjeta(erroInput, valorPedido, porcentagemGorjeta, numPessoas)
{

    if (!verificaErro())
    {
        //Caso haja erro
        /*
        let inputErro = erroInputs.indexOf(true);

        switch (inputErro) {
            case 0:
                //Erro no 1º input (valor pedido)
                inputValorPedido.setAttribute("class", "interativo error");
                break;
        
            default:
                break;
        }
        */
        for (var i = 0; i < erroInputs.length; i++)
        {
            if (erroInputs[i] === true)
            {

                //Qual elemento está com erro?
                switch (i) {
                    case 0:
                        inputValorPedido.setAttribute("class", "interativo error");
                        break;
                
                    case 1:
                        inputGorjeta.setAttribute("class", "interativo error");
                        break;

                    case 2:
                        inputNumPessoas.setAttribute("class", "interativo error");
                        break;

                    default:
                        break;
                }
            }
        }

        gorjetaValor.value = " "; //Caso haja algum erro, este será o valor padrão
        gorjetaPessoa.value = " "; //Caso haja algum erro, este será o valor padrão
    } else {
        let valorGorjeta = parseFloat(valorPedido * (porcentagemGorjeta / 100)).toFixed(2);
        gorjetaValor.value = valorGorjeta.toString().replace(".", ",");

        let valorPessoa = parseFloat(valorGorjeta / numPessoas).toFixed(2);
        gorjetaPessoa.value = valorPessoa.toString().replace(".", ",");
    }
}

document.onkeyup = (evento) => {
    if (evento.key === "Enter")
    {
        calcularGorjeta(erroInputs, valorPedido, porcentagemGorjeta, numPessoas);
    }
}