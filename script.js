/* Задание на урок:

1) Автоматизировать вопросы пользователю про фильмы при помощи цикла

2) Сделать так, чтобы пользователь не мог оставить ответ в виде пустой строки,
отменить ответ или ввести название фильма длинее, чем 50 символов. Если это происходит - 
возвращаем пользователя к вопросам опять

3) При помощи условий проверить  personalMovieDB.count, и если он меньше 10 - вывести сообщение
"Просмотрено довольно мало фильмов", если от 10 до 30 - "Вы классический зритель", а если больше - 
"Вы киноман". А если не подошло ни к одному варианту - "Произошла ошибка"

4) Потренироваться и переписать цикл еще двумя способами*/

'use strict';

let numberOfFIlms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
    count: numberOfFIlms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
}; 

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

if (personalMovieDB.count < 10) {
    alert('Просмотрено довольно мало фильмов');
} else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
    alert('Вы классический зритель');
} else if (personalMovieDB.count > 30) {
    alert('Вы киноман');
} else {
    alert('Произошла ошибка');
}