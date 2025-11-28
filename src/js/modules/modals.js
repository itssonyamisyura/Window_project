const modals = () => {
    // общий алгоритм 
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'); // получаем все модальные окна со страницы, чтобы потом их закрыть 

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault(); // предотвращаем перезагрузку браузера после клика на ссылку 
    
                // ====== ДОП. ПРОВЕРКИ ДЛЯ КАЛЬКУЛЯТОРА ======
                // ШАГ 1: .popup_calc → проверяем width + height
                if (triggerSelector === '.popup_calc_button') {
                    const widthInput  = document.querySelector('#width');
                    const heightInput = document.querySelector('#height');

                if (!widthInput.value.trim() || !heightInput.value.trim()) {
                        // не даём открыть следующее окно
                        item.classList.add('shake');
                        setTimeout(() => item.classList.remove('shake'), 600);
                        return;
                    }
                }
                // ШАГ 2: .popup_calc_profile → проверяем холодное / тёплое
                if (triggerSelector === '.popup_calc_profile_button') {
                    // берём именно input'ы с чекбоксами
                    const profileCheckboxes = document.querySelectorAll('.checkbox');
                
                    // хотя бы один должен быть .checked === true
                    const isChecked = Array.from(profileCheckboxes).some(cb => cb.checked);
                
                    if (!isChecked) {
                        item.classList.add('shake');
                        setTimeout(() => item.classList.remove('shake'), 600);
                        return;
                    }
                }

                // если всё ок – открываем нужное модальное окно
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "block";
                document.body.style.overflow = 'hidden'; // отключаем скролл страницы, когда открыто модальное окно
                // document.body.classList.add('modal-open'); bootstrap class
                }
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            
            modal.style.display = "none";
            document.body.style.overflow = "";
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = "block";
            document.body.style.overflow = 'hidden';
        }, time);
    }
    
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    
    showModalByTime('.popup', 600000); 
};

export default modals;