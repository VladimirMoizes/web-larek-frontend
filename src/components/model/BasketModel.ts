import { IItem } from '../../types';
import { IEvents } from '../base/events';
import { Model } from '../base/Model';

export interface IBasketModel {
	getItemsInBasket(): string[];
	addToBasket(item: IItem): void;
	removeFromBasket(item: IItem): void;
	clearBasket(): void;
	isInBasket(item: IItem): boolean;
}

export class BasketModel extends Model<IBasketModel> implements IBasketModel {
	private itemsId: string[] = [];

	constructor(data: Partial<IBasketModel>, events: IEvents) {
		super(data, events);
	}

	getItemsInBasket(): string[] {
		return this.itemsId;
	}

	basketChange() {
		this.events.emit('basket:change');
	}

	addToBasket(item: IItem) {
		if (!this.itemsId.includes(item.id)) {
			this.itemsId.push(item.id);
			this.emitChanges('basket:updated', this.itemsId);
		}
	}

	removeFromBasket(item: IItem) {
		this.itemsId = this.itemsId.filter((id) => id !== item.id);
		this.emitChanges('basket:updated', this.itemsId);
	}

	clearBasket() {
		this.itemsId = [];
		this.emitChanges('basket:cleared');
	}

	isInBasket(item: IItem): boolean {
		return this.itemsId.includes(item.id);
	}
}
