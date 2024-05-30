<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>

	<div class="rmbt-page-wrap">


		<?php
		// для стандартного WP виджета поиск файл searchform.php должен находится в корне темы
		// для работоспособности поиска в целом searchform.php может быть где угодно
		get_template_part('searchform');
		?>