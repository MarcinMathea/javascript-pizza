import { utils } from '../utils.js';
import { select, settings } from '../settings.js';
import BaseWidget from './BaseWidget.js';

class HoursPicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, settings.hours.open);
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.input);
    thisWidget.dom.output = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.output);
    thisWidget.initPlugin();
    thisWidget.value = thisWidget.dom.input.value;
  }
  initPlugin() {
    const thisWidget = this;

    rangeSlider.create(thisWidget.dom.input); // eslint-disable-line 
    thisWidget.dom.input.addEventListener('input', () => {
      thisWidget.value = thisWidget.dom.input.value;
    });
  }
  parseValue(value) {
    return utils.numberToHour(value);
  }
  isValid() {
    return true;
  }
  renderValue() {
    const thisWidget = this;
    thisWidget.dom.output.innerHTML = thisWidget.value;
  }
}

export default HoursPicker;