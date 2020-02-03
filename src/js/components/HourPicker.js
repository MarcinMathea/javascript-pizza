import { utils } from '../utils.js';
import { select, settings } from '../settings.js';
import { rangeSlider } from '../../vendor/range-slider.min.js';
import BaseWidget from './BaseWidget.js';

class HourPicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, settings.hours.open);
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.input);
    thisWidget.dom.output = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.output);
    thisWidget.initPlugin();
  }
  initPlugin() {
    const thisWidget = this;

    const rangeSliderValue = rangeSlider.create(thisWidget.dom.input);

    thisWidget.dom.input.addEventListener('input',() =>
      thisWidget.value = rangeSliderValue
    );
  }
  parseValue(value) {
    const hours = utils.numberToHour(value);
    return hours;
  }
  isValid() {
    return true;
  }
  renderValue() {
    const thisWidget = this;

    thisWidget.dom.output = thisWidget;
  }
}

export default HourPicker;