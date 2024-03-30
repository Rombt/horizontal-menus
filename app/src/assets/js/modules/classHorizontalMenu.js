/*
 *   Обеспечивает основной функционал горизонтального меню для всех меню
 *   базовые стили в файле horisontalMenu.less
 		
 		поиск меню - на основе css селектору обёртки меню 
 		оброботка событий меню - по css селектору соответствующих элементов (иконок, кнопок)
 		селекторы могут предаватся как строкой так и массивом

 *   основные функции:
 *		
 *   
 */

class HorizonalMenu {



    constructor(param) {

        this.сontainerMenu = param.сontainerMenu || '.cont-horisont-menu';

        this._getNodes(this.сontainerMenu, this.nl_containersMenu);

        this.toggleOverflow = param.toggleOverflow || '.show-overflow-menu';
        this._getNodes(this.toggleOverflow, this.nl_toggleOverflow);


        if (this.nl_containersMenu.length === null) {
            throw new Error('menus are absent on this page');
        }

        this.forEachMenu();


        console.log('this = ', this);
    }

    forEachMenu() {


        console.log("this.nl_containersMenu", this.nl_containersMenu);

        this.nl_containersMenu.forEach(menu => {
            this.menuContainerOverflow(menu);

        })
    }

    menuContainerOverflow(menu) {

        let overflowDropContainer = document.createElement('div');
        overflowDropContainer.classList.add('menu-overflow-drop-cont', 'hidden');

        menu.querySelectorAll('nav>ul>li').forEach((elMenu) => {
            if (elMenu.getBoundingClientRect().right > menu.getBoundingClientRect().right) {
                overflowDropContainer.append(elMenu);
            }
        })


        this.nl_toggleOverflow.forEach(el => {
            if (menu.querySelector(el) !== null) {
                el.classList.remove('hidden');
            }
        })






        if (menuOverflowDrop.childElementCount > 0) {
            menu.querySelector('nav').append(menuOverflowDrop);
        }
        menu.style.visibility = 'visible'; // показываю меню после окончательногоформирования
    }

    /*
		получает nodeList элементов по их селекторам
    */
    _getNodes(date, dist) {
        if (Array.isArray(date)) {
            dist = date.map(el => document.querySelectorAll(el))
        } else {
            dist = document.querySelectorAll(date);
        }
    }
}

const param = {
    сontainerMenu: ['#my-menu', '.wrap-burger-menu'],
    toggleOverflow: '.toggle-overflow-menu',
}

const menu = new HorizonalMenu(param);