const timer = (id, deadline) => {
    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };

    const getTimeRemaining = (endtime) => {

        const t = Date.parse(endtime) - Date.parse(new Date()),
              seconds = Math.floor((t/1000) % 60),
              minutes = Math.floor((t/1000/60) % 60),
              hours = Math.floor((t/(1000 * 60 * 60)) % 24),
              days = Math.floor((t/(1000 * 60 * 60 * 24)));

        // new Date - текущее время

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    // помещаем определенное значение в определенный эл. на странице
    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000) //обновляет таймер каждую секунду

        updateClock()

        function updateClock() { // сколько осталось до dedline
            const t = getTimeRemaining(endtime);

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";

                clearInterval(timeInterval);
            }
        }
    };

    setClock(id, deadline);
};

export default timer;


/*Все начинается с запуска функции timer в которую передается два аргумента: селектор, куда помещать этот таймер и дата, которая лежит в переменной deadline.

Внутри этой функции создаются еще 3 функции: addZero, getTimeRemaining, setClock.

В конце запускается только функция setClock с двумя аргументами: это все тот же селектор и дедлайн.

Внутри функции setClock аргумент с датой просто переименовывается в endtime, но это все та же строка с датой. Первым делом тут идет получение всех необходимых элементов со страницы по заданному селектору. Потом идет запуск интервала setInterval с функцией updateClock, которая будет запускаться через каждую секунду.

За ним еще один вызов updateClock для самой первой инициализации часов. Функцию можно вызвать за счет того, что она создана в формате function declaration, то есть существует еще до того, как код дойдет до неё.

В функции updateClock идет запуск getTimeRemaining с все той же строкой с датой. Высчитывается объект t и дальше готовые данные записываются в верстку. Если таймер закончился - setInterval останавливается по уникальному идентификатору. 

deadline --> сравниваем с текущим временем
              |
              V
        getTimeRemaining()
              |
              V
         каждую секунду
              |
              V
    updateClock вставляет данные в #days #hours #minutes #seconds

*/