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

        при клике на icon-drop внутри overflow-cont иконка переворачивается но submenu не показывается


        Обязательно добавить возможность вешать на hiddenMenuCont классы для дополнительной стилизации типа добавить тени градиенты и прочее
        в результате должно получится что в базовых стилях и js каркас а визуальная стилизация доп классами без необходимости зализать в horizontalMenu.less (!!!) причём добавление их должно происходить и динамически в том числе
        overflow-cont  додлжен выезжать из за правой границы окна
        клик на дочерний span в icon-overflow не срабатывает!



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

    modifiers = { // объект, модификаторы классов для различия разных типов меню
        drop: 'drop',
        overflow: 'overflow',
        burger: 'burger',
    }

    classForListenClick = [];

    /*
        const param = {
            containersMenu: ['.cont-horizont-menu', '.wrap-drop-menu', '#my-menu'], // селекторы контейнеров меню которые будут обрабатываться

            ??!! classForListenClick: [], // классы элементов на которых будет прослушивание click (для открывания и закрывания меню)
           

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
            iconBurgerOpen: 'icon-drop_open', // определяет внешний вид иконки Burgerr menu когда Burgerr menu открыто
            
            // single: 'false', // допускает одновременное открытие нескольких меню т.е. открытие следующего меню не закрывает предидущее
        };

    */

    constructor(param) {
        this.containersMenu = param.containersMenu || '.cont-horizont-menu';
        this.nl_containersMenu = this._getArrNodeLists(this.containersMenu);
        if (this.nl_containersMenu.length === null) throw new Error('Menus with given selectors  are absent on this page');

        this.iconOverflow = this._clearClassName(param.iconOverflow || 'icon-overflow');
        this.iconBurger = this._clearClassName(param.iconBurger || 'icon-burger');
        this.iconDropClass = this._clearClassName(param.iconDropClass || 'icon-drop');
        this.iconDropClassOpen = this._clearClassName(param.iconDropdownmodifiereOpen || 'icon-drop_open');
        this.visibleClass = this._clearClassName(param.visibleClass || 'rmbt-visible');
        this.hiddenClass = this._clearClassName(param.hiddenClass || 'rmbt-hidden');
        this.single = param.single || 'true';

        this.classForListenClick.push(this.iconOverflow);
        this.classForListenClick.push(this.iconDropClass);
        this.classForListenClick.push(this.iconBurger);
        // if (param.classForListenClick) this.classForListenClick.push(param.classForListenClick); // а нужно ли?? добавить если возникнет потребность
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

    setSubMenuIconOpen(contCurrentMenu) {
        let parentLi = contCurrentMenu.closest('li');
        if (parentLi === null) {
            return;
        }
        parentLi.childNodes.forEach(node => {
            try {
                if (node.classList.contains(this.iconDropClass)) {
                    node.classList.add(this.iconDropClassOpen);
                    exit = true;
                    return;
                }
            } catch {}
        })
    }

    listenClick() {
        if (!this.classForListenClick) {
            throw new Error('Nodes to listen click are absent');
        }

        document.addEventListener('click', e => {
            let target = e.target;

            console.log("00 target", target);

            if (target.classList.contains(this.iconDropClassOpen)) {
                let parentMenu = target.closest('li');
                let currentMenu = parentMenu.querySelector(`.${this.hiddenMenuCont.drop}`);
                parentMenu.querySelector(`.${this.iconDropClassOpen}`).classList.remove(this.iconDropClassOpen);
                this.closeMenu(currentMenu, this.modifiers.drop);

            }
            // else if (target.classList.contains(this.iconBurgerClassOpen)) {
            //     let parentMenu = target.closest('li');
            //     let currentMenu = parentMenu.querySelector(`.${this.hiddenMenuCont.drop}`);
            //     parentMenu.querySelector(`.${this.iconDropClassOpen}`).classList.remove(this.iconDropClassOpen);
            //     this.closeMenu(currentMenu, this.modifiers.drop);

            // }
            else if (target.classList.contains(this.iconDropClass)) {
                let currentMenu = target.closest('li').querySelector(`.${this.hiddenMenuCont.drop}`);
                this.OpenMenu(currentMenu, this.modifiers.drop);
            } else if (target.classList.contains(this.iconOverflow)) {
                let currentMenu = target.closest('nav').querySelector(`.${this.hiddenMenuCont.overflow}`);
                this.OpenMenu(currentMenu, this.modifiers.overflow);
            } else if (target.classList.contains(this.iconBurger)) {

                this.containersMenu.forEach(menuSel => {
                    if (target.closest(menuSel)) {

                        // let currentMenu = target.closest(menuSel).querySelector(`.${this.hiddenMenuCont.burger}`);
                        let currentMenu = target.closest(menuSel).querySelector(`nav`);
                        this.OpenMenu(currentMenu, this.modifiers.burger);
                    }

                })
            }



            if (target.classList.contains(this.hiddenMenuCont.drop) || // click внутри контейнеров меню либо их потомков но не ссыллок 
                target.classList.contains(this.hiddenMenuCont.overflow) ||
                target.parentNode.classList.contains(this.hiddenMenuCont.drop) ||
                target.parentNode.classList.contains(this.hiddenMenuCont.overflow)) return;
            this.clickOut(); // не работает
        });
    }

    listenKeydown() { // не работает

        document.addEventListener('keydown', e => {
            if (e.which === 27) {
                let nl_menus = this._getAllOpenMenus();
                if (nl_menus.length > 0) nl_menus.forEach(menu => this.closeMenu(menu));
            }
        })
    }

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
    }



    OpenMenu(currentMenu, modifier) {

        // if (!currentMenu.closest(`.${this.visibleClass}`)) {
        //     if (this.checSingle() !== null) this.closeMenu(this.checSingle(), modifier);
        // }

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

        this.setSubMenuIconOpen(currentMenu)
    }


    clickOut() {


        // console.log("start clickOut()");

        // let nl_menus = this._getAllOpenMenus();
        // if (nl_menus.length > 0) nl_menus.forEach(menu => this.closeMenu(menu));
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



    //========= helpers ============

    _getModifier(menu) {

        if (menu.classList.contains(this.hiddenMenuCont.drop) || menu.classList.contains(this.hiddenMenuCont.drop + '_' + this.arr_modifiers[0])) {
            return this.arr_modifiers[0];
        } else if (menu.classList.contains(this.hiddenMenuCont.overflow)) {
            return this.arr_modifiers[1];
        } else if (menu.classList.contains(this.hiddenMenuCont.burger)) {
            return this.arr_modifiers[1];
        } else {
            return false;
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

        let entries = Object.entries(this.modifiers);

        const nl_menu = entries.map(([key, mod]) => document.querySelectorAll(`.${this.visibleClass}_${mod}`));
        return nl_menu.filter(el => el.length > 0);
    }
}

const param = {
    containersMenu: ['.cont-horizont-menu', '.wrap-drop-menu', '#my-menu'],
};

const menu = new HorizontalMenu(param);