import {beforeEach, describe, expect, test} from 'vitest';
import {bindAttribute, bindClassName, bindStyle, computeCommonAncestor, virtualNode} from './dom';
import {assign} from '../../../../common/utils';
import {writable} from '@amadeus-it-group/tansu';

describe('computeCommonAncestor', () => {
	let parentElement: HTMLElement;
	beforeEach(() => {
		parentElement = document.body.appendChild(document.createElement('div'));
		return () => {
			parentElement.parentElement?.removeChild(parentElement);
		};
	});

	test('Basic functionalities', () => {
		parentElement.innerHTML = `
			<div id="element1">
				<div id="element2"></div>
				<div id="element3"></div>
			</div>
		`;
		const element1 = document.getElementById('element1')!;
		const element2 = document.getElementById('element2')!;
		const element3 = document.getElementById('element3')!;
		const element4 = document.createElement('div');
		expect(computeCommonAncestor([])).toBe(null);
		expect(computeCommonAncestor([element1])).toBe(element1);
		expect(computeCommonAncestor([element1, element1])).toBe(element1);
		expect(computeCommonAncestor([element1, element1, element1])).toBe(element1);
		expect(computeCommonAncestor([element1, element2])).toBe(element1);
		expect(computeCommonAncestor([element2, element1])).toBe(element1);
		expect(computeCommonAncestor([element1, element3])).toBe(element1);
		expect(computeCommonAncestor([element3, element1])).toBe(element1);
		expect(computeCommonAncestor([element2, element3])).toBe(element1);
		expect(computeCommonAncestor([element3, element2])).toBe(element1);
		expect(computeCommonAncestor([element1, element2, element3])).toBe(element1);
		expect(computeCommonAncestor([element2, element1, element3])).toBe(element1);
		expect(computeCommonAncestor([element2, element3, element1])).toBe(element1);
		expect(computeCommonAncestor([element3, element2, element1])).toBe(element1);
		expect(computeCommonAncestor([element3, element1, element2])).toBe(element1);
		expect(computeCommonAncestor([element4])).toBe(element4);
		expect(computeCommonAncestor([element1, element4])).toBe(null);
		expect(computeCommonAncestor([element4, element1])).toBe(null);
	});

	test('virtualNode', () => {
		const node = virtualNode();

		const expectedState: Record<string, string> = {a: 'a'};

		// node.setAttribute('a', 'a');
		// expect(node.getAttributes()).toStrictEqual(expectedState);

		// node.removeAttribute('a');
		// expect(node.getAttributes()).toStrictEqual({});

		node.setAttribute('a', '');
		expect(node.getAttributes()).toStrictEqual(
			assign(expectedState, {
				a: '',
			}),
		);

		const classList = node.classList;
		classList.add('c1');
		expect(node.getAttributes()).toStrictEqual({
			...expectedState,
			class: 'c1',
		});
		classList.remove('c1');
		expect(node.getAttributes()).toStrictEqual(expectedState);

		classList.add('c1');
		expect(node.getAttributes()).toStrictEqual({
			...expectedState,
			class: 'c1',
		});
	});

	test('bindAttribute', () => {
		const vNode = virtualNode();
		const node = vNode as unknown as HTMLElement;
		const a$ = writable(<any>'a');

		const unbind = bindAttribute(node, 'a', a$);

		const expectedState: Record<string, string> = {a: 'a'};
		expect(vNode.getAttributes()).toStrictEqual(expectedState);

		a$.set('b');
		expect(vNode.getAttributes()).toStrictEqual(assign(expectedState, {a: 'b'}));

		a$.set('');
		expect(vNode.getAttributes()).toStrictEqual(assign(expectedState, {a: ''}));

		a$.set(true);
		expect(vNode.getAttributes()).toStrictEqual(assign(expectedState, {a: ''}));

		a$.set(false);
		delete expectedState.a;
		expect(vNode.getAttributes()).toStrictEqual(expectedState);

		a$.set('a');
		a$.set(undefined);
		expect(vNode.getAttributes()).toStrictEqual(expectedState);

		a$.set('a');
		a$.set(null);
		expect(vNode.getAttributes()).toStrictEqual(expectedState);

		unbind();

		a$.set('changes');
		expect(vNode.getAttributes()).toStrictEqual(expectedState);
	});

	test('bindStyle', () => {
		const vNode = virtualNode();
		const node = vNode as unknown as HTMLElement;
		const a$ = writable(<any>'a');

		const unbind = bindStyle(node, 'a', a$);

		const expectedState: Record<string, string> = {style: 'a=a'};
		expect(vNode.getAttributes()).toStrictEqual(expectedState);

		a$.set('b');
		expect(vNode.getAttributes()).toStrictEqual(assign(expectedState, {style: 'a=b'}));

		a$.set('');
		delete expectedState.style;
		expect(vNode.getAttributes()).toStrictEqual(expectedState);

		a$.set('a');
		a$.set(false);
		expect(vNode.getAttributes()).toStrictEqual(expectedState);

		a$.set('a');
		a$.set(undefined);
		expect(vNode.getAttributes()).toStrictEqual(expectedState);

		a$.set('a');
		a$.set(null);
		expect(vNode.getAttributes()).toStrictEqual(expectedState);

		unbind();

		a$.set('changes');
		expect(vNode.getAttributes()).toStrictEqual(expectedState);
	});

	test('bindClassName', () => {
		const vNode = virtualNode();
		const node = vNode as unknown as HTMLElement;
		const a$ = writable(<boolean>true);
		const b$ = writable(<boolean>false);

		const unbindA = bindClassName(node, 'a', a$);
		const unbindB = bindClassName(node, 'b', b$);

		const expectedState: Record<string, string> = {class: 'a'};
		expect(vNode.getAttributes()).toStrictEqual(expectedState);

		a$.set(false);
		delete expectedState.class;
		expect(vNode.getAttributes()).toStrictEqual(expectedState);

		a$.set(true);
		b$.set(true);
		expect(vNode.getAttributes()).toStrictEqual(assign(expectedState, {class: 'a b'}));

		a$.set(false);
		expect(vNode.getAttributes()).toStrictEqual(assign(expectedState, {class: 'b'}));

		a$.set(true);
		expect(vNode.getAttributes()).toStrictEqual(assign(expectedState, {class: 'b a'}));

		unbindA();
		unbindB();

		expect(vNode.getAttributes()).toStrictEqual({});
	});
});
