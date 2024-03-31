/*
 *   Обеспечивает основной функционал горизонтального меню для всех меню
 *   базовые стили в файле horisontalMenu.less
        
        поиск меню - на основе css селектору обёртки меню 
        оброботка событий меню - по css селектору соответствующих элементов (иконок, кнопок)
        селекторы могут предаватся как строкой так и массивом

 *   основные функции:
 *      при переполнении контейнера пункты меню которые не поместились скрываются в выпадающем меню
        добавляет иконку, icon-dropdown, для активации выподающего меню с классами указанными в массиве
            icon-dropdown для десктопа и мобильной версии могут быть разными и устанавливаются в scc 
 *      реакция на события
            click
                прослушивает событие для элементов из param.toggleOverflow и param.iconDropdownClass, 
                    а также все те элементы которые будут добавлены в arr_nodesToListenClick
                по событию добавляет либо удаляет класс указанный в param.activeClass
                по умолчанию rmbt_active на ближайшего робителя элемента

    todo:
        возможность отключать icon-dropdown для меню desk topa независимо от мобильной версии из html 
        вынести в params
                arr_nodesToListenClick = [
                    '.bonus-icon',
                    'some-icon'
                    ];
 *   
 */

class HorizonalMenu {

    arr_nodesToListenClick = [
        '.bonus-icon',
        'some-icon'
    ];


    constructor(param) {

        this.сontainerMenu = param.сontainerMenu || '.cont-horisont-menu';
        this.nl_containersMenu = this._getArrNodeLists(this.сontainerMenu);

        this.toggleOverflow = param.toggleOverflow || '.show-overflow-menu';
        this.arr_nodesToListenClick.push(this.toggleOverflow);
        this.iconDropdownClass = param.iconDropdownClass || '.icon-dropdown';
        this.arr_nodesToListenClick.push(this.iconDropdownClass);

        this.activeClass = param.activeClass || '.rmbt_active';

        if (this.nl_containersMenu.length === null) {
            throw new Error('Menus with given selectors  are absent on this page');
        }



        this.forEachMenu();

        // console.log('this = ', this);
    }

    forEachMenu() {
        this.nl_containersMenu.forEach(arrNodeList => {
            arrNodeList.forEach(menu => {

                console.log("menu", menu);

                this.menuContainerOverflow(menu);
                this.setSubMenuIcon(menu);

                this.listenClick(menu);
                // this.clickOut(menu);
                // this.hover(menu);
                // this.keydown(menu);
            })
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

    setSubMenuIcon(menu) {

        // search sub menu and set sub menu icon if finde
        const itemsMenu = menu.querySelectorAll(`nav li`);
        for (let i = 0; i <= itemsMenu.length - 1; i++) {
            if (itemsMenu[i].querySelectorAll('ul').length === 0) {
                continue; // Пропустить элементы без sub menu
            }

            let iconDropdown = document.createElement('div');

            if (Array.isArray(this.iconDropdownClass)) {
                this.iconDropdownClass.forEach(el => {
                    iconDropdown.classList.add(this._clearClassName(el));
                })
                itemsMenu[i].append(iconDropdown);
            } else {
                if (!itemsMenu[i].querySelector(this.iconDropdownClass)) {
                    iconDropdown.classList.add(this.iconDropdownClass.replace(paternDot, "")); // here you can change icon for  menu item that contains submenu
                    itemsMenu[i].append(iconDropdown);
                }

            }
        }
    }

    listenClick(menu) {
        if (!this.arr_nodesToListenClick) {
            throw new Error('Nodes to listen click are absent');
        }
        this.arr_nodesToListenClick.forEach(el => {
            if (Array.isArray(el)) {
                el.forEach(nodeSel => {
                    menu.querySelectorAll(`.${this._clearClassName(nodeSel)}`)
                        .forEach(node => {
                            node.addEventListener('click', this.processingClick.bind(this))
                        });
                })
            }
            menu.querySelectorAll(el).forEach(node => {
                node.addEventListener('click', this.processingClick.bind(this))
            });
        })
    }

    /*
        вешает на ближайшего родителя класс
    */
    processingClick(e) {
        if (Array.isArray(this.activeClass)) {
            this.activeClass.forEach(el => {
                e.target.parentElement.classList.toggle(this._clearClassName(el));
            })

        } else {
            e.target.parentElement.classList.toggle(this._clearClassName(this.activeClass));
        }
    }




    //=====================================================



    // clickOut(menu) {

    // }

    // hover(menu) {

    // }

    // keydown(menu) {

    // }


    //========= helpers ============

    /*
        очистка имён классов
    */

    _clearClassName(str) {
        const paternDot = /^\./;
        return str.replace(paternDot, "")
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
    сontainerMenu: ['.cont-horisont-menu', '.wrap-burger-menu', '#my-menu'],
    toggleOverflow: ['.toggle-overflow-menu', '.show-hide-menu'],
    toggleBurger: ['.toggle-burge', '.toggle-burge-menu'],
    iconDropdownClass: ['.icon-dropdown', 'icon-dropdown-menu'],
    // activeClass: ['.rmbt_active', 'rmbt_active-menu'],
}

const menu = new HorizonalMenu(param);