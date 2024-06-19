import confettiRun from "./confettiRun.js";
const d= document;

let $result =d.querySelector(".result");
let $mainContainer = d.querySelector(".main-container");
let $pokemonImg = d.querySelector(".pokemon")
let rowId = 1;

const POKEMON_AVAILABLE = 900;
const randomId = Math.ceil(Math.random() * (POKEMON_AVAILABLE -1)) ;

fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`)
.then(res => res.json())
.finally(() => {
  let $loader = d.querySelector(".loader");
  $loader.style.display = "none"
})
.then(data => {
  // console.log(data.name)

  let pokemon = data.name;
  $pokemonImg.innerHTML = 
  ` <figure class="my-12">
  <img src="${data.sprites.other.showdown.front_default}" alt="${pokemon}" class="w-[150px] h-[150px] pokemon-img grayscale brightness-0">
   </figure>`
let pokemonArray = pokemon.toUpperCase().split("");// no poner upper antes de split xq este devuelve un array
let actualRow = d.querySelector(".row");

drawSquares(actualRow);
listenInput(actualRow)

addFocus(actualRow)

function listenInput(actualRow) {
  let squares = actualRow.querySelectorAll(".cuadro");
  // integramos en un array
  squares = [...squares];

  // almacen de letras
  let userInput = [];


  squares.forEach(el => {
    el.addEventListener("input", (e) => {
      // console.log("se ingreso algo")
      // ingreso de texto
      // console.log(e) para ver el e borrado no mostrara "deleteContentBackward" sobre esto trabajr y decir q no afecte
      if(e.inputType !== "deleteContentBackward"){
        userInput.push(e.target.value.toUpperCase())
        // pasar al hermano siguiente
        if(e.target.nextElementSibling){
          e.target.nextElementSibling.focus()
        } else {
          // crear un arreglo con las letras
          //Buscar el contenido de la fila anterior
          // Armar un arreglo con el resultado antes de comparar
          let squaresFilled = d.querySelectorAll(".cuadro")
          squaresFilled = [...squaresFilled]
          let lastFiveSquaesFilled = squaresFilled.slice(-pokemon.length)
          let finalUserInput = []
          lastFiveSquaesFilled.forEach(el => {
            finalUserInput.push(el.value.toUpperCase())
          })

          // comparar array para cambiar styles
          let rightIndex = compareArrays(pokemonArray, finalUserInput);
          rightIndex.forEach(el => {
            squares[el].classList.add("green")
          })
          // si los array son iguales
          if(rightIndex.length == pokemonArray.length){
            shewResult("Ganaste!");
            let $imgPokemon = d.querySelector(".pokemon-img");
            $imgPokemon.classList.remove('grayscale', 'brightness-0')
            confettiRun();
          
            return
          }

          // si existe la letra pero no en la posicion correcta 
          let existIndexArray = existLetters(pokemonArray, finalUserInput);
          existIndexArray.forEach(el => {
            squares[el].classList.add("gold")
          })

          // crear nueva linea
          let actualRow = createRow()
          if(!actualRow) return;
          drawSquares(actualRow);
          listenInput(actualRow);
          addFocus(actualRow)
        }
      }else {
        userInput.pop()
      }
    })
  })
}

// Funciones 
function compareArrays(arr1, arr2) {
  let iqualIndex = []
  arr1.forEach((el, idx) =>{
    if(el == arr2[idx]){
      // console.log(`la posicio ${idx} si es correcta`);
      iqualIndex.push(idx)
    }
    // else {
    //  console.log(`la posicio ${idx} no es correcta`)
    // }
  })
  return iqualIndex
}

function existLetters(array1, array2) {
  let existIndexArray = []
  array2.forEach((el , idx) => {
    if(array1.includes(el)){
      existIndexArray.push(idx)
    }
  })
  return existIndexArray;
}

function createRow() {
  rowId++ 
  if(rowId <= 5){
  const newRow = d.createElement("div");
  newRow.classList.add("row")
  newRow.setAttribute("id", rowId)
  $mainContainer.appendChild(newRow);
  return newRow;
  }else {
    shewResult(`Intentalo de nuevo! La respuesta correcta era ${pokemon.toUpperCase()}`)
  }
}

function drawSquares(actualRow) {
  pokemonArray.forEach((item, idx) => {
    if(idx === 0) {
      actualRow.innerHTML += `<input type="text" maxlength="1" class="cuadro text-white text-center mt-2 focus">`;
    }else {
      actualRow.innerHTML += `<input type="text" maxlength="1" class="cuadro text-white text-center mt-2">`;
    }
  });
}

function addFocus(actualRow) {
  let focusElement = actualRow.querySelector(".focus");
  focusElement.focus();
}

function shewResult(textmsg) {
  $result.innerHTML = `<p>${textmsg}</p>
     <button 
     class="button w-[170px] h-[60px] bg-lime-600 text-2xl text-white rounded-2xl
     hover:border-[3px] hover:bg-white hover:text-lime-600 hover:border-lime-600 cursor-pointer">
     Reiniciar
   </button>`;
   let resetBtn = d.querySelector(".button");
   resetBtn.addEventListener("click", () => {
     location.reload();
   })
}
});