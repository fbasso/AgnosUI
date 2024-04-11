export * from '@agnos-ui/core-bootstrap/components/progressbar';

import type {AdaptWidgetSlots, WidgetPropsSlots, WidgetFactory, WidgetProps, WidgetState} from '@agnos-ui/svelte-headless/types';

export type ProgressbarWidget = AdaptWidgetSlots<import('@agnos-ui/core-bootstrap/components/progressbar').ProgressbarWidget>;
export type ProgressbarProps = WidgetProps<ProgressbarWidget>;
export type ProgressbarState = WidgetState<ProgressbarWidget>;
export type ProgressbarSlots = WidgetPropsSlots<ProgressbarProps>;
import {createProgressbar as coreCreateProgressbar} from '@agnos-ui/core-bootstrap/components/progressbar';
export const createProgressbar: WidgetFactory<ProgressbarWidget> = coreCreateProgressbar as any;