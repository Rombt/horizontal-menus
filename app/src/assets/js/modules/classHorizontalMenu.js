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
        this.nl_containersMenu = this._getArrNodeLists(this.сontainerMenu);

        this.toggleOverflow = param.toggleOverflow || '.show-overflow-menu';
        // this.nl_toggleOverflow = this._getArrNodeLists(this.toggleOverflow);

        if (this.nl_containersMenu.length === null) {
            throw new Error('menus are absent on this page');
        }

        this.forEachMenu();

        // console.log('this = ', this);
    }

    forEachMenu() {
        this.nl_containersMenu.forEach(arrNodeList => {
            arrNodeList.forEach(menu => {
                this.menuContainerOverflow(menu);
            })
        })
    }

    menuContainerOverflow(menu) {

        let overflowDropContainer = document.createElement('div');
        overflowDropContainer.classList.add('menu-overflow-drop-cont', 'hidden');
        menu.querySelectorAll('nav>ul>li').forEach((elMenu) => {

            if (elMenu.getBoundingClientRect().right > menu.getBoundingClientRect().right) {
                console.log("       elMenu.getBoundingClientRect().right", elMenu.getBoundingClientRect().right);
                overflowDropContainer.append(elMenu);
            }
        })

        if (overflowDropContainer.childElementCount > 0) {
            if (Array.isArray(this.toggleOverflow)) {
                this.toggleOverflow.forEach(el => {
                    if (menu.querySelector(el)) menu.querySelector(el).classList.remove('hidden')
                })
            } else {
                menu.querySelector(this.toggleOverflow).classList.remove('hidden');
            }
            menu.querySelector('nav').append(overflowDropContainer);
        }
        menu.style.visibility = 'visible'; // показываю меню после окончательногоформирования
    }

    /*
        возвращает массив nodeList элементов по их селекторам
    */
    _getArrNodeLists(date) {
        if (Array.isArray(date)) {
            return date.map(el => document.querySelectorAll(el))
        } else {
            return [document.querySelectorAll(date)];
        }
    }
}




const param = {
    // сontainerMenu: '#my-menu',
    сontainerMenu: ['#my-menu', '.wrap-burger-menu', '.cont-horisont-menu'],
    // toggleOverflow: '.toggle-overflow-menu',
    toggleOverflow: ['.toggle-overflow-menu', '.show-hide-menu'],
}

const menu = new HorizonalMenu(param);