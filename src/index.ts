import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ApiModel } from './components/model/ApiModel';
import { AppModel } from './components/model/AppModel';
import { Page } from './components/view/Page';
import { ItemView } from './components/view/ItemView';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IItem, IOrderForm } from './types';
import { ModalView } from './components/view/ModalView';
import { BasketModel } from './components/model/BasketModel';
import { BasketView } from './components/view/BasketView';
import { FormPayment } from './components/view/FormPayment';
import { FormContacts } from './components/view/FormContacts';
import { Success } from './components/view/Success';
import { OrderModel } from './components/model/OrderModel';

const events = new EventEmitter();
const api = new ApiModel(CDN_URL, API_URL);
const appData = new AppModel({}, events);
const appBasket = new BasketModel({}, events);
const page = new Page(document.body, events);
const modal = new ModalView(
	ensureElement<HTMLElement>('#modal-container'),
	events
);
const order = new OrderModel({}, events);

// Шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Инстансы с шаблонами
const basket = new BasketView(cloneTemplate(basketTemplate), events);
const orderPayment = new FormPayment(cloneTemplate(orderTemplate), events);
const orderContacts = new FormContacts(cloneTemplate(contactsTemplate), events);

// Получаем карточки с сервера
api
	.getItemList()
	.then((data) => {
		console.log(data);
		return data;
	})
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});

events.on('items:loaded', () => {
	page.itemList = appData.itemList.map((item) => {
		const card = new ItemView(cloneTemplate(cardCatalogTemplate), events, {
			onClick: () => {
				events.emit('item:selected', item);
			},
		});
		return card.render({
			image: item.image,
			title: item.title,
			category: item.category,
			price: item.price,
		});
	});
});

events.on('item:selected', (item: IItem) => {
	appData.setPreview(item);
});

// Просмотр карточки в модальном окне
events.on('preview:changed', (item: IItem) => {
	const card = new ItemView(cloneTemplate(cardPreviewTemplate), events, {
		onClick: () => {
			if (appBasket.isInBasket(item)) {
				appBasket.removeFromBasket(item);
			} else {
				appBasket.addToBasket(item);
			}
			appBasket.basketChange();
			card.setButton(appBasket.isInBasket(item), item.price);
		},
	});

	card.setButton(appBasket.isInBasket(item), item.price);
	return modal.render({
		content: card.render({
			title: item.title,
			description: item.description,
			image: item.image,
			category: item.category,
			price: item.price,
		}),
	});
});

// Открытие корзины
events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

// Динамическое изменение корзины
events.on('basket:change', () => {
	const cards = appBasket.getItemsInBasket().map((itemId, index) => {
		const item = appData.findItemById(itemId);
		if (!item) return null;

		const cardInBasket = new ItemView(
			cloneTemplate(cardBasketTemplate),
			events,
			{
				onClick: () => {
					appBasket.removeFromBasket(item);
					appBasket.basketChange();
				},
			}
		);
		return cardInBasket.render({
			title: item.title,
			price: item.price,
			basketIndex: index + 1,
		});
	});

	basket.itemList = cards;
	page.counter = String(appBasket.getItemsInBasket().length);
	basket.total = appBasket
		.getItemsInBasket()
		.map((id) => {
			return appData.findItemById(id)?.price || 0;
		})
		.reduce((accum, item) => accum + item, 0);
	// console.log(`В корзине товары с id: ${appBasket.getItemsInBasket()}`);
});

// Открытие формы оплаты из корзины
events.on('formPayment:open', () => {
	orderPayment.setActiveButtons();
	order.clearOrder();
	modal.render({
		content: orderPayment.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

// Отправка формы оплаты
events.on('form:submit', () => {
	modal.render({
		content: orderContacts.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

// Отправка формы с контактами и отправка данных на сервер
events.on('formContacts:submit', () => {
	const itemsInBasket = appBasket.getItemsInBasket();
	const orderTotal = itemsInBasket
		.map((id) => appData.findItemById(id)?.price || 0)
		.reduce((accum, item) => accum + item, 0);

	// Создаем заказ с помощью метода createOrderToPost
	const orderToPost = order.createOrderToPost(itemsInBasket, orderTotal);

	api
		.orderItems(orderToPost)
		.then((result) => {
			order.clearOrder();
			orderPayment.setActiveButtons();
			appBasket.clearBasket();

			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
				},
			});

			modal.render({
				content: success.render({
					total: result.total,
				}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

// Проверка валидности полей
events.on('formErrorsPayment:change', (errors: Partial<IOrderForm>) => {
	const { payment, address } = errors;
	orderPayment.valid = !payment && !address;
	orderPayment.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

events.on('formErrorsContacts:change', (errors: Partial<IOrderForm>) => {
	const { email, phone } = errors;
	orderContacts.valid = !email && !phone;
	orderContacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		order.setPaymentField(data.field, data.value);
	}
);

events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		order.setContactsField(data.field, data.value);
	}
);

// Очистка корзины
events.on('basket:cleared', () => {
	appBasket.basketChange();
});

// Блокировка/разблокировка страницы
events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});
