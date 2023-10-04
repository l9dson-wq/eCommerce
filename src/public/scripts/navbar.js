function toggleDropdown(event) {
  console.log('hola');
  const dropdown = event.currentTarget.parentNode;
  dropdown.classList.toggle('show');
}

window.addEventListener('click', (event) => {
  const dropdowns = document.getElementsByClassName('dropdown');
  Array.from(dropdowns).forEach((dropdown) => {
    if (!dropdown.contains(event.target) && dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  });
});

//Working with search bar
// const navbarSearch = document.querySelector('.navbar_search');
// const searchInput = document.querySelector('.search-input');
// const navbarOptionLinks = document.querySelectorAll('.navbar_options_link');
// const searchInputId = document.getElementById('searchInput');

// function searching() {
//   navbarOptionLinks.forEach((item) => {
//     item.style.display = 'none';
//   });

//   navbarSearch.style.width = '400vh';
//   navbarSearch.classList.toggle('expanded_search_bar');
// }

// document.addEventListener('click', (event) => {
//   if (!navbarSearch.contains(event.target)) {

//     navbarSearch.style.width = '300vh';
//     navbarSearch.classList.remove('expanded_search_bar');

//     navbarOptionLinks.forEach((item) => {
//       item.style.display = 'block';
//     });

//   } else {
//     searchInputId.addEventListener('keydown', (event) => {
//       if (event.key === 'Enter') {
//         // event.preventDefault();
//         performSearch(event);
//       }
//     });
//   }
// });

// proccess to determine what's client searching
function performSearch(event) {
  event.preventDefault(); // Evita que el enlace redirija inmediatamente

  const searchInput = document.getElementById('searchInput');
  const searchValue = searchInput.value;

  // Redirige a una URL con el parámetro de búsqueda
  window.location.href = `/searched?dataSearched=${searchValue}`;
}

//TODO: Pasar esto al JS de la nueva vista para los resultados de las busquedas
//verify if param is present in the URL
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('dataSearched')) {
  // El parámetro 'dataSearched' está presente en la URL
  console.log('El parametro esta presente en la URL');

  const searchedValue = urlParams.get('dataSearched');

  searchInput.value = searchedValue;

} else {
  // El parámetro 'searched' no está presente en la URL
  console.log('El parámetro "searched" no está presente en la URL');
}

console.log('El archivo se esta cargando correctamente');