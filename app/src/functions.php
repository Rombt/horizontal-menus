<?php


require_once get_template_directory() . '/inc/functions/class-tgm-plugin-activation.php';
require_once get_template_directory() . '/inc/Redux/redux-options.php';
require_once get_template_directory() . '/inc/functions/general-front.php';

// require_once get_template_directory() . '/inc/functions/comment_default.php';
// require_once get_template_directory() . '/inc/functions/ajax.php';

if (class_exists('WooCommerce')) {
	require_once get_template_directory() . '/woocommerce/wc-functions.php';
	require_once get_template_directory() . '/woocommerce/wc-functions-remove.php';
}

define('rmbt_PATH_THEME', get_template_directory());
define('rmbt_URL_THEME', esc_url(get_template_directory_uri()));

function rmbt_impex_scripts()
{

	wp_enqueue_style('swiper-bundle', get_template_directory_uri() . '/assets/styles/libs/swiper-bundle.min.css', array(), '1.0', 'all');
	wp_enqueue_style('rmbt_impex-main', get_template_directory_uri() . '/assets/styles/main-style.min.css', array(), '1.0', 'all');

	wp_enqueue_script('swiper-bundle', get_template_directory_uri() . '/assets/js/libs/swiper-bundle.min.js', array(), '', true);
	wp_enqueue_script('rmbt_impex-app', get_template_directory_uri() . '/assets/js/app.main.min.js', array('jquery'), '1.0', true);


	wp_add_inline_script(
		'rmbt_impex-app',
		'const rmbtImpexApp = ' . json_encode([
			// 'ajaxUrl' => admin_url('ajax.php'),		// ????
			// 'rmbtArrCategories' => $categories,		// your data if you need it
		]),
		'before'
	);
}
add_action('wp_enqueue_scripts', 'rmbt_impex_scripts', 20);

function rmbt_site_setup()
{


	add_theme_support('custom-logo');
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	register_nav_menus(
		array(
			'header_nav' => esc_html__('rmbt_Header Navigation', 'rmbt_impex'),
			'footer_nav' => esc_html__('rmbt_Footer Navigation', 'rmbt_impex'),
		)
	);

	load_theme_textdomain('rmbt_impex', get_template_directory() . '/languages');
	add_theme_support('automatic-feed-links');
}
add_action('after_setup_theme', 'rmbt_site_setup');

function simple_rmbt_impex_content_width()
{
	$GLOBALS['content_width'] = apply_filters('simple_rmbt_impex_content_width', 640);
}
add_action('after_setup_theme', 'simple_rmbt_impex_content_width', 0);

function rmbt_impex_register_required_plugins()
{
	$plugins = array(
		array(
			'name' => 'Impex core',
			// The plugin name.
			'slug' => 'rmbt_impex-core',
			// The plugin slug (typically the folder name).
			'source' => get_template_directory() . '/plugins/rmbt_impex-core.zip',
			// The plugin source.
			'required' => true,
			// If false, the plugin is only 'recommended' instead of required.
			'version' => '1.0',
			// E.g. 1.0.0. If set, the active plugin must be this version or higher. If the plugin version is higher than the plugin version installed, the user will be notified to update the plugin.
			'force_activation' => false,
			// If true, plugin is activated upon theme activation and cannot be deactivated until theme switch.
			'force_deactivation' => false,
			// If true, plugin is deactivated upon theme switch, useful for theme-specific plugins.
		),

		// array(
		// 	'name' => 'Advanced Custom Fields',
		// 	'slug' => 'advanced-custom-fields',
		// 	'required' => true,
		// ),

		array(
			'name' => 'Redux Framework',
			'slug' => 'redux-framework',
			'required' => true,
		),

	);

	$config = array(
		'id' => 'rmbt_impex',
		// Unique ID for hashing notices for multiple instances of TGMPA.
		'default_path' => '',
		// Default absolute path to bundled plugins.
		'menu' => 'tgmpa-install-plugins',
		// Menu slug.
		'has_notices' => true,
		// Show admin notices or not.
		'dismissable' => true,
		// If false, a user cannot dismiss the nag message.
		'dismiss_msg' => '',
		// If 'dismissable' is false, this message will be output at top of nag.
		'is_automatic' => false,
		// Automatically activate plugins after installation or not.
		'message' => '', // Message to output right before the plugins table.

	);

	tgmpa($plugins, $config);
}
add_action('tgmpa_register', 'rmbt_impex_register_required_plugins');

function rmbt_widgets_init()
{
	register_sidebar(
		array(
			'name' => esc_html__('Sidebar For Blog page', 'rmbt_impex'),
			'id' => 'rmbt_blog_sidebar',
			'description' => esc_html__('Add widgets here', 'rmbt_impex'),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget' => '</section>',
			'before_title' => '<h2 class="widget-title">',
			'after_title' => '</h2>',
		)
	);
	register_sidebar(
		array(
			'name' => esc_html__('Sidebar For Shop page', 'rmbt_impex'),
			'id' => 'rmbt_shop_sidebar',
			'description' => esc_html__('Add widgets here', 'rmbt_impex'),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget' => '</section>',
			'before_title' => '<h2 class="widget-title">',
			'after_title' => '</h2>',
		)
	);
}
add_action('widgets_init', 'rmbt_widgets_init');

function menu_item_css_classes($classes, $item, $args, $depth)
{
	if (isset($args->add_li_class)) {
		$classes[] = $args->add_li_class;
	}

	return $classes;
}
add_filter('nav_menu_css_class', 'menu_item_css_classes', 10, 4);

function rmbt_add_class_menus_links($atts, $item, $args)
{
	if (isset($args->add_link_class)) {
		$atts['class'] = $args->add_link_class;
	}

	return $atts;
}
add_filter('nav_menu_link_attributes', 'rmbt_add_class_menus_links', 10, 3);

function rmbt_change_menus_items($args, $item)
{
	global $rmbt_impex_options;

	if ($args->theme_location === 'food_menu') {
		if (class_exists('ReduxFramework') && in_array('menu-item-type-post_type_archive', $item->classes)) {
			$args->before = '<img src="' . $rmbt_impex_options['restaurant_menu-section_icon_first_item_menu']['url'] . '" alt="">';
		} else {
			if (class_exists('ACF')) {
				$args->before = '<img src="' . get_field('food-categories-icon', 'term_' . $item->object_id) . '" alt="">';
			}
		}
	} elseif ($args->theme_location === 'brows_recipes') {
		if (class_exists('ACF')) {
			$args->before = '<img src="' . get_field('food-recepes-icon', 'term_' . $item->object_id) . '" alt="">';
		}
	}

	return $args;
}
add_filter('nav_menu_item_args', 'rmbt_change_menus_items', 10, 2);





//===========================================================================
//===========================================================================


// function enqueue_comment_reply() {
// 	if ( is_singular() )
// 		wp_enqueue_script( 'comment-reply' );
// }
// add_action( 'wp_enqueue_scripts', 'enqueue_comment_reply' );