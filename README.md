# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Документация
Данная работа будет выполнена в парадигме MVP, где:\
M - слой данных\
V - слой отображение\
P - презентер, который связывает данные с отображением.\
В работе будет использоваться событийно-ориентированный подход. При действии пользователя генерируется событие, 
презентер это событие обрабатывает и вызывает метод из модели. Модель меняет данные и снова генерирует событие,
презентер обрабатывает событие и вызывает метод отображения.

### Основные типы данных
Данные товара:
```
export interface IItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	basketIndex?: number;
}
``` 

Данные формы заказа:
```
export interface IOrderForm {
	payment: string;
	email: string;
	phone: string;
	address: string;
}
```
Данные заказа:
```
export interface IOrder extends IOrderForm {
    items: string[]
	total: number
}
```

Данные отравленные на сервер:
```
export interface IOrderResult {
	total: number;
	id: string;
}
```

Данные приложения:
```
export interface IAppModel {
	itemList: IItem[];
	preview: string | null;
}
```

Данные для формы оплаты:
```
export type IFormPayment = Pick<IOrderForm, 'payment' | 'address'>
```

Данные для формы с контактами:
```
export type IFormContacts = Pick<IOrderForm, 'email' | 'phone'>
```


### Базовый код
В базовом коде находятся классы, от которых будут наследоваться другие, чтобы не дублировать логику.

#### Класс Component
Абстрактный класс с базовым компонентом, от которого наследуются другие компоненты.\
Конструктор:
- `constructor(container: HTMLElement)` - в конструкторе принимает контейнер, который является DOM-элементом.

Методы:
- `toggleClass(element: HTMLElement, className: string, force?: boolean)` - переключение класса
- `setText(element: HTMLElement, value: unknown)` - установка текстового содержимого
- `setDisabled(element: HTMLElement, state: boolean)` - смена статуса блокирвоки
- `setHidden(element: HTMLElement)` - скрыть элемент
- `setVisible(element: HTMLElement)` - показать элемент
- `setImage(element: HTMLImageElement, src: string, alt?: string)` - установка изображения с альтернативным текстом
- `render(data?: Partial<T>): HTMLElement` - метод для установки переданных значений в DOM-элемент.

#### Класс Model
Абстрактный класс модели, который является родителем для классов с моделями данных. В нём содержатся общие для всех моделей методы.\
Конструктор:
- `constructor(data: Partial<T>, events: IEvents)` - принимает данные, которые записываются в созданный экземпляр, и события.

Методы:
- `emitChanges(event: string, payload?: object)` - метод ,который сообщает, что модель поменялась.

#### Класс Api
Класс для получения и отправления данных.\
Конструктор:
- `constructor(baseUrl: string, options: RequestInit = {})` - в конструкторе принимает базовый URL и набор опций (content-type и т.д.)

Поля:
- `baseUrl: string` - базовый URL. Только для чтения
- `options: RequestInit` - набор опций.

Методы:
- `handleResponse(response: Response): Promise<object>` - принимает ответ от сервера и возвращает промисс в виде объекта
- `get(uri: string)` - метод получения данных с сервера
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - метод отправки данных на сервер.

#### Класс EventEmitter
Класс для установки, снятия и инициации события.\
Поля:
- `_events: Map<EventName, Set<Subscriber>>` - события в виде объекта с именем собятия и подпиской на событие

Методы:
- `on(eventName: EventName, callback: (event: T) => void)` - установка обработчика на событие. Принимает название и коллбэк-функцию
- `off(eventName: EventName, callback: Subscriber)` - снятия обработчика с собатия. Принимает название события и коллбэк-функцию.
- `emit(eventName: string, data?: T)` - инициация события. 
- `onAll(callback: (event: EmitterEvent) => void)` - слушать все события
- `offAll()` - сброс всех обработчиков
- `trigger(eventName: string, context?: Partial<T>)` - коллбэк триггер, генерирующий событие при вызове.

### Модель данных

#### Класс ItemModel
Класс для работы с данными карточки.\
Поля:
- `id: string` - id товара
- `description: string` - описание
- `image: string` - ссылка на изображение
- `title: string` - название
- `category: string` - категория
- `price: number | null` - цена

#### Класс BasketModel
Класс для работы с данными корзины.\
Конструктор:
- `constructor(data: Partial<IBasketModel>, events: IEvents)`

Поля:
- `itemsId: string[]` - id карточек, оторые хранятся в корзине.

Методы:
- `getItemsInBasket()` - получение карточек из корзины
- `addToBasket(item: Item)` - добавление карточки в корзину
- `removeFromBasket(item: Item)` - удаление карточки из корзины
- `isInBasket(item: IItem): boolean` - в корзине/не в корзине
- `clearBasket()` - очистка корзины

#### Класс OrderModel
Класс для работы с данными заказа.\
Поля:
- `order: IOrder` - данные заказа
- `formErrors: FormErrors` - ошибки формы

Методы:
- `clearOrder()` - очистка данных заказа
- `setPaymentField(field: keyof IModalPayment, value: string)` - установка значений в поля формы оплаты
- `setContactsField(field: keyof IModalPhone, value: string)` - установка значений в поля формы контактов
- `validatePaymentForm()` - метод валидации формы оплаты
- `validatePhoneForm()` - Метод валидации формы контактов
- `clearOrder()` - очистка заказа

#### Класс AppModel 
Класс для хранения данных карточек, предварительного просмотра карточек, ошибок валидации форм и получения итоговой стоимости.\
Поля:
- `itemList: IItem[]` - все карточки на странице
- `preview: string | null` - предварительный просмотр (по id)

Методы:
- `findItemById(id: string): IItem | undefined` - поиск элемента по id
- `setPreview(item: IItem)` - выбор карточки для просмотра
- `setCatalog(items: IItem[])` - вывод карточек на экран

#### Класс ApiModel
Класс для работы с данными сервера.\
Конструктор:
- `constructor(cdn: string, baseUrl: string, options?: RequestInit)`

Поля:
- `cdn: string` 

Методы:
- `getItemList: () => Promise<IItem[]>` - получение данных с сервера. Возвращает массив объектов.
- `orderItems: (order: IOrder) => Promise<IOrderResult>` - отправка заказа на сервер.

### Слой отображения

#### Класс Page
Данный класс отображает главную страницу - список карточек, счётчик корзины и обёртку при открытом модальном окне.\

Конструктор:
- `constructor(protected container: HTMLElement, protected events: IEvents)`

Поля:
- `counter: HTMLElement` - счётчик товаров в корзине
- `itemList: HTMLElenemt[]` - список товаров 
- `wrapper` - обёртка при открытой модалке
- `buttonBasket` - кнопка корзины

Методы:
- `set itemList(items: HTMLElement[])` - вывод карточек на страницу 
- `set counter(value: number)` - установка значения счётчика корзины
- `set locked(value: boolean)` - блокировка страницы при открытом модальном окне

#### Класс ItemView
Класс для отображение карточки. Она может отображаться в трёх вариантах - на странице, в окне предварительного просмотра и в корзине. Некоторые поля делаем необязательными.\
Поля:
- `description?: HTMLElement` - описание товара
- `image?: HTMLElement` - изображение
- `title: HTMLElement` - название
- `category?: HTMLElement` - категория
- `price: HTMLElement` - цена
- `basketIndex?: HTMLElement` - индекс карточки в корзине\

Методы - сеттеры для установки значений в эти поля.

#### Класс BasketView
Класс для отображения корзины.\
Конструктор:
- `constructor(container: HTMLElement, protected events: EventEmitter)`

Поля:
- `itemList: HTMLElement[]` - список товаров в корзине
- `total: HTMLElement` - общая стоимость
- `basketButton: HTMLButtonElement` - кнопка оформления

Методами являются сеттеры для списка товаров и общей стоимости.

#### Класс ModalView 
Общий класс модального окна, в который будет выводиться контент.\
Конструктор:
- `constructor(container: HTMLElement, protected events: IEvents)`

Поля:
- `closeButton: HTMLButtonElement` -  кнопка закрытия модального окна
- `content: HTMLElement` - контент

Методы:
- `close()` - закрытие
- `open()` - открытие
- `set content(value: HTMLElement)` - установка контента
- `render(data: IModalData): HTMLElement` - заполнения данными модального окна

#### Класс Form
Общий класс, от которого наследуются формы заказа и контактов.\

Конструктор:
- `constructor(container: HTMLFormElement, events: IEvents)`

Поля:
- `submitButton: HTMLButtonElement` - кнопка оформления заказа
- `formError: HTMLElement` - блок отображения ошибок валидации

Методы:
- `onInputChange(field: HTMLInputElement, value: string)` - метод для отслеживания изменений в полях ввода
- `set errors(value: boolean)` - метод для показа/скрытия ошибок валидации
- `set valid(value: string)` - проверка валидности
- `render(state: IFormState): HTMLFormElement` - рендер формы

#### Класс FormPayment
Класс, который наследуется от класса Form. Отвечает за оплату заказа.\
Конструктор:
- `constructor(container: HTMLFormElement, events: IEvents)`

Поля:
- `buttonsAlt: HTMLButtonElement[]` - кнопки выбора способа оплаты

Методы:
- `toggleButtonState(activeButton: HTMLButtonElement)` - выбор кнопки оплаты
- `set address()` - ввод адреса в поле
- `setActiveButtons()` - метод для активации всех кнопок

#### Класс FormContacts
Класс наследуется от класса Form. Отвечает за ввод номера телефона и почты.\
Конструктор:
- `constructor(container: HTMLFormElement, events: IEvents)`

Методы:
- `set phone()` - ввод телефона в поле
- `set email()` - ввод почты в поле

#### Класс Succes
Класс для отображение окна с успехом.\
Конструктор:
- `constructor(container: HTMLElement, actions?: ISuccessActions)`

Поля:
- `total: HTMLElement` - общая стоимость покупок
- `close: HTMLButtonElement` - кнопка для продолжания покупок

Методы:
- `set total(value: number | null): void` - установка общей стоимости

#### Действия
- `items:loaded` - загрузка карточек на страницу
- `item:selected` - выбрана карточка для просмотра
- `preview:changed` - отображение карточки в модальном окне
- `modal:open` - открытие модального окна
- `modal:close` - закрытие модального окна
- `basket:open` - открытие корзины
- `basket:change` - изменение корзины
- `formPayment:open` - открытие формы оплаты
- `basket:cleared` - очистка корзины
- `order.payment:change` - изменение полей формы оплаты
- `form:submit` - отправка формы
- `succes:submit` - нажатие на кнопки с успехом
- `formErrorsPayment:change` - ошибки валидации формы оплаты
- `formErrorsContacts:change` - ошибки валидации формы контактов
