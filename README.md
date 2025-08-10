# 🎓 Проектная работа "Веб-ларек" - учебный проект

<div align="center">
    <img src="./src/images/Subtract.png" width="150" alt="Лого" title="Логотип" style="border-radius: 8px">
</div>

**Концепция:** Интернет-магазин виртуальных товаров для разработчиков  

#### 🌟 **Ключевые возможности:**
- 🛍️ Добавление товаров в корзину  
- ❌ Удаление товаров из корзины  
- 💳 Полноценное оформление заказа
  
Проект выполнен с помощью ООП-подхода с использованием языка TypeScript.


### 🤖 Технологии:
<div align="center" style="display: flex; gap: 10px; justify-content: center; margin: 12px 0;">
  <a href="https://developer.mozilla.org/ru/docs/Web/HTML" target="_blank">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" width="40" height="40" alt="HTML5" style="border-radius:8px">
  </a>
  <a href="https://developer.mozilla.org/ru/docs/Web/CSS" target="_blank">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" width="40" height="40" alt="CSS3" style="border-radius:8px">
  </a>
  <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript" target="_blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/640px-Unofficial_JavaScript_logo_2.svg.png" width="40" height="40" alt="CSS3" style="border-radius:8px">
  </a>
    <a href="https://www.postman.com/api-documentation-tool/" target="_blank">
    <img src="https://camo.githubusercontent.com/66653fb9b350122ece0a9db72f67c75ec0316efe11126b7c7e46296ce64e2561/68747470733a2f2f7777772e7376677265706f2e636f6d2f73686f772f3335343230322f706f73746d616e2d69636f6e2e737667" width="40" height="40" alt="Postman" style="border-radius:8px">
  </a>
	<a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://camo.githubusercontent.com/477414c66dd07c1314d6dafffc981cf1f0c067b071f1a5e6835686d76d9a36c7/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f747970657363726970742d322e737667" width="40" height="40" alt="TypeScript" style="border-radius:8px">
  </a>
	<a href="https://webpack.js.org/" target="_blank">
    <img src="https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-big.png" width="40" height="40" alt="webpack" style="border-radius:8px">
  </a>
</div>

## 🛠 Реализованный функционал

### 🏗 Архитектура
- Проектирование модульной структуры приложения
- Оптимизация компонентов для масштабируемости

### 🧠 Бизнес-логика
- **Работа с корзиной:**
  - ✅ Добавление товаров
  - ❌ Удаление товаров
  - 🔄 Обновление состояния в реальном времени

- **Валидация:**
  - Проверка форм перед отправкой
  - Визуальный feedback при ошибках

### 🌐 Работа с API
- `GET /products` - получение карточек товаров
- `POST /orders` - отправка данных заказа
- Обработка ошибок сети

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

**Требования:**
- Node.js v18+ ([скачать](https://nodejs.org/))
- npm v9+
- Git (рекомендуется)

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

#### Класс BasketModel

Класс для работы с данными корзины.\
Конструктор:

- `constructor(data: Partial<IBasketModel>, events: IEvents)`

Поля:

- `itemsId: string[]` - id карточек, оторые хранятся в корзине.

Методы:

- `getItemsInBasket()` - получение карточек из корзины
- `basketChange()` - вызов события изменения корзины
- `addToBasket(item: Item)` - добавление карточки в корзину
- `removeFromBasket(item: Item)` - удаление карточки из корзины
- `isInBasket(item: IItem): boolean` - в корзине/не в корзине
- `clearBasket()` - очистка корзины

#### Класс OrderModel

Класс для работы с данными заказа.\
Поля:

- `order: IOrderForm` - данные заказа
- `formErrors: FormErrors` - ошибки формы

Методы:

- `clearOrder()` - очистка данных заказа
- `setPaymentField(field: keyof IModalPayment, value: string)` - установка значений в поля формы оплаты
- `setContactsField(field: keyof IModalPhone, value: string)` - установка значений в поля формы контактов
- `validatePaymentForm()` - метод валидации формы оплаты
- `validatePhoneForm()` - Метод валидации формы контактов
- `clearOrder()` - очистка заказа
- `createOrderToPost(items: string[], total: number)` - метод для создания объекта заказа для отправки на сервер

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
- `orderItems: (order: IOrderForm) => Promise<IOrderResult>` - отправка заказа на сервер.

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
- `basketIndex?: HTMLElement` - индекс карточки в корзине

Методы - сеттеры для установки значений в эти поля.
- `setButton(inBasket: boolean, price: number | null)` - установка значения кнопки в зависимости от цены

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

- `closeButton: HTMLButtonElement` - кнопка закрытия модального окна
- `content: HTMLElement` - контент

Методы:

- `close()` - закрытие
- `open()` - открытие
- `set content(value: HTMLElement)` - установка контента
- `render(data: IModalData): HTMLElement` - заполнения данными модального окна

#### Класс Form

Общий класс, от которого наследуются формы заказа и контактов.

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
