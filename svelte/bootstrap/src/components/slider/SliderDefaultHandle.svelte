<script lang="ts">
	import type {SliderSlotHandleContext} from './slider.gen';

	let {item, directives}: SliderSlotHandleContext = $props();

	let refocusElement: HTMLElement | undefined = $state(undefined);
	let updateTimeout: NodeJS.Timeout;

	// Manually keep focus as scheduling goal elements are re-ordered.
	// Svelte currently does not retain focus as elements are moved, even when keyed.
	// See discussion here: https://github.com/sveltejs/svelte/issues/3973
	$effect(() => {
		if (refocusElement) {
			updateTimeout = setTimeout(() => {
				refocusElement?.focus();
				refocusElement = undefined;
			});
		}
	});

	/**
	 * Key handler that sets the refocus element only on the key strokes that move
	 * the element up the DOM
	 * @param event object containting key stroke and the target element
	 */
	function onkeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowUp':
			case 'ArrowRight':
			case 'End':
			case 'ArrowDown':
			case 'ArrowLeft':
			case 'Home':
				refocusElement = event.target as HTMLElement;
				clearTimeout(updateTimeout);
				break;
			default:
				break;
		}
	}
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<button {onkeydown} use:directives.handleDirective={{item}}></button>
