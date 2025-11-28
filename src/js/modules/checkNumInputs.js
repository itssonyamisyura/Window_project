const checkNumInputs = (selector) => {
    const NumInputs = document.querySelectorAll(selector);

    NumInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, ''); // если находит не число, заменяет пустым местом
        })
    });
};

export default checkNumInputs;