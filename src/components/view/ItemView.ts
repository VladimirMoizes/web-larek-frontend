import { IItem } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

interface IItemActions {
	// Метод события мыши (клик). Передаём как опциональный параметр
	onClick: (event: MouseEvent) => void;
}

export class ItemView extends Component<IItem> {
	protected _description?: HTMLParagraphElement;
	protected _image?: HTMLImageElement;
	protected _title: HTMLElement;
	protected _category?: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _basketIndex?: HTMLElement;

	constructor(
		protected container: HTMLElement,
		protected events: IEvents,
		actions?: IItemActions
	) {
		super(container);

		this._description = container.querySelector('.card__text');
		this._image = container.querySelector('.card__image');
		this._title = container.querySelector('.card__title');
		this._category = container.querySelector('.card__category');
		this._price = container.querySelector('.card__price');
		this._button = container.querySelector('.card__button');
		this._basketIndex = container.querySelector('.basket__item-index');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this._title.textContent);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set category(value: string) {
		this.setText(this._category, value);
		switch (value) {
			case 'софт-скил':
				this._category.classList.add('card__category_soft');
				break;
			case 'другое':
				this._category.classList.add('card__category_other');
				break;
			case 'дополнительное':
				this._category.classList.add('card__category_additional');
				break;
			case 'кнопка':
				this._category.classList.add('card__category_button');
				break;
			case 'хард-скил':
				this._category.classList.add('card__category_hard');
				break;
			default:
				console.error('Категория не найдена');
		}
	}

	set price(value: number | null) {
		if (value) {
			this.setText(this._price, `${value} синапсов`);
		} else {
			this.setText(this._price, 'Бесценно');
		}
	}

	// Переделал метод. До этого товар с ценой "Бесценно" можно
	// было добавить в корзину с ценой ноль. При отправке на сервер возникала ошибка
	setButton(inBasket: boolean, price: number | null) {
		if (inBasket) {
			this.setText(this._button, 'Убрать');
			this.setDisabled(this._button, false);
		} else {
			if (price === null) {
				this.setDisabled(this._button, true);
			} else {
				this.setText(this._button, 'В корзину');
				this.setDisabled(this._button, false);
			}
		}
	}

	set basketIndex(value: number) {
		this.setText(this._basketIndex, value);
	}
}
