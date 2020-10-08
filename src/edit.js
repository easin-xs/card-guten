/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
const { InspectorControls } = wp.blockEditor;
const {
	PanelBody,
	PanelRow,
	ColorPalette,
	RangeControl 
} = wp.components;

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { className, attributes, setAttributes } ) {
	const CSS = attributes;
	const { backgroundColor, height, width } = attributes;

	// States
	const colors = [
		{ name: 'red', color: '#f44336' },
		{ name: 'purple', color: '#673ab7' },
		{ name: 'teal', color: '#009688' },
		{ name: 'green', color: '#4caf50' },
	]
	
	return (
		<div>
			<InspectorControls>
				<PanelBody title="Card Settings" initialOpen={true}>
					<PanelRow>
						<ColorPalette
							colors={colors}
							value={backgroundColor}
							onChange={(value) => setAttributes({ backgroundColor: value })}
						/>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label="Card Width" value={width} min={0} max={1000}
							onChange={(value) => setAttributes({ width: value })}
						/>
					</PanelRow>
					<PanelRow>
						<RangeControl
							label="Card Height" value={height} min={0} max={1000}
							onChange={(value) => setAttributes({ height: value })}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div className="my-card" style={CSS}>
				<h1>This is demo text</h1>
			</div>
		</div>
	);
}
