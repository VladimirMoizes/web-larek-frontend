import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

interface IPage {
	counter: number;
	itemList: HTMLElement[];
	wrapper: boolean;
	buttonBasket: HTMLButtonElement;
}

export class Page extends Component<IPage> {
	protected _counter: HTMLElement;
	protected _itemList: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _buttonBasket: HTMLButtonElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);

		this._counter = ensureElement<HTMLSpanElement>('.header__basket-counter');
		this._itemList = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._buttonBasket = ensureElement<HTMLButtonElement>('.header__basket');

		this._buttonBasket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set counter(value: string) {
		this.setText(this._counter, value);
	}

	set itemList(items: HTMLElement[]) {
		this._itemList.replaceChildren(...items);
	}

	set locked(value: boolean) {
		// Проверить toggleClass
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
