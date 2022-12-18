import { campos } from "./main.js";

export default function removeSpiner () {
  campos.forEach(element => {
    element.classList.remove('spiner')
  })
}