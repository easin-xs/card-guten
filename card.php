<?php
/**
 * Plugin Name:     Card
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     card
 *
 * @package         create-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_card_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/card" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-card-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array('wp-blocks', 'wp-element', 'wp-i18n', 'wp-polyfill', 'wp-editor'),
		$script_asset['version']
	);
	wp_set_script_translations( 'create-block-card-block-editor', 'card' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'create-block-card-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-card-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'create-block/card', array(
		'editor_script' => 'create-block-card-block-editor',
		'editor_style'  => 'create-block-card-block-editor',
		'style'         => 'create-block-card-block',
	) );
}
add_action( 'init', 'create_block_card_block_init' );
