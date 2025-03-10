import {AlertComponent} from '@agnos-ui/angular-bootstrap';
import {provideWidgetsConfig} from '@agnos-ui/angular-bootstrap';
import {Component} from '@angular/core';
import AlertIconComponent from './alert-icon.component';

@Component({
	imports: [AlertComponent],
	providers: [
		provideWidgetsConfig((config) => {
			config.alert = {...config.alert, dismissible: false, className: 'd-flex align-items-center', structure: AlertIconComponent};
			return config;
		}),
	],
	template: `
		<au-component auAlert auType="success">Alert success with a customisable icon</au-component>
		<au-component auAlert auType="warning">Alert warning with a customisable icon</au-component>
		<au-component auAlert auType="danger">Alert danger with a customisable icon</au-component>
		<au-component auAlert auType="info">Alert info with a customisable icon</au-component>
		<au-component auAlert auType="light">Alert light with a customisable icon</au-component>
	`,
})
export default class IconAlertComponent {}
