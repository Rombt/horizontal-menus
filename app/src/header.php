<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>

	<?php if ( session_status() == PHP_SESSION_NONE ) {
		session_start();
	} ?>


	<?php global $restaurant_site_options; ?>


	<div class="conteiner">
		<header class="header ">
			<a href="<?php echo esc_url( get_home_url() ); ?>" class="logo">

				<?php
				// class_exists('ReduxFramework') ? 'Плагин Redux установлен и активирован.' : 'Плагин Redux не установлен или не активирован.';
				?>


				<?php if ( class_exists( 'ReduxFramework' ) && isset( $restaurant_site_options['logo_site']['url'] ) ) { ?>
					<img src="<?php echo esc_url( $restaurant_site_options['logo_site']['url'] ) ?>" alt="Site logo">
				<?php } else { ?>
					<h1 class='redux_font-title_site'>
						<?php esc_attr( bloginfo( 'title' ) ) ?>
					</h1>
				<?php } ?>
			</a>
			<?php if ( has_nav_menu( 'header_nav' ) ) { ?>
				<div class="heder-menu__burger">
					<span></span>
				</div>

				<?php wp_nav_menu(
					array(
						'theme_location' => 'header_nav',
						'container' => 'nav',
						'container_class' => 'heder-menu redux_font-heder_navigation',
						'container_id' => 'heder-menu',
					)
				);
			} ?>

			<div class="cart-book">
				<?php if ( class_exists( 'ReduxFramework' ) && isset( $restaurant_site_options['search_icon']['url'] ) ) { ?>
					<div href="#" class="wrap-img search-icon">
						<img class="wrap-img search-icon"
							src="<?php echo esc_url( $restaurant_site_options['search_icon']['url'] ) ?>" alt="">
					</div>
				<?php } ?>
				<div class="cart">
					<div class="cart__cercle">3</div>
					<a href="shopping-cart.html">
						<?php if ( class_exists( 'ReduxFramework' ) && isset( $restaurant_site_options['icon_cart']['url'] ) ) { ?>
							<img src="<?php echo esc_url( $restaurant_site_options['icon_cart']['url'] ) ?>" alt="icon cart">
						<?php } ?>
					</a>
				</div>
				<?php get_template_part( 'template-parts/components/button', 'book', [ 'href' => '#', 'title' => 'BOOK YOU TABLE' ] ); ?>
			</div>
		</header>
	</div>
	<?php get_template_part( 'template-parts/parts/searchform' ); ?>