/* 
    Обеспечивает основной функционал горизонтального меню для всех меню на странице
        базовые стили в файле horizontalMenu.less

        этим классом обрабатываются ТОЛЬКО теги nav с классами указанными в containersMenu



        при переполнении контейнера пункты меню которые не поместились скрываются в выпадающем меню
        добавляет иконку, icon - dropdown, для активации выпадающего меню 
        реакция на события
            click
                прослушивает событие на всей странице 
                для элементов с классами из classForListenClick открывает и закрывает скрытое меню 
                    добавляея либо удаляет классы visibleClass - hiddenClass или средствами gsap

    todo:

        overflow-cont  додлжен выезжать из за правой границы окна

        перенести .icon-drop в ссылку


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
        burger: 'burger-cont',
    }

    // объект, модификаторы классов для различия разных типов меню
    modifiers = {
        drop: 'drop',
        overflow: 'overflow',
        burger: 'burger',
    }

    // пользаватеьские классы определяющие внешний вид открытых пунтков меню или контейнеров
    contAdditionalClasses = {
        drop: [],
        overflow: [],
        burger: [],
    }

    /*
        const param = {
            containersMenu: ['.cont-horizont-menu', '.wrap-drop-menu', '#my-menu'], // селекторы контейнеров меню которые будут обрабатываться
            modifiers = {      // объект, модификаторы классов для различия разных типов меню
                    drop:'drop',
                    overflow:'overflow',
                    burger:'burger',
            }
            
            visibleClass: 'rmbt-visible', // классы для показа элементов
            hiddenClass: 'rmbt-hidden', // классы для скрытия элементов

            iconDropClass: '.icon-drop', // определяет внешний вид иконки когда subMenu закрыто 
            iconDropClassOpen: '.icon-drop_open', // Класс который определяет внешний вид иконки когда subMenu открыто. iconDropClass НЕбудет удалён
            
            iconOverflow: '.icon-overflow', // определяет внешний вид иконки overflow menu
            iconOverflowOpen: '.icon-overflow_open', // определяет внешний вид иконки overflow menu когда overflow menu открыто
            
            iconBurger: 'icon-drop', // определяет внешний вид иконки Burgerr menu
            iconBurgerOpen: 'icon-drop_open', // определяет внешний вид иконки Burgerr menu когда Burgerr menu открыто  iconBurger НЕбудет удалён
            
            // single: 'false', // допускает одновременное открытие нескольких меню т.е. открытие следующего меню не закрывает предидущее

            contAdditionalClasses: { // пользаватеьские классы определяющие внешний вид открытых пунтков меню или контейнеров
                drop: [],
                overflow: [],
                burger: [],
            },  

        };

    */

    constructor(param) {
        this.containersMenu = param.containersMenu || '.cont-horizont-menu';
        this.nl_containersMenu = this._getArrNodeLists(this.containersMenu);
        if (this.nl_containersMenu.length === null) throw new Error('Menus with given selectors  are absent on this page');
        this.contAdditionalClasses = param.contAdditionalClasses;
        this.iconOverflow = this._clearClassName(param.iconOverflow || 'icon-overflow');
        this.iconBurger = this._clearClassName(param.iconBurger || 'icon-burger');
        this.iconBurgerOpen = this._clearClassName(param.iconBurgerOpen || 'icon-burger_open');
        this.iconDropClass = this._clearClassName(param.iconDropClass || 'icon-drop');
        this.iconDropClassOpen = this._clearClassName(param.iconDropdownmodifiereOpen || 'icon-drop_open');

        this.visibleClass = this._clearClassName(param.visibleClass || 'rmbt-visible');
        this.hiddenClass = this._clearClassName(param.hiddenClass || 'rmbt-hidden');
        this.single = param.single || 'true';

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
                this.setBurgerIcon(contCurrentMenu);
            }
        });
    }

    menuContainerDrop(contCurrentMenu) {

        let subMenus = contCurrentMenu.querySelectorAll('nav>ul ul');
        if (subMenus.length > 0) {
            subMenus.forEach(subMenu => {
                subMenu.classList.add(this.hiddenMenuCont.drop, this.hiddenClass);
                this.setAdditionalClassesToCont(subMenu, 'drop');
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
            this.setOverflowIcon(contCurrentMenu)
            contCurrentMenu.querySelector('nav').append(overflowCont);
            this.setAdditionalClassesToCont(overflowCont, 'overflow');
        }
        contCurrentMenu.style.visibility = 'visible'; // показываю меню после окончательного формирования
    }

    setAdditionalClassesToCont(currentMenu, typeMenu) {

        if (typeMenu === 'overflow') {
            classesIteration(this.contAdditionalClasses.overflow);
        } else if (typeMenu === 'drop') {
            classesIteration(this.contAdditionalClasses.drop);
        } else if (typeMenu === 'burger') {
            classesIteration(this.contAdditionalClasses.burger);
        }

        function classesIteration(arrClassies) {
            arrClassies.forEach(_class => currentMenu.classList.add(_class))
        }
    }

    /* 
        search sub menu and set sub menu icon if finde
    */
    setSubMenuIcon(contCurrentMenu) {
        const itemsMenu = contCurrentMenu.querySelectorAll(`nav li`);
        for (let i = 0; i <= itemsMenu.length - 1; i++) {
            if (itemsMenu[i].querySelectorAll('ul').length === 0) continue; // Пропустить элементы без sub menu
            let iconDropdown = document.createElement('div');
            if (!itemsMenu[i].querySelector(`.${this.iconDropClass}`)) {
                iconDropdown.classList.add(this.iconDropClass);
            }
            itemsMenu[i].append(iconDropdown);
        }
    }

    setOverflowIcon(contCurrentMenu) {

        let iconOverflow = document.createElement('div');
        let span = document.createElement('span');
        iconOverflow.append(span);
        iconOverflow.classList.add(this.iconOverflow);
        contCurrentMenu.querySelector('nav').append(iconOverflow);
    }

    setBurgerIcon(contCurrentMenu) {
        let iconBurger = document.createElement('div');
        let iconBurgerSpan = document.createElement('span');
        iconBurger.classList.add(this.iconBurger);
        iconBurger.append(iconBurgerSpan);
        contCurrentMenu.prepend(iconBurger);
    }

    changeStateIconMenu(currentMenu, modifier, state) {

        switch (modifier) {
            case this.modifiers.drop:
                let parentLi = currentMenu.closest('li');
                if (parentLi === null) {
                    return;
                }
                parentLi.childNodes.forEach(node => {
                    try {
                        if (node.classList.contains(this.iconDropClass)) {
                            if (state == 'open') {
                                node.classList.add(this.iconDropClassOpen);
                                exit = true;
                                return;
                            } else if (state == 'close') {
                                node.classList.remove(this.iconDropClassOpen);
                                exit = true;
                                return;
                            }
                        }
                    } catch {}
                })
                break

            case this.modifiers.burger:
                this.containersMenu.forEach(menuSel => {
                    let parrentMenu = currentMenu.closest(menuSel);

                    if (parrentMenu) {
                        let iconBurger = parrentMenu.querySelector(`.${this.iconBurger}`);

                        if (state == 'open') {

                            iconBurger.classList.add(this.iconBurgerOpen);
                            currentMenu.prepend(iconBurger);

                        } else if (state == 'close') {
                            iconBurger.classList.remove(this.iconBurgerOpen);
                            parrentMenu.append(iconBurger);
                        }
                    }
                })

                break

            case this.modifiers.overflow:
                break
                // default:
                //   break
        }
    }

    listenClick() {

        document.addEventListener('click', e => {
            let target = e.target;

            if (target.classList.contains(this.iconDropClassOpen)) {
                let parentMenu = target.closest('li');
                let currentMenu = parentMenu.querySelector(`.${this.hiddenMenuCont.drop}`);
                this.closeMenu(currentMenu, this.modifiers.drop);
            } else if (target.classList.contains(this.iconBurgerOpen)) {
                let currentMenu = target.closest(`.${this.visibleClass}_${this.modifiers.burger}`);
                this.closeMenu(currentMenu, this.modifiers.burger);
            } else if (target.classList.contains(this.iconDropClass)) {
                let currentMenu = target.closest('li').querySelector(`.${this.hiddenMenuCont.drop}`);
                this.OpenMenu(currentMenu, this.modifiers.drop);
            } else if (target.classList.contains(this.iconOverflow) || target.closest(`.${this.iconOverflow}`)) {
                let currentMenu = target.closest('nav').querySelector(`.${this.hiddenMenuCont.overflow}`);
                this.OpenMenu(currentMenu, this.modifiers.overflow);
            } else if (target.classList.contains(this.iconBurger)) {
                this.containersMenu.forEach(menuSel => {
                    if (target.closest(menuSel)) {
                        let currentMenu = target.closest(menuSel).querySelector(`nav`);
                        this.OpenMenu(currentMenu, this.modifiers.burger);
                    }
                })
            } else {
                this.clickOut();
            }

        });
    }


    ///!!!!!!!!!!   при открытиии нового бургер меню ранее открытые закрываются но иконка бургер меню не возвращается


    closeMenu(currentMenu, modifier) {

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
            currentMenu.classList.remove(this.visibleClass + '_' + modifier);
            currentMenu.classList.add(this.hiddenClass);
        }


        this.changeStateIconMenu(currentMenu, modifier, 'close')
    }

    OpenMenu(currentMenu, modifier) {

        this.checSingle(currentMenu);

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
            currentMenu.classList.add(this.visibleClass + '_' + modifier);
        }
        this.changeStateIconMenu(currentMenu, modifier, 'open')
    }


    checSingle(currentMenu) {

        if (this.single !== 'true') {
            return null;
        }

        let flaf = 0;
        let arr_values = Object.values(this.modifiers);

        for (var i = arr_values.length - 1; i >= 0; i--) {
            if (currentMenu.closest(`.${this.visibleClass}_${arr_values[i]}`)) {
                flaf = 1;
                break;
            }
        }

        if (flaf == 0) {
            let openedMenu = this._getAllOpenMenus();
            if (openedMenu.length > 0) {
                openedMenu.forEach(openedMenu => {
                    this.closeMenu(openedMenu)
                })
            }
        }
    }

    clickOut() {

        let nl_menus = this._getAllOpenMenus();

        if (nl_menus.length > 0) nl_menus.forEach(menu => {
            if (menu.classList.contains(this.visibleClass + '_' + this.modifiers.drop)) {
                this.closeMenu(menu, 'drop');
            } else if (menu.classList.contains(this.visibleClass + '_' + this.modifiers.burger)) {
                this.closeMenu(menu, 'burger');
            } else if (menu.classList.contains(this.visibleClass + '_' + this.modifiers.overflow)) {
                this.closeMenu(menu, 'overflow');
            }
        });
    }

    listenKeydown() {

        document.addEventListener('keydown', e => {
            if (e.which === 27) {
                let nl_menus = this._getAllOpenMenus();
                if (nl_menus.length > 0) nl_menus.forEach(menu => {
                    if (menu.classList.contains(this.visibleClass + '_' + this.modifiers.drop)) {
                        this.closeMenu(menu, 'drop');
                    } else if (menu.classList.contains(this.visibleClass + '_' + this.modifiers.burger)) {
                        this.closeMenu(menu, 'burger');
                    } else if (menu.classList.contains(this.visibleClass + '_' + this.modifiers.overflow)) {
                        this.closeMenu(menu, 'overflow');
                    }
                });
            }
        })
    }

    //========= helpers ============

    /*
        удаляет повторяющиеся значения
    */
    _uniqueArr(arr) {
        return [...new Set(arr.map(el => {
            if (typeof str === 'string') this._clearClassName(el);
        }).filter(item => item !== undefined))];
    }

    /*
          очистка имён классов
      */

    _clearClassName(str) {

        if (typeof str !== 'string') {
            return '';
        }
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

    _getAllOpenMenus() {


        let entries = Object.entries(this.modifiers);
        let arr_menu = entries.map(([key, mod]) => [...document.querySelectorAll(`.${this.visibleClass}_${mod}`)]);
        arr_menu = arr_menu.flat();

        return arr_menu;
        // return arr_menu.filter(el => el.length > 0);
    }
}

const param = {
    containersMenu: ['.cont-horizont-menu', '.wrap-drop-menu', '#my-menu'],
    contAdditionalClasses: {
        drop: ['add-drop-1', 'add-drop-2', 'add-drop-3'],
        overflow: ['add-overflow-1', 'add-overflow-2', 'add-overflow-3'],
        burger: ['add-burger-1', 'add-burger-2', 'add-burger-3'],
    }
};

const menu = new HorizontalMenu(param);