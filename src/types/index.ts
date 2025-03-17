export interface IItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	basketIndex?: number;
}

export interface IOrderForm {
	payment: string;
	email: string;
	phone: string;
	address: string;
}

export interface IOrderResult {
	total: number;
	id: string;
}

export interface IAppModel {
	itemList: IItem[];
	preview: string | null;
}

export type IFormPayment = Pick<IOrderForm, 'payment' | 'address'>

export type IFormContacts = Pick<IOrderForm, 'email' | 'phone'>

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;
