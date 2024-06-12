**Introducing Our Simple JS Plugin for Dynamic Horizontal Menus**

In today's web development landscape, CMS-driven sites often require complex, dynamic menus. Managing the behavior and state of these menus can be challenging. That's where our simple JS plugin comes in, providing all the necessary functionality for horizontal menus on your pages.

### Key Features

- **Overflow Protection**: No more worries about menu size or the number of items! Items that don't fit within your menu container will automatically move to an additional drop-down menu, accessible via a special icon.
- **Responsiveness**: Your menus will dynamically adjust as the browser window is resized. Menu items will move into and out of the overflow menu based on the screen size, ensuring optimal display whether your user turns their phone from vertical to horizontal.
- **Animation**: Enhance your menus with animations using the popular GSAP library. This plugin includes everything you need to get started with GSAP. You can also integrate your own animations by adding them to the parameters object.
- **Easy Addition of Classes**: Adding classes to menu items can be challenging in some CMSs. With this plugin, it’s simple. Just list the class names you need in the `contAdditionalClasses` object located within the parameters object.

### How to Use

1.  **Include the Plugin Files**:

    - JavaScript: `app/src/assets/js/modules/HorizontalMenu.js`
    - CSS: `app/src/assets/styles/components/modules/horizontalMenu.less`

2.  **Menu Structure**:

    - Ensure your menus follow the structure shown in `app/src/index.php`.

3.  **Configuration**:

    - All necessary configuration options can be found in `app/src/assets/js/modules/HorizontalMenu.js`.
    - To get started, simply add your menu's CSS selector to the `containersMenu` array within the parameters object at the end of the JS file. You can also customize other settings as described above.

This plugin was created using a Gulp-based assembly that I developed for fast and comfortable website layout, with the potential to create WordPress templates. Learn more about the Gulp assembly [here](https://github.com/Rombt/gulp-assembly)
