/* 
    Обеспечивает основной функционал горизонтального меню для всех меню
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


    // классы скрытых пунтков меню или контейнеров
    hiddenMenuCont = {
        overflow: '.overflow-cont',
        drop: '.drop-cont',
    }



    // visibleClass: 'rmbt_visible', // классы для показа любых элементов
    // hiddenClass: 'rmbt-hidden', // классы для скрытия любых элементов

    constructor(param) {
        this.containerMenu = param.containerMenu || '.cont-horizont-menu';
        this.nl_containersMenu = this._getArrNodeLists(this.containerMenu);
        this.toggleOverflow = param.toggleOverflow || '.show-overflow-menu';
        this.iconDropdownClass = param.iconDropdownClass || '.icon-dropdown';

        this.iconDropdownClassOpen = param.iconDropdownModeOpen || '.icon-dropdown_open';

        this.arr_classesForListenClick = param.arr_classesForListenClick || ['.toggle-drop', '.toggle-overflow-menu']; // нет логики!! оптимизировать!!
        this.visibleClass = param.visibleClass || '.rmbt_visible';
        this.hiddenClass = param.hiddenClass || '.rmbt-hidden';

        this.arr_classesForListenClick.push(this.toggleOverflow);
        this.arr_classesForListenClick.push(this.iconDropdownClass);
        this.single = param.single || 'true';


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
                this.menuContainerDrop(contCurrentMenu)
                this.setSubMenuIcon(contCurrentMenu);
                this.listenClick(contCurrentMenu);

                // this.clickOut(arrNodeList[i]);
                // this.hover(arrNodeList[i]);
                // this.keydown(arrNodeList[i]);
            }


            // });
        });
    }

    menuContainerDrop(contCurrentMenu) {

        let subMenu = contCurrentMenu.querySelectorAll('nav>ul ul');

        if (subMenu.length > 0) {
            subMenu.forEach(el => {
                el.classList.add(this._clearClassName(this.hiddenMenuCont.drop), this._clearClassName(this.hiddenClass));
            })
        }
    }

    menuContainerOverflow(contCurrentMenu) {
        let overflowCont = document.createElement('div');
        overflowCont.classList.add(this._clearClassName(this.hiddenMenuCont.overflow), this._clearClassName(this.hiddenClass));

        contCurrentMenu.querySelectorAll('nav>ul>li').forEach(elMenu => {
            if (elMenu.getBoundingClientRect().right > contCurrentMenu.getBoundingClientRect().right) {
                overflowCont.append(elMenu);
            }
        });

        if (overflowCont.childElementCount > 0) {

            this.setOverflowMenuIcon(contCurrentMenu)


            contCurrentMenu.querySelector('nav').append(overflowCont);
        }
        contCurrentMenu.style.visibility = 'visible'; // показываю меню после окончательного формирования
    }

    /* 
        search sub menu and set sub menu icon if finde 
    */
    setSubMenuIcon(contCurrentMenu) {

        if (this.setSubMenuIconOpen(contCurrentMenu)) return;

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

    setSubMenuIconOpen(contCurrentMenu) {

        let exit = false;
        if (contCurrentMenu.classList.contains(this.visibleClass)) {
            if (Array.isArray(this.iconDropdownClass)) {
                this._flattenArray(this.iconDropdownClass).forEach(el => {
                    contCurrentMenu.closest('li').childNodes.forEach(node => {
                        try {
                            if (node.classList.contains(el)) {
                                node.classList.add(this._clearClassName(this.iconDropdownClassOpen));
                                exit = true;
                                return;
                            }
                        } catch {}
                        if (exit) return;
                    })

                    if (exit) return;
                });
            } else {
                if (!itemsMenu[i].querySelector(this.iconDropdownClass)) {
                    contCurrentMenu.closest('li').childNodes.forEach(node => {
                        try {
                            if (node.classList.contains(el)) {
                                node.classList.add(this._clearClassName(this.iconDropdownClassOpen));
                                exit = true;
                                return;
                            }
                        } catch {}
                    })
                    if (exit) return;
                }
            }
        }
        if (exit) return exit;

    }

    setOverflowMenuIcon(contCurrentMenu) {
        let toggleDropMenu = document.createElement('div');
        let span = document.createElement('span');
        toggleDropMenu.append(span);

        if (Array.isArray(this.toggleOverflow)) {
            this._flattenArray(this.toggleOverflow).forEach(el => {
                toggleDropMenu.classList.add(el);
            });
        } else {
            toggleDropMenu.classList.add(this._clearClassName(this.toggleOverflow));
        }

        contCurrentMenu.querySelector('nav').append(toggleDropMenu);
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
        let currentMenu = e.target.parentElement.querySelector(this.hiddenMenuCont.overflow) ||
            e.target.parentElement.querySelector(this.hiddenMenuCont.drop);
        if (!currentMenu) return;
        this.OpenMenu(currentMenu);
    }

    OpenMenu(currentMenu) {

        if (!currentMenu.closest('.rmbt_visible'))
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

            this.setSubMenuIcon(currentMenu);
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
            return document.querySelector(`.${ this.visibleClass }`);
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
    iconDropdownClass: ['.icon-dropdown', 'icon-dropdown-menu'], // определяет внешний вид иконки когда subMenu закрыто

    iconDropdownClassOpen: '.icon-dropdown_open', // Класс который определяет внешний вид иконки когда subMenu открыто. iconDropdownClass НЕбудет удалён

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