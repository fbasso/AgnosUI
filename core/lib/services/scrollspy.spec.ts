import {describe, expect, test} from 'vitest';
import {createScrollspy} from './scrollspy';

describe(`Scrollspy service`, () => {
	test(`Basic functionalities`, () => {
		// document.body.innerHTML = `
		// 	<div id="container" style="width: 100%; height: 50px;">
		// 		<h1>h1</h1>
		// 		<p>Content</p>
		// 		<h2>h2</h2>
		// 		<h3>h3</h3>
		// 		<h4>h4</h4>
		// 		<h5>h5</h5>
		// 		<h6>h6</h6>
		// 	</div>
		// `;
		// let elementsText: string[] = [];
		// const {elements$, directive} = createScrollspy();
		// const unsubscribe = elements$.subscribe((elements) => {
		// 	elementsText = elements.map((node) => node.innerText);
		// });
		// directive(document.querySelector('#container')! as HTMLElement);
		// expect(elementsText).toStrictEqual(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
		// unsubscribe();
	});
});
