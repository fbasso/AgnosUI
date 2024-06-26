import type {
	RatingActions,
	RatingDirectives,
	StarContext,
	RatingState as CoreState,
	RatingProps as CoreProps,
} from '@agnos-ui/core/components/rating';
import {getRatingDefaultConfig as getCoreDefaultConfig, createRating as createCoreRating} from '@agnos-ui/core/components/rating';
import {extendWidgetProps, type ExtendWidgetAdaptSlotWidgetProps} from '@agnos-ui/core/services/extendWidget';
import type {SlotContent, Widget, WidgetFactory} from '@agnos-ui/core/types';

export * from '@agnos-ui/core/components/rating';

interface RatingExtraProps {
	/**
	 * The template to override the way each star is displayed.
	 */
	slotStar: SlotContent<StarContext>;
}

export interface RatingState extends ExtendWidgetAdaptSlotWidgetProps<CoreState, RatingExtraProps, object> {}
export interface RatingProps extends ExtendWidgetAdaptSlotWidgetProps<CoreProps, RatingExtraProps, object> {}

export type RatingWidget = Widget<RatingProps, RatingState, object, RatingActions, RatingDirectives>;

const defaultConfigExtraProps: RatingExtraProps = {
	slotStar: ({fill}: StarContext) => String.fromCharCode(fill === 100 ? 9733 : 9734),
};

/**
 * Retrieve a shallow copy of the default Rating config
 * @returns the default Rating config
 */
export function getRatingDefaultConfig(): RatingProps {
	return {...getCoreDefaultConfig(), ...defaultConfigExtraProps} as any;
}

/**
 * Create a Progressbar with given config props
 * @param config - an optional progressbar config
 * @returns a ProgressbarWidget
 */

export const createRating: WidgetFactory<RatingWidget> = extendWidgetProps(createCoreRating, defaultConfigExtraProps, {});
