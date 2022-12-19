import limpaCampos from "./limpaCampos.js";
import adicionaSpiner from "./adicionaSpiner.js";
import removeSpiner from "./removeSpiner.js";


const $ = document.querySelector.bind(document);

const campoCep = $('[data-cep]');
const btnPesquisar = $('[data-btnPesquisar]');
const limpar = $('[data-limpar]');

const logradouro = $('[data-rua]');
const bairro = $('[data-bairro]');
const cidade = $('[data-cidade]');
const estado = $('[data-estado]');

export const campos = document.querySelectorAll('[data-campos]');

const mensagemErro = $('[data-erro]');
mensagemErro.style.color = 'red'

async function buscaEndereco(cep) {
  mensagemErro.innerHTML = '';
  campoCep.style.border = ''
  try {
    var consultaCep = await (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json();
   
      setTimeout(() =>  logradouro.value = consultaCep.logradouro, 500);
      setTimeout(() =>  bairro.value = consultaCep.bairro, 500);
      setTimeout(() => cidade.value = consultaCep.localidade, 500);
      setTimeout(() => estado.value = consultaCep.uf, 500);
      console.log(consultaCep)
,
      setTimeout(() => { if(consultaCep.logradouro == undefined) {
        mensagemErro.innerHTML ='Cep inválido! Tente novamente';
        limpaCampos();
      }}, 500);
      return consultaCep;
  } catch (erro){
      
      mensagemErro.innerHTML = `<p>Cep deve conter 8 números! Tente novamente</p>`;
      
    }
    erros();
}


btnPesquisar.addEventListener('click', (e) => {
  e.preventDefault();
  buscaEndereco(campoCep.value.replace(/\.|-/g, ""));
  adicionaSpiner();
  setTimeout( () => removeSpiner(), 500);
});

campoCep.addEventListener('focusout', () => {
  buscaEndereco(campoCep.value.replace(/\.|-/g, ""));
  adicionaSpiner();
  setTimeout( () => removeSpiner(), 500);
});

limpar.addEventListener('click', () => {
  mensagemErro.innerHTML = '';
  campoCep.style.border = '';
});

function erros() {
  
  if(campoCep.value == '') {
    mensagemErro.innerHTML = `Campo Cep não pode ser vazio!`
    campoCep.style.border = '2px solid red'
  } 
}
  
campoCep.addEventListener('invalid', e => e.preventDefault())