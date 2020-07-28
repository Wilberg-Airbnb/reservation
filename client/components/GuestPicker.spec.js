import GuestPicker from './GuestPicker.jsx';
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount, shallow, configure } from "enzyme";

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe('characterFrequency', () => {

  let listingData

  beforeEach(() => {
    listingData = {adults: 3, children: 2, infants: 1}
  })

  it(`should render with default props`, async (done) => {
    const wrapper = shallow(<GuestPicker listingData={listingData}/>);
    expect(wrapper).toMatchSnapshot();
    done()
  });

});