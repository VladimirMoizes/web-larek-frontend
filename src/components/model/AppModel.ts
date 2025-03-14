import { IAppModel, IItem } from '../../types';
import { Model } from '../base/Model';
import { BasketModel } from './BasketModel';
import { ItemModel } from './ItemModel';

export class AppModel extends Model<IAppModel> {
	itemList: IItem[];
	preview: string | null;

	setCatalog(items: IItem[]) {
		this.itemList = items.map((item) => new ItemModel(item, this.events));
		this.emitChanges('items:loaded', { catalog: this.itemList });
	}

	setPreview(item: IItem) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	findItemById(id: string): IItem | undefined {
		return this.itemList.find((item) => item.id === id);
	}
}
