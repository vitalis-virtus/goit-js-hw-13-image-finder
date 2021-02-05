import addToMarkup from './addToMarkup';
import fetchImages from './apiService';
import refs from './refs';

const API_KEY = '19535074-e31d7f60a5e9484c321caf15b';

let inputValue = '';
let page = 1;
refs.loadMore.style.display = 'none';

export const getFormSubmit = e => {
  e.preventDefault();
  refs.galleryList.innerHTML = '';
  inputValue = e.target.elements.query.value;
  if (inputValue.length) {
    fetchImages(inputValue, page, API_KEY)
      .then(images => {
        images.length
          ? (refs.loadMore.style.display = 'block')
          : (refs.loadMore.style.display = 'none');
        addToMarkup(images);
      })
      .catch(err => console.log(err));
  }
};

export const moreImages = () => {
  page += 1;
  fetchImages(inputValue, page, API_KEY)
    .then(images => {
      addToMarkup(images);
      scrollTo({
        top: document.documentElement.offsetHeight - 1600,
        behavior: 'smooth',
      });
    })
    .catch(err => caonsole.log(err));
};

refs.form.addEventListener('submit', getFormSubmit);
refs.loadMore.addEventListener('click', moreImages);
