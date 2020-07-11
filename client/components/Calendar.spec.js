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
      global.window = Object.create(window);
      const url = "http://localhost:8888/54/";
      Object.defineProperty(window, 'location', {
        value: {
          href: url,
          pathname: '/54/'
        }
      })

        listing = JSON.parse(window.location.pathname.slice(1, -1));
        state = { listingId: listing }
    })

    it('should load with the proper listingId', async (done) => {

        const wrapper = mount(<Calendar listingData={state}/>)

        
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.props().listingData.listingId).toBe(54);
        done()
    })
})