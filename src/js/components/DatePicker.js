import { utils } from '../utils.js';
import { select, settings } from '../settings.js';
import BaseWidget from './BaseWidget.js';
import flatpickr from 'flatpickr';

class DatePicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, utils.dateToStr(new Date()));
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);
    thisWidget.initPlugin();
  }
  initPlugin() {
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = utils.addDays(utils.dateToStr(thisWidget.minDate), settings.datePicker.maxDaysInFuture);
    flatpickr(thisWidget.dom.input, { 
      dateFormat: 'd.m.Y',
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      disable: [
        function (date) {
          return (date.getDay() === 1);
        }
      ],
      onChange: function (selectedDates, dateStr) {
        thisWidget.value = dateStr;
      },
      locale: {
        firstDayOfWeek: 1
      },
    });
  }
  parseValue(value) {
    return value;
  }
  isValid() {
    return true;
  }
  renderValue() {
    return true;
  }
}

export default DatePicker;