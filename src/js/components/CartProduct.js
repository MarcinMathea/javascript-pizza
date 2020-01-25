/* eslint-disable linebreak-style */
import AmountWidget from './AmountWidget.js';
import { select } from '../settings.js';

class CartProduct {
  constructor(menuProduct, element) {
    const thisCartProduct = this;

    thisCartProduct.id = menuProduct.id;
    thisCartProduct.name = menuProduct.name;
    thisCartProduct.price = menuProduct.price;
    thisCartProduct.priceSingle = menuProduct.priceSingle;
    thisCartProduct.amount = menuProduct.amount;
    thisCartProduct.params = JSON.parse(JSON.stringify(menuProduct.params));

    thisCartProduct.getElements(element);
    thisCartProduct.initAmountWidget();
    thisCartProduct.initActions();
  }
  getElements(element) {
    const thisCartProduct = this;

    thisCartProduct.dom = {};

    thisCartProduct.dom.wrapper = element;
    thisCartProduct.dom.amountWidget = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.amountWidget);
    thisCartProduct.dom.price = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.price);
    thisCartProduct.dom.remove = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.remove);
    thisCartProduct.dom.edit = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.edit);
  }
  initAmountWidget() {
    const thisCartProduct = this;

    thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget);
    thisCartProduct.dom.amountWidget.addEventListener('updated', () => {
      thisCartProduct.amount = thisCartProduct.amountWidget.value;
      thisCartProduct.price = thisCartProduct.priceSingle * thisCartProduct.amount;

      thisCartProduct.dom.price.innerHTML = thisCartProduct.price;
    });
  }
  remove() {
    const thisCartProduct = this;

    const event = new CustomEvent('remove', {
      bubbles: true,
      detail: {
        cartProduct: thisCartProduct,
      },
    });

    thisCartProduct.dom.wrapper.dispatchEvent(event);
  }
  initActions() {
    const thisCartProduct = this;

    //thisCartProduct.dom.edit.addEventListener('click', () => {
    //event.preventDefault();
    //});
    thisCartProduct.dom.remove.addEventListener('click', () => {
      event.preventDefault();
      thisCartProduct.remove();
    });
  }
  getData() {
    const thisCartProduct = this;
    thisCartProduct.data = {};
    thisCartProduct.data.id = thisCartProduct.id;
    thisCartProduct.data.amount = thisCartProduct.amount;
    thisCartProduct.data.price = thisCartProduct.price;
    thisCartProduct.data.priceSingle = thisCartProduct.singlePrice;
    thisCartProduct.data.params = thisCartProduct.params;
    thisCartProduct.data.address = thisCartProduct.address;

    return thisCartProduct.data;
  }
}

export default CartProduct;