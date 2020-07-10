import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount, shallow, configure } from "enzyme";
import App from "../App.jsx";
import Calendar from "./Calendar.jsx";

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe('<Calendar/>', () => {

    var listing
    var state

    beforeEach(() => {
        // global.window = Object.create(window);
        // const url = "http://localhost:8888/54";
        // Object.defineProperty(window, 'location', {
        //     value: {
        //         href: url
        //     }
        // })

        // listing = JSON.parse(window.location.href.split('/')[3]);
        // state = { listingId: listing }
    })

    it('should load with the proper listingId', () => {

        const wrapper = mount(<Calendar/>)

        
        expect(wrapper.exists()).toBeTruthy();
    })
})