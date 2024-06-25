const d = document; 
const ls = localStorage;
const $themeBtn = d.getElementById("dark-mode");
const light = "☀";
const dark = "🌑";

export default function themeMode() {
    const lightMode = () => {
      d.documentElement.classList.remove("dark");
      $themeBtn.textContent = dark;
      ls.theme = "light";
    };
    const darkMode = () => {
      d.documentElement.classList.add("dark");
      $themeBtn.textContent = light;
      ls.theme = "dark";
    };
    // verificamos si tiene almacenado en la pagina 
    ls.theme === "dark" ? darkMode() : lightMode();

    // enlazamos al btn mode para activar las funciones
    $themeBtn.addEventListener("click", () => {
      if(d.documentElement.classList.contains("dark")){
        lightMode();
      }else {
        darkMode();
      }
    })
}

// if(changeMode) {
//   $themeBtn.textContent = light;
  
// }else {
//   $themeBtn.textContent = dark;
//   ls.theme = "light";
// }