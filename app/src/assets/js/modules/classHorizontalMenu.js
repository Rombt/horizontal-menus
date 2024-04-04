/* Обеспечивает основной функционал горизонтального меню для всех меню
    *
    базовые стили в файле horizontalMenu.less

поиск меню - на основе css селектору обёртки меню
обработка событий меню - по css селектору соответствующих элементов(иконок, кнопок)
селекторы могут передаваться как строкой так и массивом

    *
    основные функции:
    *
    при переполнении контейнера пункты меню которые не поместились скрываются в выпадающем меню
добавляет иконку, icon - dropdown, для активации выпадающего меню с классами указанными в массиве
icon - dropdown для десктопа и мобильной версии могут быть разными и устанавливаются в scc *
    реакция на события
click
прослушивает событие для элементов из param.toggleOverflow и param.iconDropdownClass,
    а также все те элементы которые будут добавлены в arr_classesForListenClick
по событию добавляет либо удаляет класс указанный в param.visibleClass
по умолчанию rmbt_active на ближайшего родителя элемента

todo:

    !!!скрытие любого элемента только путём назначение ему класса 'rmbt-hidden'
показ элемента только путём назначение ему класса '.rmbt_visible'
или средствами gsap



добавить все те манипуляции из dropProcEssingClick() блокировка body и прочее
возможность отключать icon - dropdown для меню desk top независимо от мобильной версии из html
обработка такой ситуации:
    для каждого меню должен быть только один элемент с классом активации на странице
при этом добавление класса активации должно убирать этот класс с других элементов если они не родители
    */


class HorizontalMenu {







    //================================================================

    // классы скрытых пунтков меню или контейнеров
    hiddenMenuCont = {
        overflow: '.overflow-drop-cont',
        drop: 'ul',
    }


    constructor(param) {
        this.containerMenu = param.containerMenu || '.cont-horizont-menu';
        this.nl_containersMenu = this._getArrNodeLists(this.containerMenu);
        this.toggleOverflow = param.toggleOverflow || '.show-overflow-menu';
        this.iconDropdownClass = param.iconDropdownClass || '.icon-dropdown';
        this.arr_classesForListenClick = param.arr_classesForListenClick || ['.toggle-drop', '.toggle-overflow-menu']; // нет логики!! оптимизировать!!
        this.visibleClass = param.visibleClass || '.rmbt_visible';
        this.hiddenClass = param.hiddenClass || '.hiddenClass';


        this.arr_classesForListenClick.push(this.toggleOverflow);
        this.arr_classesForListenClick.push(this.iconDropdownClass);
        this.single = param.single || 'true';


        // this.visibleClass = param.visibleClass || '.rmbt_visible';

        if (this.nl_containersMenu.length === null) {
            throw new Error('Menus with given selectors  are absent on this page');
        }

        this.forEachMenu();
    }

    forEachMenu() {
        this.nl_containersMenu.forEach(arrNodeList => {
            for (let i = 0; i <= arrNodeList.length - 1; i++) {
                let contCurrentMenu = arrNodeList[i];

                if (!contCurrentMenu.querySelector('nav')) continue;

                this.menuContainerOverflow(contCurrentMenu);
                this.setSubMenuIcon(contCurrentMenu);
                this.listenClick(contCurrentMenu);






                // this.clickOut(arrNodeList[i]);
                // this.hover(arrNodeList[i]);
                // this.keydown(arrNodeList[i]);
            }


            // });
        });
    }

    menuContainerOverflow(contCurrentMenu) {
        let overflowDropContainer = document.createElement('div');
        overflowDropContainer.classList.add(this._clearClassName(this.hiddenMenuCont.overflow), this._clearClassName(this.hiddenClass));
        contCurrentMenu.querySelectorAll('nav>ul>li').forEach(elMenu => {
            if (elMenu.getBoundingClientRect().right > contCurrentMenu.getBoundingClientRect().right) {
                overflowDropContainer.append(elMenu);
            }
        });

        if (overflowDropContainer.childElementCount > 0) {

            let toggleOverflowMenu = document.createElement('div');
            let span = document.createElement('span');
            toggleOverflowMenu.append(span);

            if (Array.isArray(this.toggleOverflow)) {
                this._flattenArray(this.toggleOverflow).forEach(el => {
                    toggleOverflowMenu.classList.add(el);
                });
            } else {
                toggleOverflowMenu.classList.add(this._clearClassName(this.toggleOverflow));
            }

            contCurrentMenu.querySelector('nav').append(toggleOverflowMenu);
            contCurrentMenu.querySelector('nav').append(overflowDropContainer);
        }
        contCurrentMenu.style.visibility = 'visible'; // показываю меню после окончательного формирования
    }

    setSubMenuIcon(contCurrentMenu) {
        //     // search sub menu and set sub menu icon if finde
        const itemsMenu = contCurrentMenu.querySelectorAll(`nav li`);
        for (let i = 0; i <= itemsMenu.length - 1; i++) {
            if (itemsMenu[i].querySelectorAll('ul').length === 0) continue; // Пропустить элементы без sub menu
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

    listenClick(contCurrentMenu) {
        if (!this.arr_classesForListenClick) {
            throw new Error('Nodes to listen click are absent');
        }
        this._flattenArray(this.arr_classesForListenClick).forEach(classeForListenClick => {
            contCurrentMenu.querySelectorAll(`.${classeForListenClick}`).forEach(node => {
                node.addEventListener('click', this.procEssingClick.bind(this));
            });
        });
    }

    procEssingClick(e) {
        let currentMenu = e.target.parentElement.querySelector(this.hiddenMenuCont.overflow);
        if (!currentMenu) return;
        this.OpenMenu(currentMenu);
    }

    OpenMenu(currentMenu) {

        if (this.checSingle() !== null) this.closeMenu(this.checSingle());


        try {

            gsap.to(currentMenu, {
                duration: 1,
                ease: "power4.inOut",
                height: 'auto',
                overflow: 'visible',
                pointerEvents: 'auto',
                opacity: 1,
                width: 'auto',
            });

        } catch {


            currentMenu.classList.remove(this.hiddenClass);
            currentMenu.classList.add(this.visibleClass);
        }


    }

    closeMenu(menu) {

        menu.classList.remove(this.visibleClass);
        menu.classList.add(this.hiddenClass);
    }


    //=====================================================

    // clickOut(menu) {

    // }

    // hover(menu) {

    // }

    // keydown(menu) {

    // }


    checSingle() {

        if (this.single === 'true') {
            return document.querySelector(`.${this.visibleClass}`);
        }
        return null;
    }

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
    containerMenu: ['.cont-horizont-menu', '.wrap-drop-menu', '#my-menu'],
    iconDropdownClass: ['.icon-dropdown', 'icon-dropdown-menu'],
    arr_classesForListenClick: ['.bonus-icon', 'some-icon'],
    visibleClass: 'rmbt_visible', // классы для показа любых элементов
    hiddenClass: 'rmbt-hidden', // классы для скрытия любых элементов



    // toggleDrop: ['.toggle-drop', '.toggle-drop-menu'],
    // iconDropdownClass: ['newToggle'],
    // toggleOverflow: ['.toggle-overflow-menu', '.show-hide-menu'],


    // openingMode: 


    // single: 'false', // допeскает одновременное открытие нескольких меню 
};

const menu = new HorizontalMenu(param);