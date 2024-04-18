<?php


function update_fields_show_on_front_page() {
	// авторизованый пользователь должен иметь соответсвующие права (права админа например)

	if ( ! wp_verify_nonce( $_POST['nonce'], 'rstr_food_menu_items_show_in_front_page' ) ) {
		wp_die();
	}

	$post_id = $_POST['post_id'];
	$field_name = $_POST['field_name'];
	$field_value = $_POST['field_value']; // todo проеобразовывать в PHP формат для хранения в базе данных нужно здесь а так же санитизация и прочее serialize()

	update_field( $field_name, $field_value, $post_id );
	wp_die();
}
add_action( 'wp_ajax_update_custom_field', 'update_fields_show_on_front_page' );

function ingredient_action() {

	$post_id = $_POST['postId'];
	$ingredient_id = $_POST['ingredientId'];
	$operation = $_POST['operation'];
	$key_field = $_POST['count'];
	$value = $_POST['nameTargetBlock'];

	if ( isset( $_POST['objAdditionalFields'] ) ) {
		$arr_additional_fields = array_fill_keys( $_POST['objAdditionalFields'], '' );
	}

	if ( ! wp_verify_nonce( $_POST['nonce'], 'rstr_ingredients_fild' ) ) {
		wp_die();
	}
	if ( $operation == "dell" ) {

		delete_post_meta( $post_id, $ingredient_id );
	} else if ( $operation == "add" ) {
		include plugin_dir_path( __FILE__ ) . '../assets/template_parts/ingredient_block.php';
	}

	wp_die();
}
add_action( 'wp_ajax_ingredient_action', 'ingredient_action' );