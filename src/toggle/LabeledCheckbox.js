'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Text} from 'react-native';
import withMaterialTheme from '../styles/withMaterialTheme';
import {withMeasurementForwarding, filterProps, LAYOUT_PROPS} from '../util';
import RectRipple from '../touchable/RectRipple';
import CoreCheckbox from './CoreCheckbox';
import * as typo from '../styles/typo';

/**
 * Checkbox with a label right beside it, useful for things like "remember me" checkboxes
 */
class LabeledCheckbox extends PureComponent {
	static defaultProps = {
		checked: false,
	};

	onPress = (e) => {
		this.props.onPress && this.props.onPress(e);
		this.props.onChangeChecked && this.props.onChangeChecked(!this.props.checked);
	};

	render() {
		const {
			onPress, // eslint-disable-line no-unused-vars
			style,
			labelColor: labelColorOverride,
			label,
			...checkboxProps
		} = this.props;
		const {
			materialTheme,
			...props
		} = checkboxProps;
		const [layoutProps] = filterProps(props, LAYOUT_PROPS);

		const isRTL = false; // @todo support RTL

		const normalProps = materialTheme.checkbox.theme === 'dark' ? {light: true} : {dark: true};
		const labelColor = labelColorOverride || materialTheme.checkbox.labelColor;

		// @todo Use disabled to disable ripple/press
		return (
			<RectRipple
				ref={this._setMeasureRef}
				{...normalProps}
				{...layoutProps}
				pointerEvents='box-only'
				style={[
					style,
					styles.root
				]}
				onPress={this.onPress}>
				<CoreCheckbox
					style={styles.checkbox}
					{...checkboxProps} />
				<Text
					suppressHighlighting
					numberOfLines={1}
					style={[
						styles.label,
						isRTL ? styles.labelRTL : styles.labelLTR,
						{
							color: labelColor,
						}
					]}>
					{label}
				</Text>
			</RectRipple>
		);
	}
}

export default withMaterialTheme(withMeasurementForwarding(LabeledCheckbox));

const styles = StyleSheet.create({
	root: {
		height: 48,
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkbox: {
		marginHorizontal: (48 - 24) / 2,
	},
	label: {
		...typo.body1,
		marginHorizontal: (48 - 24) / 2,
	},
	labelLTR: {
		marginLeft: 0,
	},
	labelRTL: {
		marginRight: 0,
	},
});
