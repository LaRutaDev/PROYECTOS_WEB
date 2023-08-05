'use strict';

//VARIABLES GENERALES
let btnEnviar = document.querySelector('#btnEnviar');
let formulario = document.querySelector('#formularioContacto');
let divErrores = document.querySelector('#errores');
let arrayInputs = document.querySelectorAll('[data-requerido="true"]');
let arrayErrors = [];
let regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

document.addEventListener('DOMContentLoaded', function (e) {
  runEvents();
});

function runEvents() {
  btnEnviar.addEventListener('click', validaFormulario);
}

function validaFormulario(e) {
  e.preventDefault();
  arrayErrors = [];
  arrayInputs.forEach(function (item, index) {
    if (item.type === 'email' && !regexEmail.test(item.value) && item.value !== '') {
      arrayErrors.push(`${item.previousElementSibling.firstChild.textContent} no es correcto y`);
    }
    else if (item.value === '') {
      arrayErrors.push(item.previousElementSibling.firstChild.textContent);
    }
  });

  if (!arrayErrors.length) { //no tiene errores
    formulario.submit();
  } else { //tiene errores
    if (divErrores.innerHTML === '') {
      arrayErrors.forEach(function (item) {
        const msError = document.createElement('div');
        msError.classList.add('alert-danger');
        msError.textContent = `El campo ${item} es obligatorio`;
        divErrores.appendChild(msError);
      });

      setTimeout(() => {
        divErrores.innerHTML = '';
        divErrores.classList.remove('alert-danger');
      }, 3000);
    }
  }

}