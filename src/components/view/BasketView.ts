import { Component } from '../base/Component';
import { createElement, ensureElement, formatNumber } from '../../utils/utils';
import { EventEmitter } from '../base/events';

interface IBasketView {
	itemList: HTMLElement[];
	total: number;
}

// Класс для установки значений в корзину
export class BasketView extends Component<IBasketView> {
	protected _itemList: HTMLElement;
	protected _basketButton: HTMLElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._itemList = ensureElement<HTMLElement>(
			'.basket__list',
			this.container
		);
		this._total = this.container.querySelector('.basket__price');
		this._basketButton = this.container.querySelector('.basket__button');

		if (this._basketButton) {
			this._basketButton.addEventListener('click', () => {
				events.emit('formPayment:open');
			});
		}
		this.itemList = [];
	}

	set itemList(items: HTMLElement[]) {
		if (items.length) {
			this.setDisabled(this._basketButton, false);
			this._itemList.replaceChildren(...items);
		} else {
			this._itemList.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this.setDisabled(this._basketButton, true);
		}
	}

	set total(total: number) {
		this.setText(this._total, formatNumber(total));
	}
}
