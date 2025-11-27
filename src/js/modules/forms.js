// все формы на сайте собирают информацию внутри себя и отправляют на сервер

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, ''); // если находит не число, заменяет пустым местом
        })  
    });
    
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

            //помещаем блок в конец формы
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            postData('assets/server.php', formData) // возврашается промис
                .then(res => {// вернется res.text();
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure) 
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);// удаляем statusMessage через время
                })  
        });
    });
};

export default forms;