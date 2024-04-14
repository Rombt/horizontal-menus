/* 
    Обеспечивает основной функционал горизонтального меню для всех меню на странице
        базовые стили в файле horizontalMenu.less

    поиск меню - на основе css селектору обёртки меню
    обработка событий меню - по css селектору соответствующих элементов(иконок, кнопок) без классов(!)

    основные функции:
        при переполнении контейнера пункты меню которые не поместились скрываются в выпадающем меню
        добавляет иконку, icon - dropdown, для активации выпадающего меню 
        реакция на события
            click
                прослушивает событие на всей странице 
                для элементов с классами из classForListenClick открывает и закрывает скрытое меню 
                    добавляея либо удаляет классы visibleClass - hiddenClass или средствами gsap

    todo:

        добавить все те манипуляции из dropprocessingClick() блокировка body и прочее
        возможность отключать icon - dropdown для меню desk top независимо от мобильной версии из html
        обработка такой ситуации:
            для каждого меню должен быть только один элемент с классом активации на странице
        при этом добавление класса активации должно убирать этот класс с других элементов если они не родители
    */

class HorizontalMenu {

    // классы скрытых пунтков меню или контейнеров
    hiddenMenuCont = {
        overflow: 'overflow-cont',
        drop: 'drop-cont',
    }

    classForListenClick = [];

    // const param = {
    //     containerMenu: ['.cont-horizont-menu', '.wrap-drop-menu', '#my-menu'], // селекторы контейнеров меню которые будут обрабатываться
    //     iconDropdownClass: '.icon-dropdown', // определяет внешний вид иконки когда subMenu закрыто 
    //     iconDropdownClassOpen: '.icon-dropdown_open', // Класс который определяет внешний вид иконки когда subMenu открыто. iconDropdownClass НЕбудет удалён
    //     visibleClass: 'rmbt_visible', // классы для показа элементов
    //     hiddenClass: 'rmbt-hidden', // классы для скрытия элементов
    //     toggleOverflow: '.toggle-overflow-menu', // определяет внешний вид иконки overflow menu
    //     toggleBurger: 'icon-dropdown', // определяет внешний вид иконки Burgerr menu
    //     classForListenClick: [], // классы элементов на которых будет прослушивание click (для открывания и закрывания меню)
    //     // single: 'false', // допускает одновременное открытие нескольких меню т.е. открытие следующего меню не закрывает предидущее
    // };

    constructor(param) {
        this.containerMenu = param.containerMenu || '.cont-horizont-menu';
        this.nl_containersMenu = this._getArrNodeLists(this.containerMenu);
        this.toggleOverflow = this._clearClassName(param.toggleOverflow || 'toggle-overflow-menu');
        this.toggleBurger = this._clearClassName(param.toggleBurger || 'toggle-Burgerr');
        this.iconDropdownClass = this._clearClassName(param.iconDropdownClass || 'icon-dropdown');
        this.iconDropdownClassOpen = this._clearClassName(param.iconDropdownModeOpen || 'icon-dropdown_open');
        this.visibleClass = this._clearClassName(param.visibleClass || 'rmbt_visible');
        this.hiddenClass = this._clearClassName(param.hiddenClass || 'rmbt-hidden');
        this.single = param.single || 'true';

        this.classForListenClick.push(this.toggleOverflow);
        this.classForListenClick.push(this.iconDropdownClass);
        this.classForListenClick.push(this.toggleBurger);
        if (param.classForListenClick) this.classForListenClick.push(param.classForListenClick); // а нужно ли??


        if (this.nl_containersMenu.length === null) {
            throw new Error('Menus with given selectors  are absent on this page');
        }

        this.forEachMenu();
        this.listenClick();
        this.listenKeydown();
    }

    forEachMenu() {
        this.nl_containersMenu.forEach(arrNodeList => {
            for (let i = 0; i <= arrNodeList.length - 1; i++) {
                let contCurrentMenu = arrNodeList[i];

                if (!contCurrentMenu.querySelector('nav')) continue;

                this.menuContainerDrop(contCurrentMenu);
                this.menuContainerOverflow(contCurrentMenu);
                this.setSubMenuIcon(contCurrentMenu);

                this.setBurgerMenuIcon(contCurrentMenu);

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
                el.classList.add(this.hiddenMenuCont.drop, this.hiddenClass);
            })
        }
    }

    menuContainerOverflow(contCurrentMenu) {
        let overflowCont = document.createElement('ul');
        overflowCont.classList.add(this.hiddenMenuCont.overflow, this.hiddenClass);

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
        const itemsMenu = contCurrentMenu.querySelectorAll(`nav li`);
        for (let i = 0; i <= itemsMenu.length - 1; i++) {
            if (itemsMenu[i].querySelectorAll('ul').length === 0) continue; // Пропустить элементы без sub menu
            let iconDropdown = document.createElement('div');
            if (!itemsMenu[i].querySelector(`.${this.iconDropdownClass}`)) {
                iconDropdown.classList.add(this.iconDropdownClass);
            }
            itemsMenu[i].append(iconDropdown);
        }
    }

    setSubMenuIconOpen(contCurrentMenu) {
        let parentLi = contCurrentMenu.closest('li');
        if (parentLi === null) {
            return;
        }
        parentLi.childNodes.forEach(node => {
            try {
                if (node.classList.contains(this.iconDropdownClass)) {
                    node.classList.add(this.iconDropdownClassOpen);
                    exit = true;
                    return;
                }
            } catch {}
        })
    }

    setOverflowMenuIcon(contCurrentMenu) {

        let toggleDropMenu = document.createElement('div');
        let span = document.createElement('span');
        toggleDropMenu.append(span);
        toggleDropMenu.classList.add(this.toggleOverflow);
        toggleDropMenu.classList.add(this.classForListenClick);
        contCurrentMenu.querySelector('nav').append(toggleDropMenu);
    }

    setBurgerMenuIcon(contCurrentMenu) {
        let toggleBurgerCont = document.createElement('div');
        let toggleBurgerSpan = document.createElement('span');
        toggleBurgerCont.classList.add('toggle-burger');
        toggleBurgerCont.append(toggleBurgerSpan);
        contCurrentMenu.prepend(toggleBurgerCont);
    }

    listenClick() {
        if (!this.classForListenClick) {
            throw new Error('Nodes to listen click are absent');
        }

        document.addEventListener('click', e => {
            let exit = 0;
            let target = e.target;
            if (Array.isArray(this.classForListenClick)) {
                this.classForListenClick.forEach(el => {
                    if (target.classList.contains(el) ||
                        target.parentNode.classList.contains(el)
                    ) {
                        this.processingClick(target);
                        exit = 1;
                        return;
                    } else if (target.parentNode.classList.contains(el)) {
                        this.processingClick(target.parentNode);
                        exit = 1;
                        return;
                    }
                })
            }
            if (exit) return;

            if (target.classList.contains(this.hiddenMenuCont.drop) || // click внутри контейнеров меню либо их потомков но не ссыллок 
                target.classList.contains(this.hiddenMenuCont.overflow) ||
                target.parentNode.classList.contains(this.hiddenMenuCont.drop) ||
                target.parentNode.classList.contains(this.hiddenMenuCont.overflow)) return;
            this.clickOut();
        });
    }

    listenKeydown() {

        document.addEventListener('keydown', e => {

            if (e.which === 27) {
                let nl_menus = this._getAllOpenMenus();
                if (nl_menus.length > 0) nl_menus.forEach(menu => this.closeMenu(menu));
            }
        })
    }

    processingClick(menuIcon) {

        if (menuIcon.classList.contains(this.iconDropdownClassOpen)) {
            menuIcon.classList.remove(this.iconDropdownClassOpen);
            let ulVisible = menuIcon.closest('li').querySelector(`ul.${this.visibleClass}`);
            if (ulVisible) this.closeMenu(ulVisible);
            menuIcon.classList.replace(this.iconDropdownClassOpen, this.hiddenClass);
            return;
        }

        let currentMenu = menuIcon.parentElement.querySelector(`.${this.hiddenMenuCont.overflow}`) ||
            menuIcon.parentElement.querySelector(`.${this.hiddenMenuCont.drop}`);
        if (!currentMenu) return;

        this.OpenMenu(currentMenu);
    }

    OpenMenu(currentMenu) {

        if (!currentMenu.closest(`.${this.visibleClass}`)) {
            if (this.checSingle() !== null) this.closeMenu(this.checSingle());
        }

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

        this.setSubMenuIconOpen(currentMenu)
    }

    closeMenu(menu) {

        let nl_subMenus = menu.querySelectorAll('ul');

        if (nl_subMenus.length > 0) {
            nl_subMenus.forEach(subMenu => close.call(this, subMenu))
        }
        close.call(this, menu);

        function close(menu) {

            if (!menu.classList.contains(this.hiddenMenuCont.overflow)) {
                let iconMenuOpen = menu.closest('li').querySelector(`.${this.iconDropdownClassOpen}`);
                if (iconMenuOpen) iconMenuOpen.classList.remove(this.iconDropdownClassOpen);
            }

            menu.classList.remove(this.visibleClass);
            menu.classList.add(this.hiddenClass);
        }
    }

    clickOut() {

        let nl_menus = this._getAllOpenMenus();

        if (nl_menus.length > 0) nl_menus.forEach(menu => this.closeMenu(menu));
    }

    checSingle() {

        if (this.single === 'true') {
            return document.querySelector(`.${ this.visibleClass }`);
        }
        return null;
    }

    //=====================================================

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

    _getAllOpenMenus() {
        return document.querySelectorAll(`.${this.visibleClass}`)
    }
}

const param = {
    containerMenu: ['.cont-horizont-menu', '.wrap-drop-menu', '#my-menu'],
};

const menu = new HorizontalMenu(param);