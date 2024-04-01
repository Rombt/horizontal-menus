<?php


// require_once get_template_directory() . '/inc/functions/class-tgm-plugin-activation.php';
// require_once get_template_directory() . '/inc/functions/Redux/redux-options.php';

// require_once get_template_directory() . '/inc/functions/general-front.php';
// require_once get_template_directory() . '/inc/functions/comment_default.php';
// require_once get_template_directory() . '/inc/functions/ajax.php';


define('rs_PATH_THEME', get_template_directory());
define('rs_URL_THEME', esc_url(get_template_directory_uri()));



function restaurant_site_scripts()
{

	wp_enqueue_style('swiper-bundle', get_template_directory_uri() . '/assets/styles/libs/swiper-bundle.min.css', array(), '1.0', 'all');
	wp_enqueue_style('restaurant_site-main', get_template_directory_uri() . '/assets/styles/main-style.min.css', array(), '1.0', 'all');

	wp_enqueue_script('swiper-bundle', get_template_directory_uri() . '/assets/js/libs/swiper-bundle.min.js', array(), '', true);
	wp_enqueue_script('restaurant_site-app', get_template_directory_uri() . '/assets/js/app.main.min.js', array('jquery'), '1.0', true);




	if (is_home() || is_single()) {
		global $restaurant_site_options;

		if (
			class_exists('ReduxFramework')
			&& $restaurant_site_options['icon-heart-active']['url']
			&& $restaurant_site_options['icon-heart-pasive']['url']
		) {
			wp_localize_script('restaurant_site-app', 'rstrLikeIconImg', [
				'rstrLikeIconImgActive' => esc_url($restaurant_site_options['icon-heart-active']['url']),
				'rstrLikeIconImgPasive' => esc_url($restaurant_site_options['icon-heart-pasive']['url']),
				'rstrAjaxNonceLike' => wp_create_nonce('rstr-ajax-nonce-like'),
				'rstrAjaxURL' => admin_url('admin-ajax.php'),
			]);
		}
	}

	if (is_post_type_archive('recipes') || is_post_type_archive('food_menu_items')) {
		wp_localize_script('restaurant_site-app', 'rstrAppData', [
			'rstrAjaxURL' => admin_url('admin-ajax.php'),
			'rstrAjaxNonceView' => wp_create_nonce('rstr-ajax-nonce-view'),
		]);
	}

	if (is_post_type_archive('recipes') || is_singular('recipes')) {
		global $restaurant_site_options;

		if (
			class_exists('ReduxFramework')
			&& $restaurant_site_options['rating-star-active_img']['url']
			&& $restaurant_site_options['rating-star-passive_img']['url']
		) {
			wp_localize_script('restaurant_site-app', 'rstrStarIconImg', [
				'rstrStarIconImgActive' => esc_url($restaurant_site_options['rating-star-active_img']['url']),
				'rstrStarIconImgPasive' => esc_url($restaurant_site_options['rating-star-passive_img']['url']),
				'rstrQuantityRatingStars' => esc_url($restaurant_site_options['quantity-rating-stars']),
				'rstrAjaxNonceStar' => wp_create_nonce('rstr-ajax-nonce-star'),
			]);
		}
	}

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
}
add_action('wp_enqueue_scripts', 'restaurant_site_scripts', 20);

function rstr_site_setup()
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
			'header_nav' => esc_html__('Header Navigation', 'restaurant-site'),
			'footer_nav' => esc_html__('Footer Navigation', 'restaurant-site'),
			'food_menu' => esc_html__('Food Menu', 'restaurant-site'),
			'brows_recipes' => esc_html__('Brows Recipes', 'restaurant-site'),
		)
	);

	load_theme_textdomain('restaurant-site', get_template_directory() . '/languages');
	add_theme_support('automatic-feed-links');
}
add_action('after_setup_theme', 'rstr_site_setup');

function simple_restaurant_site_content_width()
{
	$GLOBALS['content_width'] = apply_filters('simple_restaurant_site_content_width', 640);
}
add_action('after_setup_theme', 'simple_restaurant_site_content_width', 0);

function restaurant_site_register_required_plugins()
{
	$plugins = array(
		array(
			'name' => 'Restaurant site core',
			// The plugin name.
			'slug' => 'restaurant-site-core',
			// The plugin slug (typically the folder name).
			'source' => get_template_directory() . '/plugins/restaurant-site-core.zip',
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

		array(
			'name' => 'Advanced Custom Fields',
			'slug' => 'advanced-custom-fields',
			'required' => true,
		),

		array(
			'name' => 'Redux Framework',
			'slug' => 'redux-framework',
			'required' => true,
		),

	);

	$config = array(
		'id' => 'restaurant-site',
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

	// tgmpa( $plugins, $config );
}
add_action('tgmpa_register', 'restaurant_site_register_required_plugins');

function rstr_widgets_init()
{
	register_sidebar(
		array(
			'name' => esc_html__('Sidebar For Blog page', 'restaurant-site'),
			'id' => 'rstr_blog_sidebar',
			'description' => esc_html__('Add widgets here', 'restaurant-site'),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget' => '</section>',
			'before_title' => '<h2 class="widget-title">',
			'after_title' => '</h2>',
		)
	);
	register_sidebar(
		array(
			'name' => esc_html__('Sidebar For Shop page', 'restaurant-site'),
			'id' => 'rstr_shop_sidebar',
			'description' => esc_html__('Add widgets here', 'restaurant-site'),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget' => '</section>',
			'before_title' => '<h2 class="widget-title">',
			'after_title' => '</h2>',
		)
	);

	// register_widget( 'rstr_recent_posts_widget' );
}
add_action('widgets_init', 'rstr_widgets_init');

function menu_item_css_classes($classes, $item, $args, $depth)
{
	if (isset($args->add_li_class)) {
		$classes[] = $args->add_li_class;
	}

	return $classes;
}
add_filter('nav_menu_css_class', 'menu_item_css_classes', 10, 4);

function rstr_add_class_menus_links($atts, $item, $args)
{
	if (isset($args->add_link_class)) {
		$atts['class'] = $args->add_link_class;
	}

	return $atts;
}
add_filter('nav_menu_link_attributes', 'rstr_add_class_menus_links', 10, 3);

function rstr_change_menus_items($args, $item)
{
	global $restaurant_site_options;

	if ($args->theme_location === 'food_menu') {
		if (class_exists('ReduxFramework') && in_array('menu-item-type-post_type_archive', $item->classes)) {
			$args->before = '<img src="' . $restaurant_site_options['restaurant_menu-section_icon_first_item_menu']['url'] . '" alt="">';
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
add_filter('nav_menu_item_args', 'rstr_change_menus_items', 10, 2);





//===========================================================================
//===========================================================================


// function enqueue_comment_reply() {
// 	if ( is_singular() )
// 		wp_enqueue_script( 'comment-reply' );
// }
// add_action( 'wp_enqueue_scripts', 'enqueue_comment_reply' );