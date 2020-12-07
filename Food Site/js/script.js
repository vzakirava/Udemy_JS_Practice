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
          modalTriggers = document.querySelectorAll('[data-modal]'),
          closeModalBtn = document.querySelector('.modal__close'),
          modalTimerId = setTimeout(showModal, 5000);      // показывает окно через 5 секунд

    modalTriggers.forEach((btn) => {
        btn.addEventListener('click', () => {
            showModal();
        });
    });

    closeModalBtn.addEventListener('click', () => {
        closeModal();
    });

    modal.addEventListener('click', (e) => {    // закрывает по клику на пространство вокруг модалки
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {       // закрывает по нажатию на Esc
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    document.addEventListener('scroll', showModalByScroll);      // показывает окно при прокрутке до конца страницы

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
});
