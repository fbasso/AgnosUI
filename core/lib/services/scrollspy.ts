import type {ReadableSignal} from '@amadeus-it-group/tansu';
import {asReadable, batch, computed, derived, writable} from '@amadeus-it-group/tansu';
import {writablesForProps, type ValuesOrStores} from './stores';

export type PropsConfig<T extends object> = ReadableSignal<Partial<T>> | ValuesOrStores<T>;
export interface ScrollSpyProps {
	/**
	 * elements to observe
	 */
	elements: HTMLElement[];
}

const defaultValues: ScrollSpyProps = {
	elements: [],
};

export const createScrollspy = (config?: PropsConfig<ScrollSpyProps>) => {
	const [{elements$}, patch] = writablesForProps(defaultValues, config);

	const observedElements = new Set<HTMLElement>();
	const observedElements$ = derived(
		elements$,
		(elements, set) => {
			observedElements.clear();
			const observer = getIntersectionObserver();
			if (observer) {
				for (const element of elements) {
					observer.observe(element);
					observedElements.add(element);
				}
			}
			set(observedElements);

			return () => {
				const observer = getIntersectionObserver();
				if (observer) {
					for (const element of observedElements) {
						observer.unobserve(element);
					}
				}
				observedElements.clear();
			};
		},
		observedElements
	);

	const visibleElements = new Set<HTMLElement>();
	const visibleElements$ = writable(visibleElements);
	let gapElement: HTMLElement | undefined;

	let intersectionObserver: IntersectionObserver;
	function getIntersectionObserver() {
		if (!intersectionObserver && typeof window !== 'undefined') {
			intersectionObserver = new IntersectionObserver(
				(entries) => {
					batch(() => {
						for (const {isIntersecting, target, boundingClientRect, rootBounds} of entries) {
							console.log('(DEBUG)   ELEMENT STATE CHANGE\n\n', {isIntersecting, target, boundingClientRect, rootBounds});
							const htmlElement = target as HTMLElement;
							if (isIntersecting) {
								if (gapElement) {
									visibleElements.delete(gapElement);
									gapElement = undefined;
								}
								visibleElements.add(htmlElement);
								console.log('(DEBUG)   add element', htmlElement);
							} else {
								visibleElements.delete(htmlElement);

								// nothing is visible anymore, but something just was actually
								if (visibleElements.size === 0) {
									console.log('(DEBUG)   No visible element:', boundingClientRect, rootBounds);
									// 2.1 scrolling down - keeping the same element
									if (boundingClientRect.top < rootBounds!.top) {
										gapElement = htmlElement;
										visibleElements.add(htmlElement);
										console.log('(DEBUG)   scrolling down:', htmlElement);
									}
									// 2.2 scrolling up - getting the previous element
									else {
										const [firstElement] = observedElements;
										console.log('(DEBUG)   scrolling up:', htmlElement);
										console.log('(DEBUG)   firstElement:', firstElement);
										console.log('(DEBUG)   target === firstElement:', htmlElement === firstElement);
										// scrolling up and no more fragments above
										if (htmlElement === firstElement) {
											gapElement = undefined;
											visibleElements.clear();
											return;
										}

										// getting previous fragment
										else {
											const elements = [...observedElements];
											const htmlIndex = elements.indexOf(htmlElement);
											gapElement = elements[htmlIndex - 1];
											if (gapElement) {
												visibleElements.add(gapElement);
											}
											console.log('(DEBUG)   getting previous fragment:', gapElement);
										}
									}
								}
							}
						}

						// Trigger changes
						visibleElements$.set(visibleElements);
					});
				},
				{
					root: window.document,
					// threshold: 0.8,
				}
			);
		}
		return intersectionObserver;
	}

	return {
		elements$: asReadable(observedElements$),
		visibleElements$: asReadable(visibleElements$),
		patch,
	};
};
