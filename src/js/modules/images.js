const images = () => {
    // создание модального окна, общего блока для всех изображений и создаем изображение
    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImage = document.createElement('img'),
          images = workSection.querySelectorAll('.preview');

    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImage);

    let currentIndex = 0;

    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;

        // открытие попапа
        if (target && target.classList.contains('preview')) { // if target(эл на котором произошло событие) supports click и содержит класс 

            // записываем индекс нажатой картинки
            currentIndex = Array.from(images).indexOf(target);
            
            imgPopup.style.display = 'flex';

            document.body.style.overflow = 'hidden'// БЛОКИРУЕМ ПРОКРУТКУ

            showImage(currentIndex);
        } 

        // закрытие по клику на фон
        if (target && target.matches('div.popup')) {
            imgPopup.style.display = 'none';

            document.body.style.overflow = ''// ВОЗВРАЩАЕМ ПРОКРУТКУ
        }
    });


    // показать картинку по индексу
    function showImage(index) {
        const path = images[index].parentNode.getAttribute('href');
        bigImage.setAttribute('src', path);
    }


    // перелистывание по клавишам ← →
    document.addEventListener('keydown', (e) => {
        if (imgPopup.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length; 
            // ↑ следующая картинка, по кругу (последняя → первая)
            showImage(currentIndex);
            }
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                // ↑ предыдущая картинка, по кругу (первая → последняя)
                showImage(currentIndex);
            }
    
            if (e.key === 'Escape') {
                imgPopup.style.display = 'none'; 
                document.body.style.overflow = ''; 
                // ↑ закрытие по Esc
            }
        }
    });
};

export default images;