import type {AdaptWidgetSlots, WidgetProps, WidgetState, AdaptSlotContentProps, WidgetFactory} from '@agnos-ui/angular-headless';
import {createAccordion as coreCreateAccordion} from '@agnos-ui/core-bootstrap/components/accordion';

export * from '@agnos-ui/core-bootstrap/components/accordion';

export type AccordionWidget = AdaptWidgetSlots<import('@agnos-ui/core-bootstrap/components/accordion').AccordionWidget>;
export type AccordionProps = WidgetProps<AccordionWidget>;
export type AccordionState = WidgetState<AccordionWidget>;
export type AccordionApi = AccordionWidget['api'];
export type AccordionItemWidget = AdaptWidgetSlots<import('@agnos-ui/core-bootstrap/components/accordion').AccordionItemWidget>;
export type AccordionItemProps = WidgetProps<AccordionItemWidget>;
export type AccordionItemState = WidgetState<AccordionItemWidget>;
export type AccordionItemContext = AdaptSlotContentProps<import('@agnos-ui/core-bootstrap/components/accordion').AccordionItemContext>;
export const createAccordion: WidgetFactory<AccordionWidget> = coreCreateAccordion as WidgetFactory<AccordionWidget>;
