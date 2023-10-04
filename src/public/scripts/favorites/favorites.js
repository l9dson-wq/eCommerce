//TRYING TO DO DYNAMIC SEARCH FOR FAVORITES

document.addEventListener('keyup', e => {
  if (e.target.matches('#searching')) {
    document.querySelectorAll('.favoritesItem').forEach((item) => {
      const h3Element = item.querySelector('.favoritesItemSpecific');
      const searchText = e.target.value.toLowerCase();
      
      if (h3Element.textContent.toLowerCase().includes(searchText)) {
        item.classList.remove('filteringItem');
      } else {
        item.classList.add('filteringItem');
      }
    });
  }
});
