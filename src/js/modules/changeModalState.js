import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    // пользователь имеет 5 на выбор: форма балкона, ширина, высота, профиль, холодное или теплое
     
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');
          
    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElems (event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                // if (elem.length > 1) {
                //     state[prop] = i;
                // } else { //если эл. один на странице - это либо width/height
                //     state[prop] = item.value;
                // }
                // console.log(state);

                switch(item.nodeName) {
                    case 'SPAN' : 
                        state[prop] = i;
                        break;
                    case 'INPUT' :
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
                            // выбор только 1 чекбокса - уберу галочки со всех, кроме того, на который кликнул user
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT' :
                        state[prop] = item.value;
                        break;
                }
                console.log(state);
            });
        });
    }
    // event - событие, которые будут происходить(клик, инпут), elem - эл., на котором будет событие, prop - property, которое мы будем изменять в стейте 
    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;