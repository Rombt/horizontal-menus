<?php

/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package simple_restaurant_site
 */

get_header();
?>
<?php get_template_part('template-parts/parts/head_pages'); ?>


<main id="primary" class="site-main container-for-wp-blocs">

	<?php if (have_posts()) : ?>

		<header class="page-header ">
			<h1 class="page-title">
				<?php
				/* translators: %s: search query. */
				printf(esc_html__('Search Results for: %s', 'simple-restaurant-site'), '<span>' . get_search_query() . '</span>');
				?>
			</h1>
		</header>

	<?php
		while (have_posts()) :
			the_post();
			get_template_part('template-parts/content', 'search');

		endwhile;

		the_posts_navigation();

	else :

		get_template_part('template-parts/content', 'none');

	endif;
	?>

</main>

<?php


// get_sidebar();
get_footer();
