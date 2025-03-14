import { IItem, IOrder, IOrderResult } from '../../types';
import { Api, ApiListResponse } from '../base/api';

export interface IApiModel {
	getItemList(): Promise<void | IItem[]>;
	orderItems(order: IOrder): Promise<IOrderResult>;
}

export class ApiModel extends Api implements IApiModel {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getItemList(): Promise<IItem[]> {
		return this.get('/product').then((data: ApiListResponse<IItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	orderItems(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
