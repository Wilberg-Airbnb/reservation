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

  it(`should display the number of adults, children & infants`, async (done) => {
    const wrapper = shallow(<GuestPicker listingData={listingData}/>);
    expect(wrapper.text()).toContain(3);
    expect(wrapper.text()).toContain(2);
    expect(wrapper.text()).toContain(1);
    done()
  })

  it(`should display the number of adults, children & infants`, async (done) => {
    const wrapper = shallow(<GuestPicker listingData={listingData}/>);
    expect(wrapper.text()).toContain(3);
    expect(wrapper.text()).toContain(2);
    expect(wrapper.text()).toContain(1);
    done()
  })

  it('should call handleGuests when clicking add-adult', async (done) => {
    const mockHandleGuests = jest.fn();
    const wrapper = shallow(<GuestPicker handleGuests={mockHandleGuests} listingData={listingData}/>);
    wrapper.find('#add-adult').simulate('click');
    expect(mockHandleGuests).toHaveBeenCalled();
    done()
  })

  it('should call handleGuests when clicking sub-adult', async (done) => {
    const mockHandleGuests = jest.fn();
    const wrapper = shallow(<GuestPicker handleGuests={mockHandleGuests} listingData={listingData}/>);
    wrapper.find('#sub-adult').simulate('click');
    expect(mockHandleGuests).toHaveBeenCalled();
    done()
  })

  it('should call handleGuests when clicking add-child', async (done) => {
    const mockHandleGuests = jest.fn();
    const wrapper = shallow(<GuestPicker handleGuests={mockHandleGuests} listingData={listingData}/>);
    wrapper.find('#add-child').simulate('click');
    expect(mockHandleGuests).toHaveBeenCalled();
    done()
  })

  it('should call handleGuests when clicking sub-child', async (done) => {
    const mockHandleGuests = jest.fn();
    const wrapper = shallow(<GuestPicker handleGuests={mockHandleGuests} listingData={listingData}/>);
    wrapper.find('#sub-child').simulate('click');
    expect(mockHandleGuests).toHaveBeenCalled();
    done()
  })

});