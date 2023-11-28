<div class="background background__footer">
	<?php global $restaurant_site_options; ?>
	<div class="footer conteiner">
		<section class="footer__row">
			<div class="footer__navigation">
				<?php echo '<h2>' . ( class_exists( 'ReduxFramework' ) ? esc_html( $restaurant_site_options['title_one'] ) : "" ) . '</h2>' ?>
				<?php wp_nav_menu(
					array(
						'theme_location' => 'footer_nav',
						'menu_id' => 'footer-menu',
					)
				); ?>
			</div>
			<div class="footer__news">
				<?php echo '<h2>' . ( class_exists( 'ReduxFramework' ) ? esc_html( $restaurant_site_options['title_two'] ) : "" ) . '</h2>' ?>
				<span>Enter your email address and subscribe daily newsletter</span>
				<div class="form-footer">
					<div class="form-footer__input">
						<!-- <img src="img/form-icon_email.png" alt=""> -->
						<p>Email Address</p>
						<input type="email">
					</div>
					<a href="#" class="button-orange ">Subscribe</a>
				</div>
				<?php get_template_part( 'template-parts/components/icons_block' ); ?>
			</div>
			<div class="footer__app">
				<?php echo '<h2>' . ( class_exists( 'ReduxFramework' ) ? esc_html( $restaurant_site_options['title_three'] ) : "" ) . '</h2>' ?>
				<?php get_template_part( 'template-parts/components/button', 'app', [ 
					'href' => class_exists( 'ReduxFramework' ) ? esc_html__( $restaurant_site_options['linck-app-apple'], 'restaurant-site' ) : "",
					'icon' => class_exists( 'ReduxFramework' ) ? $restaurant_site_options['icon-app-apple']['url'] : "",
					'text' => 'Avilable on the',
					'title' => 'App Store',
				] );
				?>
				<?php get_template_part( 'template-parts/components/button', 'app', [ 
					'href' => class_exists( 'ReduxFramework' ) ? esc_html__( $restaurant_site_options['linck-app-google'], 'restaurant-site' ) : "",
					'icon' => class_exists( 'ReduxFramework' ) ? $restaurant_site_options['icon-app-google']['url'] : "",
					'text' => 'Get it on',
					'title' => ' Google Play',
				] );
				?>
			</div>
		</section>
	</div>
	<div class="copyright-block">
		<span></span>
		<?php echo '<p>' . ( class_exists( 'ReduxFramework' ) ? wp_kses_post( $restaurant_site_options['copyright'] ) : "" ) . '</p>' ?>
		<span></span>
	</div>

</div>



<?php wp_footer(); ?>
</body>

</html>