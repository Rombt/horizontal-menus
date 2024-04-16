<!-- <!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="./assets/styles/main-style.min.css" rel="stylesheet" type="text/css">
	<title>Document</title>
</head>

<body>

</body>

</html> -->




<!-- !!!!!!!!!!!    YOU CAN CHOOSE ONE OF THIS VARIANTS !!!!!!!!!!!!!!-->



<?php get_header(); ?>

<main class="wrapper-section">
	<div class="rmbt-full-width rmbt-blog-full-width">
		<section class="rmbt-container rmbt-blog">
			<h1>Blog</h1>
			<div class="rmbt-blog__row">
				<div class="rmbt-blog__col">
					<?php if (have_posts()) {
						while (have_posts()) :
							the_post();
							the_content();
						// get_template_part('template-parts/parts/article_blog');
						endwhile;
					} else {
						//   get_template_part('partials/notfound');
					}
					?>
				</div>
			</div>
		</section>
	</div>
</main>

<?php get_template_part('template-parts/components/pagination'); ?>

<?php get_footer();
