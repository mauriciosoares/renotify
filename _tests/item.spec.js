import React from 'react';
import {Item} from '../src/components/item';
import {shallow, mount} from 'enzyme';

const fakeNotification = {
  dismiss: false,
  dismissTimeout: 5000,
  actions: [{
    label: 'Label'
  }],
  type: 'warning',
  Template: null,
  title: 'Title',
  message: 'Message',
  id: 'custom-id',
  closeNotification: () => {}
};

function fakeTheme(className) {
  return {
    className,
    key: className
  };
}

describe('Items', () => {
  it('should render the element with correct classNames', () => {
    const wrapper = shallow(<Item {...fakeNotification} theme={fakeTheme} />);

    expect(wrapper.find('.warning').length).toEqual(1);
    expect(wrapper.find('.custom-id-texts').length).toEqual(1);
    expect(wrapper.find('.custom-id-title').length).toEqual(1);
    expect(wrapper.find('.custom-id-message').length).toEqual(1);
    expect(wrapper.find('.custom-id-actions').length).toEqual(1);
  });

  it('should render the element with correct texts', () => {
    const wrapper = shallow(<Item {...fakeNotification} theme={fakeTheme} />);

    expect(wrapper.find('.custom-id-title').text()).toEqual(fakeNotification.title);
    expect(wrapper.find('.custom-id-message').html()).toEqual(
      `<div class="custom-id-message">${fakeNotification.message}</div>`
    );
  });

  it('should call the onAdd callback once the component is mounted', () => {
    const toSpy = {
      onAdd: () => {}
    };

    spyOn(toSpy, 'onAdd'); // eslint-disable-line no-undef

    mount(<Item {...fakeNotification} theme={fakeTheme} onAdd={toSpy.onAdd} />);

    expect(toSpy.onAdd).toHaveBeenCalled();
  });

  it('should call the onRemove callback once the component is about to unmount', () => {
    const toSpy = {
      onRemove: () => {}
    };

    spyOn(toSpy, 'onRemove'); // eslint-disable-line no-undef

    mount(<Item {...fakeNotification} theme={fakeTheme} onRemove={toSpy.onRemove} />).unmount();

    expect(toSpy.onRemove).toHaveBeenCalled();
  });

  it('should execute closeNotification when button is clicked and no callback is configured', () => {
    const toSpy = {
      closeNotification: () => {}
    };

    spyOn(toSpy, 'closeNotification'); // eslint-disable-line no-undef

    const wrapper = mount(<Item {...fakeNotification} theme={fakeTheme} closeNotification={toSpy.closeNotification} />);

    wrapper.find('button').simulate('click');

    expect(toSpy.closeNotification).toHaveBeenCalled();
  });

  it(`should execute the custom callback when the button is clicked,
    and pass the closeNotification method as a parameter`, () => {
    const closeNotification = () => {};
    const toSpy = {
      callback: (close) => {

      }
    };

    spyOn(toSpy, 'callback'); // eslint-disable-line no-undef

    const wrapper = mount(<Item
      {...fakeNotification}
      theme={fakeTheme}
      closeNotification={closeNotification}
      actions={[{
        label: 'Some Action',
        callback: toSpy.callback
      }]} />);

    wrapper.find('button').simulate('click');

    expect(toSpy.callback).toHaveBeenCalled();
  });

  it('should render the custom component template', () => {
    const wrapper = shallow(<Item
      {...fakeNotification}
      theme={fakeTheme}
      Template={({title, message, actions}) => (
        <div className="template-classname">
          {title} {message} {actions}
        </div>
      )} />);

    expect(wrapper.html()).toEqual(
      '<div class="custom-id warning"><div class="template-classname">Title Message <button>Label</button></div></div>'
    );
  });

  it('should automatically close the notification if dismiss is true', () => {
    jasmine.clock().install();  // eslint-disable-line no-undef
    const toSpy = {
      closeNotification: () => {}
    };

    spyOn(toSpy, 'closeNotification'); // eslint-disable-line no-undef

    mount(<Item
      {...fakeNotification}
      theme={fakeTheme}
      closeNotification={toSpy.closeNotification}
      dismissTimeout={5000}
      dismiss />);

    jasmine.clock().tick(5001); // eslint-disable-line no-undef

    expect(toSpy.closeNotification).toHaveBeenCalled();
  });
});
