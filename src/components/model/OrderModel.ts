import { FormErrors, IOrderForm } from '../../types';
import { Model } from '../base/Model';

export class OrderModel extends Model<IOrderForm> {
	order: IOrderForm = {
		payment: '',
		address: '',
		email: '',
		phone: '',
	};
	formErrors: FormErrors = {};

	setContactsField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;

		if (this.validateOrderContacts()) {
			// this.events.emit('order:ready', this.order);
			this.validateOrderContacts();
		}
	}

	setPaymentField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;

		if (this.validateOrderPayment()) {
			// this.events.emit('order:ready', this.order);
			this.validateOrderPayment();
		}
	}

	validateOrderContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('formErrorsContacts:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateOrderPayment() {
		const errors: typeof this.formErrors = {};
		if (!this.order.payment) {
			errors.payment = 'Выберите способ оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес доставки';
		}
		this.formErrors = errors;
		this.events.emit('formErrorsPayment:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	clearOrder() {
		this.order = {
			payment: '',
			email: '',
			phone: '',
			address: '',
		};
	}

	createOrderToPost(items: string[], total: number) {
		return {
			...this.order,
			items,
			total,
		};
	}
}
