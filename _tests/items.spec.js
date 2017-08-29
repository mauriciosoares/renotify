import React from 'react';
import Items from '../src/components/items';
import {shallow} from 'enzyme';

function fakeTheme() {
  return {
    className: 'fake-class-name'
  };
}

describe('Items', () => {
  it('should render an empty list', () => {
    const wrapper = shallow(<Items notifications={[]} theme={fakeTheme} />);

    expect(wrapper.find('span div').length).toEqual(0);
  });

  it('should render some items in the list'); // TODO(mauriciosoares): Implement this test :/
});
