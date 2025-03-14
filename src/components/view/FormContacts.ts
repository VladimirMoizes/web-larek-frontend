import { IFormContacts } from '../../types';
import { IEvents } from '../base/events';
import { Form } from './Form';

export class FormContacts extends Form<IFormContacts> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`formContacts:submit`);
		});
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}
