'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabContainer = document.querySelector('.tabcontainer');

    hideTabContent();
    showTabContent(0);

    function hideTabContent() {
        tabsContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    tabContainer.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (target == tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    // Timer

    const deadline = '2020-12-31';

    setClock('.timer', deadline);

    function getRemainingTime(endTime) {

        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),     // t / мс в одном дне
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds');

        const updateClockInterval = setInterval(updateClock, 1000);

        updateClock();  // вызывается, чтобы таймер сразу обновлялся

        function updateClock() {
            const t = getRemainingTime(endTime);

            if (t.total <= 0) {
                clearInterval(updateClockInterval);
                nullClock();
                return;
            }

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
        }

        function nullClock() {
            days.textContent = addZero(0);
            hours.textContent = addZero(0);
            minutes.textContent = addZero(0);
            seconds.textContent = addZero(0);
        }
    }


    // Modal

    const modal = document.querySelector('.modal'),
          modalTriggers = document.querySelectorAll('[data-modal]');

    modalTriggers.forEach((btn) => {
        btn.addEventListener('click', () => {
            showModal();
        });
    });

    modal.addEventListener('click', (e) => {    // закрывает по клику на крестик и на пространство вокруг модалки
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {       // закрывает по нажатию на Esc
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    document.addEventListener('scroll', showModalByScroll);      // показывает окно при прокрутке до конца страницы

    const modalTimerId = setTimeout(showModal, 50000);      // показывает окно через 50 секунд

    function showModal() {
        modal.classList.remove('hide');
        modal.classList.add('show', 'fast_fade');
        document.body.style.overflow = 'hidden';

        // если пользователь уже открыл окно сам, не показывать еще раз
        clearTimeout(modalTimerId);
        document.removeEventListener('scroll', showModalByScroll);
    }

    function showModalByScroll() {
        const elem = document.documentElement;

        if (elem.scrollHeight - elem.scrollTop <= elem.clientHeight) {
            showModal();
            document.removeEventListener('scroll', showModalByScroll);
        }
    }

    function closeModal() {
        modal.classList.remove('show', 'fast_fade');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }


    // Menu cards

    class MenuItem {
        constructor (imgSrc, imgAlt, name, description, price, parentSelector, ...classes) {
            this.name = name;
            this.description = description;
            this.price = price;
            this.imgSrc = imgSrc;
            this.imgAlt = imgAlt;

            this.parent = document.querySelector(`${parentSelector}`);

            this.classes = classes;

            this.currency = 23;     // обменный курс
            this.changePriceToUAH();
        }

        changePriceToUAH() {
            this.price = this.price * this.currency;
        }

        render() {
            const card = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = ['menu__item'];
            }

            this.classes.forEach(className => {
                card.classList.add(className);
            });

            card.innerHTML = `
                <img src=${this.imgSrc} alt=${this.imgAlt}>
                <h3 class="menu__item-subtitle">Меню “${this.name}”</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;

            this.parent.append(card);
        }
    }

    const getResources = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    };

    getResources('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuItem(img, altimg, title, descr, price, 
                    '.menu .container', 'menu__item').render();
            });
        });


    // Forms

    const forms = document.querySelectorAll('form');

    const messages = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await result.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const spinner = document.createElement('img');
            spinner.src = messages.loading;
            spinner.classList.add('spinner');
            form.insertAdjacentElement('afterend', spinner);    // чтобы спиннер не сдвигал блоки встроенной формы

            const formData = new FormData(form);

            postData('http://localhost:3000/requests', formDataToJSON(formData))
                .then(response => {
                    console.log(response);
                    showResponseModal(messages.success); 

                    
                })
                .catch(() => {
                    showResponseModal(messages.failure);
                })
                .finally(() => {
                    form.reset();

                    spinner.remove();    // удаляем спиннер
                });
        });
    }

    function showResponseModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal();

        const responseModal = document.createElement('div');
        responseModal.classList.add('modal__dialog');
        responseModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(responseModal);

        setTimeout(() => {
            closeModal();
            responseModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
        }, 4000);
    }

    function formDataToJSON(formData) {
        return JSON.stringify(Object.fromEntries(formData.entries()));
    }


    // Slider

    const sliderCounter = document.querySelector('.offer__slider-counter'),
          currSlide = sliderCounter.querySelector('#current'),
          numberOfSlides = sliderCounter.querySelector('#total');

    const slideWrapper = document.querySelector('.offer__slider-wrapper'),
          slides = slideWrapper.querySelectorAll('.offer__slide');

    let slideNumber = 1;

    hideSlides();
    showSlide(slideNumber);


    sliderCounter.addEventListener('click', (e => {
        if (e.target.classList.contains('offer__slider-prev')) {
            hideSlides();
            showSlide(slideNumber, -1);
        } else if (e.target.classList.contains('offer__slider-next')) {
            hideSlides();
            showSlide(slideNumber, 1);
        } else {
            return;
        }
        
    }));

    function showSlide(i, inc = 0) {
        slides[i - 1].classList.add('show');
        slides[i - 1].classList.remove('hide');

        // сменяем нумерацию
        slideNumber = (slideNumber + inc) > slides.length ? 1 :
                      (slideNumber + inc) < 1 ? 4 :
                      (slideNumber + inc);

        currSlide.textContent = `${addZero(slideNumber)}`;
        numberOfSlides.textContent = `${addZero(slides.length)}`;
    }

    function hideSlides() {
        slides.forEach(slide => {
            slide.classList.add('hide');
            slide.classList.remove('show');
        });
    }

});
