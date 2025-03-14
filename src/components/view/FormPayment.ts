import { IFormPayment } from '../../types';
import { ensureAllElements } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Form } from './Form';

export class FormPayment extends Form<IFormPayment> {
	protected _buttonsAlt: HTMLButtonElement[];

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._buttonsAlt = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);

		this._buttonsAlt.forEach((button) => {
			button.addEventListener('click', () => {
				this.toggleButtonState(button);
				this.events.emit(`order.payment:change`, {
					field: 'payment',
					value: button.name,
				});
			});
		});
	}

	protected toggleButtonState(activeButton: HTMLButtonElement) {
		this._buttonsAlt.forEach((button) => {
			if (button === activeButton) {
				button.disabled = true;
			} else {
				button.disabled = false;
			}
		});
	}

	setActiveButtons() {
		this._buttonsAlt.forEach(button => {
			button.disabled = false;
		})
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}
