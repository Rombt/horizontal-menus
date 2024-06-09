/* 
    Обеспечивает основной функционал горизонтального меню для всех меню на странице
        базовые стили в файле horizontalMenu.less

        этим классом обрабатываются ТОЛЬКО теги nav с классами указанными в param.containersMenu
        при переполнении контейнера пункты меню которые не поместились скрываются в меню overflow

        click, нажатия клавиши esc прослушиваются на всей странице 

        по умолчанию выпадающие меню всех типов изначально создаются с внешним видом открытого состояния 
            и скрываются классом rmbt-hidden 
            для отрытия-активации меню класс rmbt-hidden удаляется 
        такое повидение можно изменить:
            при открытии-активации меню любого типа ему добавляется класс rmbt-visible с соответствующим модификатором
            это даёт возможность организовать разные способы открытия для разных пипо меню



    todo:

        исключить возможность открытия меню за пределы окна 

        добавить возможность устанавливать для каждого меню свой набор иконок, селекторами элементов которые уже прописаны в html

        добавить все те манипуляции из dropprocessingClick() блокировка body и прочее
        
        возможность отключать icon - dropdown для меню desk top независимо от мобильной версии из html
        overflow-cont  додлжен выезжать из за правой границы окна


    */

class HorizontalMenu {
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

              breakPointBurger: 768,      // размер окна при котором происходит перестроения в burger меню из overflow меню
              
              // single: 'false', // допускает одновременное открытие нескольких меню т.е. открытие следующего меню не закрывает предидущее

              contAdditionalClasses: { // пользаватеьские классы определяющие внешний вид открытых пунтков меню или контейнеров
                  drop: [],
                  overflow: [],
                  burger: [],
              }, 

              animation = {     // для каждого вида меню ожидается объект содержащий все свойства/значения, которые вы хотите анимировать для открытия и закрытия отдельно!
                              // соответствующий объект будет использован в методе gsap.to(). 
                 drop:{
                     open{},
                     close{}
                 },
                  overflow:{
                      open{},
                      close{}
                  },
                  burger:{
                      open{},
                      close{}
                  },
              } 

          };

      */

    // классы скрытых пунтков меню или контейнеров
    hiddenMenuCont = {
        overflow: 'overflow-cont',
        drop: 'drop-cont',
        burger: 'burger-cont',
    };

    // объект, модификаторы классов для того что бы каждый вид меню мог открываться - закрываться посвоему
    modifiers = {
        drop: 'drop',
        overflow: 'overflow',
        burger: 'burger',
    };

    // пользаватеьские классы определяющие внешний вид открытых пунтков меню или контейнеров
    contAdditionalClasses = {
        drop: [],
        overflow: [],
        burger: [],
    };

    animation = {
        drop: {
            open: {
                duration: 0.7,
                ease: 'power4.inOut',
                height: 'auto',
                overflow: 'visible',
                pointerEvents: 'auto',
                opacity: 1,
                // width: 'auto',
            },
            close: {
                duration: 0.7,
                ease: 'power4.inOut',
                height: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                opacity: 0,
                // width: 0,
            },
        },
        overflow: {
            open: {
                duration: 0.7,
                ease: 'power4.inOut',
                height: 'auto',
                overflow: 'visible',
                pointerEvents: 'auto',
                opacity: 1,
                width: 'auto',
            },
            close: {
                duration: 0.7,
                ease: 'power4.inOut',
                height: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                opacity: 0,
                width: 0,
            },
        },
        burger: {
            open: {
                duration: 0.7,
                ease: 'power4.inOut',
                overflow: 'visible',
                pointerEvents: 'auto',
                opacity: 1,
                width: 'auto',
            },
            close: {
                duration: 0.7,
                ease: 'power4.inOut',
                overflow: 'hidden',
                pointerEvents: 'none',
                opacity: 0,
                width: 0,
            },
        },
    };

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
        this.breakPointBurger = param.breakPointBurger || 767;

        this.visibleClass = this._clearClassName(param.visibleClass || 'rmbt-visible');
        this.hiddenClass = this._clearClassName(param.hiddenClass || 'rmbt-hidden');
        this.single = param.single || 'true';

        this.lastWidthWindow = window.innerWidth;

        this.forEachMenu();
        this.listenClick();
        this.listenKeydown();
    }

    forEachMenu() {

        this.nl_containersMenu.forEach(arrNodeList => {
            for (let i = 0; i <= arrNodeList.length - 1; i++) {
                let contCurrentMenu = arrNodeList[i];
                if (!contCurrentMenu.querySelector('nav')) continue;


                this.monitoringResize(contCurrentMenu);


                this.menuContainerDrop(contCurrentMenu);
                this.setSubMenuIcon(contCurrentMenu);
                this.setBurgerIcon(contCurrentMenu);
            }
        });
    }

    // мenuВuilding(contCurrentMenu) {
    //     /*
    //         строит меню при загрузке страницы 
    //         перестраивает меню при resize окна
    //             перемещая li из menuOverflow в ul основного меню
    //             для того что бы в burger menu отображались все li 

    //         получает 


    //     */


    // }


    clearNav(contCurrentMenu) {

        if (contCurrentMenu.querySelector('nav').classList.contains(this.hiddenClass) ||
            contCurrentMenu.querySelector('nav').classList.contains(`${this.visibleClass}_${this.modifiers.burger}`)) {

            contCurrentMenu.querySelector('nav').className = '';
            if (typeof gsap !== 'undefined') {
                Object.keys(this.animation.burger.close).forEach(prop => {
                    prop = prop.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
                    contCurrentMenu.querySelector('nav').style.setProperty(prop, '');
                })
            }
        }
    }


    menuContainerOverflow(contCurrentMenu) {
        let overflowCont = contCurrentMenu.querySelector(`.${this.hiddenMenuCont.overflow}`);
        let ul = contCurrentMenu.querySelector('ul');
        let createdOverflowCont = false;

        if (overflowCont) {
            if (overflowCont.childElementCount > 0) return overflowCont;
        } else {
            overflowCont = document.createElement('ul');
            overflowCont.classList.add(this.hiddenMenuCont.overflow, this.hiddenClass);
            createdOverflowCont = true;
        }

        this.clearNav(contCurrentMenu);

        contCurrentMenu.querySelectorAll('nav>ul>li').forEach(elMenu => {
            if (elMenu.getBoundingClientRect().right - ul.getBoundingClientRect().right > 1) {
                overflowCont.append(elMenu);
            }
        });

        if (overflowCont.childElementCount > 0) {

            if (createdOverflowCont) {
                contCurrentMenu.querySelector('nav').append(overflowCont);
                this.setAdditionalClassesToCont(overflowCont, 'overflow');
                contCurrentMenu.style.visibility = 'visible'; // показываю меню после окончательного формирования
            }
            if (!contCurrentMenu.querySelector(this.iconOverflow)) this.setOverflowIcon(contCurrentMenu);
            return overflowCont;
        }

        contCurrentMenu.style.visibility = 'visible'; // показываю меню после окончательного формирования
        return null;
    }

    monitoringResize(contCurrentMenu) {

        const currentMenu = contCurrentMenu.querySelector('nav>ul:first-child');
        const paddingRightCurrentMenu = +window.getComputedStyle(contCurrentMenu.querySelector('nav')).paddingRight.replace(/px/g, '');
        const paddingRightcontCurrentMenu = +window.getComputedStyle(contCurrentMenu).paddingRight.replace(/px/g, '');
        let prevRightCont = contCurrentMenu.getBoundingClientRect().right;

        const observer = new ResizeObserver(entries => {
            if (window.innerWidth <= this.breakPointBurger) {
                contCurrentMenu.style.visibility = 'visible';
                return
            }

            if (contCurrentMenu.querySelector(`.${this.iconBurger}`).classList.contains(this.iconBurgerOpen)) {
                this.changeStateIconMenu(contCurrentMenu.querySelector('nav'), this.modifiers.burger, 'close')
            }

            this.clearNav(contCurrentMenu);

            let overflowCont = this.menuContainerOverflow(contCurrentMenu);
            if (overflowCont === null) return;
            let widthPrevFirstOverflowLi = 0;
            let prevFirstOverflowLi = overflowCont.querySelector('li:first-child');
            if (prevFirstOverflowLi) widthPrevFirstOverflowLi = prevFirstOverflowLi.getBoundingClientRect().width;

            const mainUl = contCurrentMenu.querySelector('nav ul');
            const currentRightMainUl = mainUl.getBoundingClientRect().right;
            const currentRightCont = contCurrentMenu.getBoundingClientRect().right;

            let prevlastLi, prevRightlastLi;
            if (contCurrentMenu.querySelector('nav>ul:first-child>li:last-child')) {
                prevlastLi = contCurrentMenu.querySelector('nav>ul:first-child>li:last-child');
                prevRightlastLi = prevlastLi.getBoundingClientRect().right;
            }

            const sumDistanceBetweenLi = [...contCurrentMenu.querySelectorAll('nav>ul:first-child>li')].reduce(
                (accum, li, i, arr) => {
                    if (arr[i + 1]) accum += arr[i + 1].getBoundingClientRect().left - li.getBoundingClientRect().right;
                    return accum;
                }, 0);

            if (currentRightCont - prevRightCont < 0) { // окно уменьшается 
                if (prevRightlastLi > currentRightMainUl) overflowCont.prepend(prevlastLi);
            } else { // окно увеличивается
                if (sumDistanceBetweenLi - widthPrevFirstOverflowLi > (paddingRightCurrentMenu + paddingRightcontCurrentMenu) * 2) {
                    if (prevFirstOverflowLi) currentMenu.append(prevFirstOverflowLi);
                    if (contCurrentMenu.querySelectorAll(`.${this.hiddenMenuCont.overflow}>li`).length == 0) {
                        if (contCurrentMenu.querySelector('.icon-overflow')) contCurrentMenu.querySelector('.icon-overflow').remove();
                    }
                }
            }
            prevRightCont = currentRightCont;

        });
        observer.observe(contCurrentMenu);
    }


    menuContainerDrop(contCurrentMenu) {
        let subMenus = contCurrentMenu.querySelectorAll('nav>ul ul');
        if (subMenus.length > 0) {
            subMenus.forEach(subMenu => {
                subMenu.classList.add(this.hiddenMenuCont.drop, this.hiddenClass);
                this.setAdditionalClassesToCont(subMenu, 'drop');
            });
        }
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
            arrClassies.forEach(_class => currentMenu.classList.add(_class));
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
                    } catch { }
                });
                break;

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
                });

                break;

            case this.modifiers.overflow:
                /*something*/
                break;
        }
    }

    closeMenu(currentMenu) {
        let modifier;
        if (currentMenu.classList.contains(this.visibleClass + '_' + this.modifiers.drop)) {
            modifier = this.modifiers.drop;
        } else if (currentMenu.classList.contains(this.visibleClass + '_' + this.modifiers.burger)) {
            modifier = this.modifiers.burger;
        } else if (currentMenu.classList.contains(this.visibleClass + '_' + this.modifiers.overflow)) {
            modifier = this.modifiers.overflow;
        }

        if (typeof gsap !== 'undefined') {
            if (modifier === this.modifiers.drop) {
                gsap.to(currentMenu, this.animation.drop.close).play();
            } else if (modifier === this.modifiers.overflow) {
                gsap.to(currentMenu, this.animation.overflow.close).play();
            } else if (modifier === this.modifiers.burger) {
                gsap.to(currentMenu, this.animation.burger.close).play();
            }
        }

        currentMenu.classList.remove(this.visibleClass + '_' + modifier);
        currentMenu.classList.add(this.hiddenClass);

        if (modifier === this.modifiers.burger) {
            document.querySelector('html').classList.remove('rmbt-lock');



        }
        this.changeStateIconMenu(currentMenu, modifier, 'close');
    }

    OpenMenu(currentMenu, modifier) {
        this.checSingle(currentMenu);

        if (typeof gsap !== 'undefined') {
            if (modifier === this.modifiers.drop) {
                gsap.to(currentMenu, this.animation.drop.open).play();
            } else if (modifier === this.modifiers.overflow) {
                gsap.to(currentMenu, this.animation.overflow.open).play();
            } else if (modifier === this.modifiers.burger) {
                gsap.to(currentMenu, this.animation.burger.open).play();
            }
        } else {
            currentMenu.classList.remove(this.hiddenClass);
        }

        if (modifier === this.modifiers.burger) {
            document.querySelector('html').classList.add('rmbt-lock');
            let overflowCont = currentMenu.querySelector(`.${this.hiddenMenuCont.overflow}`);
            if (overflowCont) {
                if (currentMenu.querySelectorAll(`.${this.hiddenMenuCont.overflow}>li`).length > 0) {
                    currentMenu.querySelectorAll(`.${this.hiddenMenuCont.overflow}>li`).forEach(li => {
                        currentMenu.querySelector('nav>ul:first-child').append(li);
                    });
                }
            }
        }

        currentMenu.classList.add(this.visibleClass + '_' + modifier);
        this.changeStateIconMenu(currentMenu, modifier, 'open');
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
                    this.closeMenu(openedMenu); ///!!!!  проблема в том что this.animation.tween затирается следующим открытым меню
                });
            }
        }
    }

    listenClick() {
        document.addEventListener('click', e => {
            let target = e.target;

            if (target.classList.contains(this.iconDropClassOpen)) {
                let parentMenu = target.closest('li');
                let currentMenu = parentMenu.querySelector(`.${this.hiddenMenuCont.drop}`);
                this.closeMenu(currentMenu);
            } else if (target.classList.contains(this.iconBurgerOpen)) {
                let currentMenu = target.closest(`.${this.visibleClass}_${this.modifiers.burger}`);
                this.closeMenu(currentMenu);
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
                });
            } else {
                this.clickOut();
            }
        });
    }

    clickOut() {
        let nl_menus = this._getAllOpenMenus();

        if (nl_menus.length > 0)
            nl_menus.forEach(menu => {
                this.closeMenu(menu);
            });
    }

    listenKeydown() {
        document.addEventListener('keydown', e => {
            if (e.key === 27 || e.keyCode === 27) {
                let nl_menus = this._getAllOpenMenus();
                if (nl_menus.length > 0)
                    nl_menus.forEach(menu => {
                        this.closeMenu(menu, 'drop');
                    });
            }
        });
    }

    //========= helpers ============

    /*
          удаляет повторяющиеся значения
      */
    _uniqueArr(arr) {
        return [
            ...new Set(
                arr
                    .map(el => {
                        if (typeof str === 'string') this._clearClassName(el);
                    })
                    .filter(item => item !== undefined)
            ),
        ];
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
    }
}

const param = {
    containersMenu: ['.cont-horizont-menu', '.wrap-drop-menu', '#my-menu'],
    contAdditionalClasses: {
        drop: ['add-drop-1', 'add-drop-2', 'add-drop-3'],
        overflow: ['add-overflow-1', 'add-overflow-2', 'add-overflow-3'],
        burger: ['add-burger-1', 'add-burger-2', 'add-burger-3'],
    },
    // animation: {
    //     drop: {},
    //     overflow: {},
    //     burger: {},
    // }
};

const menu = new HorizontalMenu(param);