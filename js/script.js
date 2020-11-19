/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"
5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против...",
            "Базинга",
            "Пепе на тропе"
        ]
    };
    
    const addMovieForm = document.querySelector('.add'),
          faveMovieCheckbox = addMovieForm.querySelector('input[type="checkbox"]'),
          movieList = document.querySelector('.promo__interactive-list');
    
    removeAds();
    
    changePromoGenreTo('драма');
    
    changePromoBackgroundTo('bg.jpg');
    
    updateMovieList();
    
    addMovieForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        let newMovie = addMovieForm.querySelector('.adding__input').value;
    
        if (newMovie) {
            checkMovieNameLength();
    
            isFaveMovie();
    
            movieDB.movies.push(newMovie);
            updateMovieList();
    
            addMovieForm.reset();
        }
        
        function checkMovieNameLength() {
            if (newMovie.length > 21) {
                newMovie = `${newMovie.slice(0, 21)}...`;
            } 
        }
    
        function isFaveMovie() {
            if (faveMovieCheckbox.checked) {
                console.log('Добавляем любимый фильм');
            }
        }
    });
    
    // movieList.addEventListener('click', (event) => {
    //     if (event.target.classList.contains('delete')) {    // Если нажата 'корзина',
    //         event.target.parentElement.remove();            // удалить фильм из списка
    //     }
    // });
    
    function changePromoBackgroundTo(image) {
        document.querySelector('.promo__bg').style.backgroundImage = `url(img/${image})`;
    }
    
    function changePromoGenreTo(genre) {
        document.querySelector('.promo__genre').textContent = genre;
    }
    
    function removeAds() {
        const adsBlocks = document.querySelectorAll('.promo__adv');
    
        adsBlocks.forEach(item => {
            item.innerHTML = '';
        });
    }
    
    function updateMovieList() {
        movieList.innerHTML = '';
        
        movieDB.movies.sort();
  
        movieDB.movies.forEach((item, i) => {
            movieList.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${item}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((button, i) => {
            button.addEventListener('click', () => {
                button.parentElement.remove();
                movieDB.movies.splice(i, 1);

                updateMovieList();
            });
        });
    }
});
