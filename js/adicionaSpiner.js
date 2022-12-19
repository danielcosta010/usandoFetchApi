import { campos } from "./main.js";

export default function adicionaSpiner () {
  campos.forEach(element => {
    element.classList.add('spiner');
  })
}