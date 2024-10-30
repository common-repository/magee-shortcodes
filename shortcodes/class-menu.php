<?php
namespace MageeShortcodes\Shortcodes;
use MageeShortcodes\Classes\Helper;

class Magee_Menu {

	public static $args;
    private  $id;

	/**
	 * Initiate the shortcode
	 */
	public function __construct() {

        add_shortcode( 'ms_menu', array( $this, 'render' ) );
	}

	/**
	 * Render the shortcode
	 * @param  array $args     Shortcode paramters
	 * @param  string $content Content between shortcode
	 * @return string          HTML output
	 */
	function render( $args, $content = '') {


		Helper::get_style_depends(['font-awesome', 'magee-shortcodes']);
		
		$defaults =	Helper::set_shortcode_defaults(
			array(
				'style' => '1',
				'menu'  => '',
				'class' => '',
				'id'    => '',
			), $args
		);
		extract( $defaults );
		self::$args = $defaults;

		$class .= ' magee-shortcode magee-menu';
		if(isset($menu)):
			switch($style){
				case 2:
					$menus = array(
						'menu' => esc_attr($menu),
						'container_class' => 'mspro-menu-style2',
						'items_wrap' => '<ul id="'.esc_attr($id).'" class="%2$s ' . esc_attr($class) . '">%3$s</ul>'
					);
					break;
				case 1:
				default:
					$menus = array(
						'menu' => esc_attr($menu),
						'items_wrap' => '<ul id="'.esc_attr($id).'" class="%2$s' . esc_attr($class) . '">%3$s</ul>'
					);
					break;
			}
			
			$html = wp_nav_menu($menus);
			return $html;
		endif;
   }
}

new Magee_Menu();