import type {Directive} from '../types';
import {browserDirective} from '../utils/directive';
import {noop} from '../utils/func';
import {addEvent} from '../utils/internal/dom';

/**
 * Represents the position of the mouse during a mousedown event.
 * Typically used to capture the x and y coordinates of the mouse
 * when the user presses a mouse button.
 *
 */
export interface MousedownPosition {
	/**
	 * The initial X coordinate where the mouse button was pressed down.
	 */
	xOrigin: number;

	/**
	 * The initial Y coordinate where the mouse button was pressed down.
	 */
	yOrigin: number;

	/**
	 * The current X coordinate of the mouse pointer.
	 */
	x: number;

	/**
	 * The current Y coordinate of the mouse pointer.
	 */
	y: number;
}

/**
 * Configuration options for tracking mouse position after a mousedown event.
 */
export interface MousedownPositionOptions {
	/**
	 * Callback function invoked when the mouse moves after a mousedown event.
	 * @param position - The current mouse position information including origin and current coordinates.
	 */
	onMouseMove: (position: MousedownPosition) => void;
}

/**
 * Creates a directive for tracking mouse position during drag operations.
 *
 * This function sets up event listeners that track mouse movements from an initial mousedown event
 * through mousemove and mouseup events. It provides a directive that can be attached to DOM elements
 * to enable drag tracking functionality.
 *
 * @param options - Configuration options for the mousedown position tracker.
 * @param options.onMouseMove - Callback function invoked when the mouse moves during a drag operation.
 *
 * @returns An object containing the mousedownPositionDirective that can be applied to elements.
 *
 * @example
 * ```typescript
 * const { mousedownPositionDirective } = createMousedownPosition({
 *   onMouseMove: (position) => {
 *     console.log(`Mouse moved from (${position.xOrigin}, ${position.yOrigin}) to (${position.x}, ${position.y})`);
 *   }
 * });
 * ```
 */
export function createMousedownPosition({onMouseMove}: MousedownPositionOptions) {
	const mousedownPositionDirective: Directive = browserDirective((element) => {
		let removeMouseMoveEvent = noop;
		let removeMouseUpEvent = noop;

		const removeMouseDownEvent = addEvent(element, 'mousedown', () => {
			removeMouseMoveEvent();
			removeMouseMoveEvent = addEvent(element, 'mousemove', () => {
				removeMouseMoveEvent();
				removeMouseMoveEvent = addEvent(document, 'mousemove', (e) => {
					e.preventDefault();
					// On limite la largeur si besoin (par exemple à 100 - 600px)
					// let newWidth = Math.max(100, Math.min(e.clientX, 600)) + 'px';
					// layout.style.setProperty('--sidebar', newWidth);
				});

				removeMouseUpEvent();
				removeMouseUpEvent = addEvent(document, 'mouseup', () => {
					removeMouseMoveEvent();
					removeMouseUpEvent();
				});
			});
		});

		return {
			destroy() {
				removeMouseDownEvent();
				removeMouseMoveEvent();
				removeMouseUpEvent();
			},
		};
	});

	return {
		mousedownPositionDirective,
	};
}
