<?php
/*
Plugin Name: -core-plugin
Plugin URI: #
Description:  
Version: 1.0
Author: Rombt
Author URI: #
License: Proprietary
Text Domain: rmbt_ 
*/

if (!function_exists('add_action')) {
	echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
	exit;
}

function rmbt_impex_scripts_admin()
{
	wp_enqueue_style('rmbt_impex-admin_main', plugins_url() . '/core-plugin/assets/styles/main-style.min.css', array(), '1.0', 'all');
	wp_enqueue_script('rmbt_impex-admin_core_jq', plugins_url() . '/core-plugin/assets/js/admin.main.min.js', array('jquery'), '1.0', true);
}
add_action('admin_enqueue_scripts', 'rmbt_impex_scripts_admin');

require_once plugin_dir_path(__FILE__) . 'inc/general-admin.php';
// require_once plugin_dir_path(__FILE__) . 'inc/ajax.php';
// require_once plugin_dir_path(__FILE__) . 'inc/acf.php';

function rmbt_get_images_sizes()
{

	return array(
		'post' => array(
			array(
				'name' => 'rmbt_post-img',
				'width' => 845,
				'height' => 400,
				'crop' => true,
			),
			array(
				'name' => 'rmbt_small-img',
				'width' => 70,
				'height' => 70,
				'crop' => true,
			),
			array(
				'name' => 'rmbt_largest-img',
				'width' => 1970,
				'height' => 570,
				'crop' => true,
			),
			array(
				'name' => 'rmbt_header-img',
				'width' => 1970,
				'height' => 250,
				'crop' => true,
			),
		)
	);
}
add_action('plugin_loaded', 'rmbt_register_image_size');
function rmbt_register_image_size()
{
	if (function_exists('rmbt_get_images_sizes')) {
		foreach (rmbt_get_images_sizes() as $post_type => $sizes) {
			foreach ($sizes as $config) {
				add_image_size($config['name'], $config['width'], $config['height'], $config['crop']);
			}
		}
	}
}

/**
 * For processing type errors "warning" in blocks try-catch
 */
function errorWarning($errno, $errmbt, $errfile, $errline)
{
	// the code of error  processing must be here if it need you
	// echo "Ошибка: [$errno] $errmbt в файле $errfile на строке $errline\n";
	return true;
	// return false; // прервать обработку ошибки
}
set_error_handler("errorWarning");



//==============================================================================================
//==============================================================================================
