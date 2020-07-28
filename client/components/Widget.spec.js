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
                href: url,
                pathname: '/54/'
            }
        })

        listing = JSON.parse(window.location.pathname.slice(1, -1));
        state = { listingId: listing, currentPrice: 74, checkIn: '', checkOut: '', standardPrice: 48, avgRate: 2.8}
    })

    it('should load with average rating', () => {

        const wrapper = shallow(<Widget listingData={state} />)


        expect(wrapper.text()).toContain('2.8') 
    })

    it('should display standard price for a night', () => {
        const wrapper = shallow(<Widget listingData={state}/>);

        expect(wrapper.text()).toContain('$74 / night') 
    })

    it('should call openCalendar when CalPick is clicked', () => {
        const mockCallBack = jest.fn();
        let state = state = { listingId: listing, currentPrice: 74, checkIn: '', checkOut: '', standardPrice: 48};
        // const spy = jest.spyOn(Widget.prototype, 'openCalendar');
        const wrapper = shallow(<Widget openCalendar={mockCallBack} listingData={state}/>);
        wrapper.find('#calPick').simulate('click');

        expect(mockCallBack).toHaveBeenCalled();
    })
})