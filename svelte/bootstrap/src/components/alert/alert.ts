export * from '@agnos-ui/core-bootstrap/components/alert';

import type {
	AdaptWidgetSlots,
	WidgetPropsSlots,
	WidgetFactory,
	WidgetProps,
	WidgetState,
	PropType,
	AdaptSlotContentProps,
} from '@agnos-ui/svelte-headless/types';
import {createAlert as coreCreateAlert} from '@agnos-ui/core-bootstrap/components/alert';
import type {AlertWidget as CoreWidget, AlertContext as CoreContext} from '@agnos-ui/core-bootstrap/components/alert';

// widget
export interface AlertWidget extends AdaptWidgetSlots<CoreWidget> {}
export interface AlertProps extends WidgetProps<AlertWidget> {}
export interface AlertState extends WidgetState<AlertWidget> {}
export interface AlertApi extends PropType<AlertWidget, 'api'> {}
// slots
export interface AlertSlots extends WidgetPropsSlots<AlertProps> {}
export interface AlertContext extends AdaptSlotContentProps<CoreContext> {}
// factory
export const createAlert: WidgetFactory<AlertWidget> = coreCreateAlert as any;
