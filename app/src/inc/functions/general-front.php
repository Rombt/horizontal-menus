<?php


function rmbt_custom_WPquery($rst_post_type, $rst_posts_per_page, $rst_current = '', $tax_query = [])
{

	if (empty($rst_current)) {
		$rst_current = absint(max(1, get_query_var('paged') ? get_query_var('paged') : get_query_var('page')));
	}

	if (count($tax_query) == 0) {
		$params = [
			'post_type' => $rst_post_type,
			'post_status' => 'publish',
			'posts_per_page' => $rst_posts_per_page,
			'paged' => $rst_current,
		];
	} else {
		$params = $tax_query;
	}


	return new WP_Query($params);
}
// Breadcrumbs Custom Function
function rmbt_get_breadcrumbs()
{

	$text['home'] = esc_html__('Home', 'restaurant-site');
	$text['category'] = esc_html__('Archive', 'restaurant-site') . ' "%s"';
	$text['search'] = esc_html__('Search results', 'restaurant-site') . ' "%s"';
	$text['tag'] = esc_html__('Tag', 'restaurant-site') . ' "%s"';
	$text['author'] = esc_html__('Author', 'restaurant-site') . ' %s';
	$text['404'] = esc_html__('Error 404', 'restaurant-site');

	$show_current = 1;
	$show_on_home = 0;
	$show_home_link = 1;
	$show_title = 1;
	$delimiter = ' / ';
	$before = '<span class="current">';
	$after = '</span>';

	global $post;
	$home_link = esc_url(home_url('/'));
	$link_before = '<span>';
	$link_after = '</span>';
	$link_attr = '';
	$link = $link_before . '<a' . $link_attr . ' href="%1$s">%2$s</a>' . $link_after;
	if (isset($post->post_parent)) {
		$my_post_parent = $post->post_parent;
	} else {
		$my_post_parent = 1;
	}
	$parent_id = $parent_id_2 = $my_post_parent;
	$frontpage_id = get_option('page_on_front');

	if (is_home() || is_front_page()) {

		if ($show_on_home == 1) {
			echo '<nav class="breadcrumbs"><a href="' . $home_link . '">' . $text['home'] . '</a></nav>';
		}

		if (get_option('page_for_posts') && is_home()) {
			echo '<nav class="breadcrumbs"><a href="' . esc_url($home_link) . '">' . esc_attr($text['home']) . '</a>' . rmbt_wp_kses($delimiter) . ' ' . __('Blog', 'restaurant-site') . '</nav>';
		}
	} else {

		echo '<nav class="breadcrumbs">';
		if ($show_home_link == 1) {
			echo sprintf($link, $home_link, $text['home']);
			if ($frontpage_id == 0 || $parent_id != $frontpage_id) {
				echo rmbt_wp_kses($delimiter);
			}
		}

		if (is_category()) {
			$this_cat = get_category(get_query_var('cat'), false);
			if ($this_cat->parent != 0) {
				$cats = get_category_parents($this_cat->parent, true, $delimiter);
				if ($show_current == 0) {
					$cats = preg_replace("#^(.+)$delimiter$#", "$1", $cats);
				}
				$cats = str_replace('<a', $link_before . '<a' . $link_attr, $cats);
				$cats = str_replace('</a>', '</a>' . $link_after, $cats);
				if ($show_title == 0) {
					$cats = preg_replace('/ title="(.*?)"/', '', $cats);
				}
				echo rmbt_wp_kses($cats);
			}
			if ($show_current == 1) {
				echo rmbt_wp_kses($before) . sprintf($text['category'], single_cat_title('', false)) . rmbt_wp_kses($after);
			}
		} elseif (is_search()) {
			echo rmbt_wp_kses($before) . sprintf($text['search'], get_search_query()) . rmbt_wp_kses($after);
		} elseif (is_day()) {
			echo sprintf($link, get_year_link(get_the_time('Y')), get_the_time('Y')) . rmbt_wp_kses($delimiter);
			echo sprintf($link, get_month_link(get_the_time('Y'), get_the_time('m')), get_the_time('F')) . rmbt_wp_kses($delimiter);
			echo rmbt_wp_kses($before) . get_the_time('d') . rmbt_wp_kses($after);
		} elseif (is_month()) {
			echo sprintf($link, get_year_link(get_the_time('Y')), get_the_time('Y')) . rmbt_wp_kses($delimiter);
			echo rmbt_wp_kses($before) . get_the_time('F') . rmbt_wp_kses($after);
		} elseif (is_year()) {
			echo rmbt_wp_kses($before) . get_the_time('Y') . rmbt_wp_kses($after);
		} elseif (is_single() && !is_attachment()) {
			if (get_post_type() != 'post') {
				$post_type = get_post_type_object(get_post_type());
				$slug = $post_type->rewrite;
				printf($link, $home_link . '/' . $slug['slug'] . '/', $post_type->labels->singular_name);
				if ($show_current == 1) {
					echo rmbt_wp_kses($delimiter) . rmbt_wp_kses($before) . get_the_title() . rmbt_wp_kses($after);
				}
			} else {
				$cat = get_the_category();
				$cat = $cat[0];
				$cats = get_category_parents($cat, true, $delimiter);
				if ($show_current == 0) {
					$cats = preg_replace("#^(.+)$delimiter$#", "$1", $cats);
				}
				$cats = str_replace('<a', $link_before . '<a' . $link_attr, $cats);
				$cats = str_replace('</a>', '</a>' . $link_after, $cats);
				if ($show_title == 0) {
					$cats = preg_replace('/ title="(.*?)"/', '', $cats);
				}
				echo rmbt_wp_kses($cats);
				if ($show_current == 1) {
					echo rmbt_wp_kses($before) . get_the_title() . rmbt_wp_kses($after);
				}
			}
		} elseif (!is_single() && !is_page() && get_post_type() != 'post' && !is_404()) {
			$post_type = get_post_type_object(get_post_type());
			echo rmbt_wp_kses($before) . esc_attr($post_type->labels->singular_name) . rmbt_wp_kses($after);
		} elseif (is_attachment()) {
			$parent = get_post($parent_id);
			$cat = get_the_category($parent->ID);
			$cat = $cat[0];
			$cats = get_category_parents($cat, true, $delimiter);
			$cats = str_replace('<a', $link_before . '<a' . $link_attr, $cats);
			$cats = str_replace('</a>', '</a>' . $link_after, $cats);
			if ($show_title == 0) {
				$cats = preg_replace('/ title="(.*?)"/', '', $cats);
			}
			echo rmbt_wp_kses($cats);
			printf($link, get_permalink($parent), $parent->post_title);
			if ($show_current == 1) {
				echo rmbt_wp_kses($delimiter) . rmbt_wp_kses($before) . get_the_title() . rmbt_wp_kses($after);
			}
		} elseif (is_page() && !$parent_id) {
			if ($show_current == 1) {
				echo rmbt_wp_kses($before) . get_the_title() . rmbt_wp_kses($after);
			}
		} elseif (is_page() && $parent_id) {
			if ($parent_id != $frontpage_id) {
				$breadcrumbs = array();
				while ($parent_id) {
					$page = get_page($parent_id);
					if ($parent_id != $frontpage_id) {
						$breadcrumbs[] = sprintf($link, get_permalink($page->ID), get_the_title($page->ID));
					}
					$parent_id = $page->post_parent;
				}
				$breadcrumbs = array_reverse($breadcrumbs);
				for ($i = 0; $i < count($breadcrumbs); $i++) {
					echo rmbt_wp_kses($breadcrumbs[$i]);
					if ($i != count($breadcrumbs) - 1) {
						echo rmbt_wp_kses($delimiter);
					}
				}
			}
			if ($show_current == 1) {
				if ($show_home_link == 1 || ($parent_id_2 != 0 && $parent_id_2 != $frontpage_id)) {
					echo rmbt_wp_kses($delimiter);
				}
				echo rmbt_wp_kses($before) . get_the_title() . rmbt_wp_kses($after);
			}
		} elseif (is_tag()) {
			echo rmbt_wp_kses($before) . sprintf($text['tag'], single_tag_title('', false)) . rmbt_wp_kses($after);
		} elseif (is_author()) {
			global $author;
			$userdata = get_userdata($author);
			echo rmbt_wp_kses($before) . sprintf($text['author'], $userdata->display_name) . rmbt_wp_kses($after);
		} elseif (is_404()) {
			echo rmbt_wp_kses($before) . esc_attr($text['404']) . rmbt_wp_kses($after);
		}

		if (get_query_var('paged')) {
			if (is_category() || is_day() || is_month() || is_year() || is_search() || is_tag() || is_author()) {
				echo ' (';
			}
			echo rmbt_wp_kses($delimiter) . esc_html__('Page', 'restaurant-site') . ' ' . get_query_var('paged');
			if (is_category() || is_day() || is_month() || is_year() || is_search() || is_tag() || is_author()) {
				echo ')';
			}
		}

		echo '</nav>';
	}
}
function rmbt_wp_kses($rmbt_string)
{
	$allowed_tags = array(
		'img' => array(
			'src' => array(),
			'alt' => array(),
			'width' => array(),
			'height' => array(),
			'class' => array(),
		),
		'a' => array(
			'href' => array(),
			'title' => array(),
			'class' => array(),
		),
		'span' => array(
			'class' => array(),
		),
		'div' => array(
			'class' => array(),
			'id' => array(),
		),
		'h1' => array(
			'class' => array(),
			'id' => array(),
		),
		'h2' => array(
			'class' => array(),
			'id' => array(),
		),
		'h3' => array(
			'class' => array(),
			'id' => array(),
		),
		'h4' => array(
			'class' => array(),
			'id' => array(),
		),
		'h5' => array(
			'class' => array(),
			'id' => array(),
		),
		'h6' => array(
			'class' => array(),
			'id' => array(),
		),
		'p' => array(
			'class' => array(),
			'id' => array(),
		),
		'strong' => array(
			'class' => array(),
			'id' => array(),
		),
		'i' => array(
			'class' => array(),
			'id' => array(),
		),
		'del' => array(
			'class' => array(),
			'id' => array(),
		),
		'ul' => array(
			'class' => array(),
			'id' => array(),
		),
		'li' => array(
			'class' => array(),
			'id' => array(),
		),
		'ol' => array(
			'class' => array(),
			'id' => array(),
		),
		'label' => array(
			'for' => array(),
		),
		'input' => array(
			'class' => array(),
			'id' => array(),
			'type' => array(),
			'style' => array(),
			'name' => array(),
			'value' => array(),
			'checked' => array(),
		),
	);
	if (function_exists('wp_kses')) {
		return wp_kses($rmbt_string, $allowed_tags);
	}
}
function rmbt_trim_excerpt($length, $text = '')
{

	global $post;

	$explicit_excerpt = $post->post_excerpt;

	if ('' != $text) {
		$explicit_excerpt = $text;
	} elseif ('' == $explicit_excerpt) {
		$text = get_the_content('');
		$text = apply_filters('the_content', $text);
		$text = str_replace(']]>', ']]>', $text);
	} else {
		$text = apply_filters('the_content', $explicit_excerpt);
	}




	$text = strip_shortcodes($text); // optional
	$text = strip_tags($text);
	$excerpt_length = $length;
	$words = explode(' ', $text, $excerpt_length + 1);
	if (count($words) > $excerpt_length) {
		array_pop($words);
		array_push($words, '[&hellip;]');
		$text = implode(' ', $words);
		$text = apply_filters('the_excerpt', $text);
	}
	return $text;
}

/**
 * Sometimes Redux provides an incorrect URL. I haven't figured out why yet
 *	gets 
 * 	id of picture field 
 * 	custom's default(!) url  
 *	checks 
 * 	is exist
 * 		Redux
 * 		url default picture in Redux's field
 * 		
 */
function rmbt_get_pic_url($id_field_pic, $custom_default_url = '')
{
	global $rmbt_impex_options;

	if (!class_exists('Redux') || !isset($rmbt_impex_options[$id_field_pic]['url']) || $rmbt_impex_options[$id_field_pic]['url'] === '') {
		return esc_url($custom_default_url !== '' ? $custom_default_url : false);
	}

	if (isset($rmbt_impex_options[$id_field_pic]['url'])) {
		if (stripos($rmbt_impex_options[$id_field_pic]['url'], get_site_url()) === 0) {
			return $rmbt_impex_options[$id_field_pic]['url'];
		} else {
			$clear_url = str_replace($_SERVER['SERVER_NAME'] . '/', '', $rmbt_impex_options[$id_field_pic]['url']);
			return esc_url(get_template_directory_uri() . $clear_url);
		}
	}
}

function rmbt_redux_img($id_field_pic, $id_svg = '')
{
	if (rmbt_get_pic_url($id_field_pic)) { ?>
		<img src="<?php echo rmbt_get_pic_url($id_field_pic); ?>" alt="">
	<?php  } else {
		if ($id_svg == '') {
			return;
		} ?>
		<svg>
			<use xlink:href="<?php echo get_template_directory_uri() ?>/assets/img/icons/sprite.svg#<?php echo $id_svg; ?>">
			</use>
		</svg>
<?php 	}
}

function rmbt_get_redux_field($id_field, $kses = false)
{
	global $rmbt_impex_options;

	if ($kses) {
		return class_exists('ReduxFramework') ? wp_kses($rmbt_impex_options[$id_field], 'post') : "";
	}

	return class_exists('ReduxFramework') ? esc_html__($rmbt_impex_options[$id_field]) : "";
}
