/*
 *   Обеспечивает основной функционал горизонтального меню для всех меню
 *   базовые стили в файле horizontalMenu.less
        
        поиск меню - на основе css селектору обёртки меню 
        обработка событий меню - по css селектору соответствующих элементов (иконок, кнопок)
        селекторы могут передаваться как строкой так и массивом

 *   основные функции:
 *      при переполнении контейнера пункты меню которые не поместились скрываются в выпадающем меню
        добавляет иконку, icon-dropdown, для активации выпадающего меню с классами указанными в массиве
            icon-dropdown для десктопа и мобильной версии могут быть разными и устанавливаются в scc 
 *      реакция на события
            click
                прослушивает событие для элементов из param.toggleOverflow и param.iconDropdownClass, 
                    а также все те элементы которые будут добавлены в arr_nodesToListenClick
                по событию добавляет либо удаляет класс указанный в param.activeClass
                по умолчанию rmbt_active на ближайшего родителя элемента

    todo:
        возможность отключать icon-dropdown для меню desk top независимо от мобильной версии из html 
        обработка такой ситуации:
            для каждого меню должен быть только один элемент с классом активации на странице
                при этом добавление класса активации должно убирать этот класс с других элементов если они не родители
 *   
 */

class HorizontalMenu {
    constructor(param) {
        this.containerMenu = param.containerMenu || '.cont-horizont-menu';
        this.nl_containersMenu = this._getArrNodeLists(this.containerMenu);

        this.toggleOverflow = param.toggleOverflow || '.show-overflow-menu';
        this.iconDropdownClass = param.iconDropdownClass || '.icon-dropdown';

        this.arr_nodesToListenClick = param.arr_nodesToListenClick || ['.toggle-burger', '.toggle-overflow-menu', '.toggle-overflow-menu', '.toggle-overflow-menu'];



        // console.log("***this.arr_nodesToListenClick", this.arr_nodesToListenClick);

        this.arr_nodesToListenClick.push(this.toggleOverflow);
        this.arr_nodesToListenClick.push(this.iconDropdownClass);

        // console.log("+++this.arr_nodesToListenClick", this.arr_nodesToListenClick);

        this.activeClass = param.activeClass || '.rmbt_active';

        if (this.nl_containersMenu.length === null) {
            throw new Error('Menus with given selectors  are absent on this page');
        }

        this.forEachMenu();
    }

    forEachMenu() {
        this.nl_containersMenu.forEach(arrNodeList => {
            for (let i = 0; i <= arrNodeList.length - 1; i++) {

                if (!arrNodeList[i].querySelector('nav')) continue;

                this.menuContainerOverflow(arrNodeList[i]);
                this.setSubMenuIcon(arrNodeList[i]);
                this.listenClick(arrNodeList[i]);

                // this.clickOut(arrNodeList[i]);
                // this.hover(arrNodeList[i]);
                // this.keydown(arrNodeList[i]);
            }


            // });
        });
    }

    menuContainerOverflow(menu) {
        let overflowDropContainer = document.createElement('div');
        overflowDropContainer.classList.add('menu-overflow-drop-cont', 'hidden');
        menu.querySelectorAll('nav>ul>li').forEach(elMenu => {
            if (elMenu.getBoundingClientRect().right > menu.getBoundingClientRect().right) {
                overflowDropContainer.append(elMenu);
            }
        });

        if (overflowDropContainer.childElementCount > 0) {
            if (Array.isArray(this.toggleOverflow)) {
                this._flattenArray(this.toggleOverflow).forEach(el => {
                    if (menu.querySelector(el)) menu.querySelector(el).classList.remove('hidden');
                });
            } else {
                if (menu.querySelector(this.toggleOverflow)) menu.querySelector(this.toggleOverflow).classList.remove('hidden');
            }

            let toggleOverflowMenu = document.createElement('div');
            let span = document.createElement('span');
            toggleOverflowMenu.append(span);
            toggleOverflowMenu.classList.add('toggle-overflow-menu');

            menu.querySelector('nav').append(toggleOverflowMenu);
            menu.querySelector('nav').append(overflowDropContainer);
        }
        menu.style.visibility = 'visible'; // показываю меню после окончательного формирования
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
                this._flattenArray(this.iconDropdownClass).forEach(el => {
                    iconDropdown.classList.add(this._clearClassName(el));
                });
                itemsMenu[i].append(iconDropdown);
            } else {
                if (!itemsMenu[i].querySelector(this.iconDropdownClass)) {
                    iconDropdown.classList.add(this._clearClassName(this.iconDropdownClass));
                    itemsMenu[i].append(iconDropdown);
                }
            }
        }
    }

    listenClick(menu) {
        if (!this.arr_nodesToListenClick) {
            throw new Error('Nodes to listen click are absent');
        }

        this._flattenArray(this.arr_nodesToListenClick).forEach(el => {
            menu.querySelectorAll(`.${el}`).forEach(node => {
                node.addEventListener('click', this.processingClick.bind(this));
            });
        });
    }

    /*
        вариант 1
            вешает на ближайшего родителя все классы из массива activeClass
        вариант 2 
            задавать в параметрах какому меню какой класс активации вешать  -- нужно ли?? 
                проще одноимённые классы изолировать внутри селектора родителя
    */
    processingClick(e) {
        if (Array.isArray(this.activeClass)) {
            this._flattenArray(this.activeClass).forEach(el => {
                e.target.parentElement.classList.toggle(this._clearClassName(el));
            });
        } else {
            e.target.parentElement.classList.toggle(this._clearClassName(this.activeClass));
        }

        // обработка такой ситуации:
        //     для каждого меню должен быть только один элемент с классом активации на странице
        //         при этом добавление класса активации должно убирать этот класс с других элементов есле они не родители
        //             e.target.classList.toggle('icon-dropdown_open');
        //             if (e.target.classList.contains('icon-dropdown_open')) {
        //                 subMenuOpen(e);
        //             } else {
        //                 subMenuClose(e);
        //             }

        /*
            если на странице есть элемент который содержит хотя бы один класс из массива activeClass 
            то этот класс у него нужно удалить
            а также все те манипуляции из burgerMenuOpen() блокировка bode и прочее

        */




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
        преобразует одномерный массив из n-мерного массива
    */
    _flattenArray(arr) {
        let flatArray = [];
        arr.forEach(element => {
            if (Array.isArray(element)) {
                flatArray.push(...this._flattenArray(element));
            } else {
                flatArray.push(element);
            }
        });
        return this._uniqueArr(flatArray);
    }

    /*
        удаляет повторяющиеся значения
    */
    _uniqueArr(arr) {

        // let _arr = arr.map(el => _clearClassName(el))

        return [...new Set(arr.map(el => this._clearClassName(el)))];
    }

    /*
          очистка имён классов
      */

    _clearClassName(str) {
        const patternDot = /^\./;
        return str.replace(patternDot, '');
    }

    /*
          возвращает массив nodeList элементов по их селекторам
      */
    _getArrNodeLists(date) {
        if (Array.isArray(date)) {
            return date.map(el => document.querySelectorAll(el));
        } else {
            return [document.querySelectorAll(date)];
        }
    }
}

const param = {
    containerMenu: ['.cont-horizont-menu', '.wrap-burger-menu', '#my-menu'],
    iconDropdownClass: ['.icon-dropdown', 'icon-dropdown-menu'],
    toggleBurger: ['.toggle-burger', '.toggle-burger-menu'],
    iconDropdownClass: ['newToggle'],
    activeClass: ['.rmbt_active', 'rmbt_active-menu'],
    toggleOverflow: ['.toggle-overflow-menu', '.show-hide-menu'],
    arr_nodesToListenClick: ['.bonus-icon', 'some-icon'],
};

const menu = new HorizontalMenu(param);