import {ProgressbarComponent} from '@agnos-ui/angular-bootstrap';
import {Component} from '@angular/core';

@Component({
	imports: [ProgressbarComponent],
	template: `
		<div class="d-flex flex-column gap-2">
			<div>
				A progressbar using custom values for minimum and maximum:
				<div auProgressbar auMin="1" auMax="5" auValue="4" [auAriaValueTextFn]="valueText">Step 4 out of 5</div>
			</div>
			<div>
				A striped animated progress bar:
				<div auProgressbar auType="info" auValue="63" auStriped auAnimated></div>
			</div>
			<div>
				Changing the height:
				<div auProgressbar [auHeight]="'1.5rem'" auValue="47"></div>
			</div>
		</div>
	`,
})
export default class SimpleCustomProgressBarComponent {
	readonly valueText = (val: number, _min: number, max: number) => `Step ${val} out of ${max}`;
}
