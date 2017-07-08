'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Text} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';
import RectRipple from '../touchable/RectRipple';
import elevation from '../styles/elevation';
import * as typo from '../styles/typo';
import {largePrimaryTextShade} from '../styles/wcag';

const defaultHitSlop = {
	top: 6, bottom: 6,
	left: 0, right: 0,
};

class Button extends PureComponent {
	static defaultProps = {
		disabled: false,
	};

	render() {
		const {
			materialTheme,
			disabled,
			text,
			hitSlop,
			onPress,
			onLongPress,
			onAccessibilityTap,
			onMagicTap,
			raised,
			solid: solidOverride,
			primary,
			accent,
			disabledColor: disabledColorOverride,
			tintColor: tintColorOverride,
			style,
		} = this.props;

		let backgroundColor, color;
		if ( raised ) {
			const tintColor = (
				tintColorOverride
				|| (primary && materialTheme.button.tintColor)
				|| (accent && materialTheme.button.accentColor)
			);

			// Raised buttons default to solid when primary, accent, or custom tint colors are passed
			const solid = typeof solidOverride === 'boolean' ? solidOverride : !!tintColor;

			if ( solid ) {
				backgroundColor = (
					(disabled && materialTheme.button.disabledBackground)
					|| tintColor
					|| materialTheme.button.tintColor
				);
				color = disabled
					? materialTheme.button.disabledColor
					: largePrimaryTextShade(backgroundColor);
			} else {
				backgroundColor = (
					(disabled && materialTheme.button.disabledBackground)
					|| materialTheme.palette.container
				);
				color = disabled
					? materialTheme.button.disabledColor
					: tintColor || materialTheme.text.primaryColor;
			}
		} else {
			color = (
				(disabled && (disabledColorOverride || materialTheme.text.disabledColor))
				|| tintColorOverride
				|| (primary && materialTheme.button.tintColor)
				|| (accent && materialTheme.button.accentColor)
				|| materialTheme.text.primaryColor
			);
		}

		return (
			<RectRipple
				pointerEvents='box-only'
				{...(disabled ? {} : {onPress, onLongPress, onAccessibilityTap, onMagicTap})}
				hitSlop={hitSlop || defaultHitSlop}
				style={[
					styles.base,
					style,
					styles.root,
					raised ? styles.raised : styles.flat,
					raised && !disabled && elevation(2),
					{
						backgroundColor,
					}
				]}>
				<Text
					suppressHighlighting
					numberOfLines={1}
					accessibilityComponentType='button'
					accessibilityTraits={disabled ? 'disabled' : 'button'}
					style={[
						styles.text,
						{
							color,
						}
					]}>
					{text}
				</Text>
			</RectRipple>
		);
	}
}

export default withMaterialTheme(Button);

const styles = StyleSheet.create({
	base: {
		alignSelf: 'flex-start',
	},
	root: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 2,
		height: 36,
		minWidth: 88,
	},
	flat: {
		paddingHorizontal: 8,
	},
	raised: {
		paddingHorizontal: 16,
	},
	text: {
		...typo.button,
		textAlign: 'center',
		lineHeight: 20,
	},
});