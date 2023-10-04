function handleCheckboxChange(checkbox) {
  const checkboxes = document.querySelectorAll(`input[name="${checkbox.name}"]`);

  checkboxes.forEach((cb) => {
    if (cb !== checkbox) {
      cb.checked = false;
    }
  });
}

//CODIGO PARA LOS FILTRADOS
function forSearching(event) {
  event.preventDefault();

  const searchInput = document.getElementById('searchInput');
  const searchValue = searchInput.value;

  const categoryFilterElements = document.querySelectorAll('input[name="categoryFilter"]:checked');
  const priceFilterElement = document.querySelector('input[name="priceFilter"]:checked');
  const priceFixFilterElement = document.querySelector('input[name="priceFixFilter"]:checked');

  const categoryFilters = Array.from(categoryFilterElements).map(element => element.value);
  const priceFilter = priceFilterElement ? priceFilterElement.value : null;

  console.log("Categorías seleccionadas:", categoryFilters);
  console.log("Precio seleccionado:", priceFilter);

  const params = new URLSearchParams();
  params.append('dataSearched', searchValue);
  categoryFilters.forEach(category => params.append('categoryFiltered', category));
  if (priceFilter) {
    params.append('priceFiltered', priceFilter);
  }

  const queryString = params.toString();
  const url = `/searched?${queryString}`;

  window.location.href = url;
}

//get the params values
const url = new URL(window.location.href);

//get params' value
const param = new URLSearchParams(url.search);

//get specific params' value
const category_param_value = param.get('categoryFiltered');
const price_param_value = param.get('priceFiltered');

//get checkbox
const category_checbox = document.querySelector(`input[type="checkbox"][value="${category_param_value}"]`);
const price_checbox = document.querySelector(`input[type="checkbox"][value="${price_param_value}"]`);


if (category_checbox) {
  category_checbox.checked = true;
} else {
  console.log('checkbox no encontrado');
}

if (price_checbox) {
  price_checbox.checked = true;
} else {
  console.log('checkbox no encontrado');
}

