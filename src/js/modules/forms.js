import checkNumInputs from './checkNumInputs';

// все формы на сайте собирают информацию внутри себя и отправляют на сервер

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');
    
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        // отправляем запрос
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = ''; // очищаем инпут
        });
    };
    
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }


            postData('assets/server.php', formData) // возврашается промис
                .then(res => {// вернется res.text();
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure) 
                .finally(() => {
                    clearInputs();

                if (item.getAttribute('data-calc') === "end") {
                    const modal = document.querySelector('.popup_calc_end');
                    if (modal) modal.style.display = 'none';
                }

                setTimeout(() => {
                    statusMessage.remove();
                }, 5000);// удаляем statusMessage через время
            })  
        });
    });
};

export default forms;