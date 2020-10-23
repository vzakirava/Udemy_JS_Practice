/* Задание на урок:

1) Первую часть задания повторить по уроку

2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
false - выводит в консоль главный объект программы

3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres

P.S. Функции вызывать не обязательно*/

'use strict';

let numberOfFIlms;

function start() {
    numberOfFIlms = +prompt('Сколько фильмов вы уже посмотрели?', '');

    while (numberOfFIlms == '' || numberOfFIlms == null || isNaN(numberOfFIlms)) {
        numberOfFIlms = +prompt('Сколько фильмов вы уже посмотрели?', '');
    }
}

start();

const personalMovieDB = {
    count: numberOfFIlms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

function rememberMyFilms() {
    for (let i = 0; i < 2; i++) {
        // Отдельный if для каждого поля выбран, чтобы при неправильно введенном ответе
        // начать вводить запись заново сразу, не отвечая следующий вопрос
    
        let currentFilm = prompt('Один из последних просмотренных фильмов?', '');
    
        if (currentFilm == '' || currentFilm == null || currentFilm.length > 50) {
            i--;
            continue;
        }
    
        let currentFilmRating = +prompt('На сколько оцените его?', '');
    
        if (currentFilmRating == '' || currentFilmRating == null) {
            i--;
            continue;
        }
    
        personalMovieDB.movies[currentFilm] = currentFilmRating;
    
        // Более короткий вариант
    
        /*
        let currentFilm = prompt('Один из последних просмотренных фильмов?', ''),
            currentFilmRating = +prompt('На сколько оцените его?', '');
    
        if (currentFilm != '' && currentFilm != null && currentFilm.length > 50 &&
            currentFilmRating != '' || currentFilmRating != null) {
            
            personalMovieDB.movies[currentFilm] = currentFilmRating;
        } else {
            i--;
        }*/
    }
}

rememberMyFilms();

function detectPersonalLevel() {
    if (personalMovieDB.count < 10) {
        console.log('Просмотрено довольно мало фильмов');
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
        console.log('Вы классический зритель');
    } else if (personalMovieDB.count > 30) {
        console.log('Вы киноман');
    } else {
        console.log('Произошла ошибка');
    }
}

detectPersonalLevel();

function showMyDB() {
    if (!personalMovieDB.privat) {
        console.log(personalMovieDB);
    }
}

function writeYourGenres() {
    for (let i = 1; i < 4; i++) {
        personalMovieDB.genres.push(prompt(`Ваш любимый жанр под номером ${i}`, ''));
    }
}
