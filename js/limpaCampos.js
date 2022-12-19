import { campos } from "./main.js";

export default function limpaCampos () {
  campos.forEach(element => {
    element.value = '';
  })
}

