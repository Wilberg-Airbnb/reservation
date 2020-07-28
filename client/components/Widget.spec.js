import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount, shallow, configure } from "enzyme";
import App from "../App.jsx";
import Widget from "./Widget.jsx";
import { iteratee } from "lodash";

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe('<Widget/>', () => {

    var listing
    var state

    beforeEach(() => {
        global.window = Object.create(window);
        const url = "http://localhost:8888/54";
        Object.defineProperty(window, 'location', {
            value: {
                href: url
            }
        })

        listing = JSON.parse(window.location.href.split('/')[3]);
        state = { listingId: listing }
    })

    it('should load with the proper listingId', () => {

        const wrapper = mount(<Widget listingData={state} />)


        expect(wrapper.state().listingId).toEqual(54);
    })

    it('should display standard price for a night', () => {
        state.standardPrice = 48;
        const wrapper = shallow(<Widget listingData={state}/>);

        expect(wrapper.text()).toContain('$48 / night') 
    })

    it('should call openCalendar when CalPick is clicked', () => {
        const mockCallBack = jest.fn();
        // const spy = jest.spyOn(Widget.prototype, 'openCalendar');
        const wrapper = shallow(<Widget openCalendar={mockCallBack} listingData={{currentPrice: 54, checkIn: '', checkOut: ''}}/>);
        wrapper.find('#calPick').simulate('click');

        expect(mockCallBack).toHaveBeenCalled();
    })
})