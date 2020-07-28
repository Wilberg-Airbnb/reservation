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
        state = { listingId: listing, monthName: "Jun 2020", availableDates: [{"date":"2020-06-20","fee":39},{"date":"2020-06-20","fee":47},{"date":"2020-06-21","fee":54},{"date":"2020-06-21","fee":39},{"date":"2020-06-22","fee":39},{"date":"2020-06-23","fee":39},{"date":"2020-06-24","fee":39},{"date":"2020-06-24","fee":39}], allDates: [{"date":"2020-06-20","fee":39},{"date":"2020-06-20","fee":47},{"date":"2020-06-21","fee":54},{"date":"2020-06-21","fee":39},{"date":"2020-06-22","fee":39},{"date":"2020-06-23","fee":39}]};
    })

    it('should load with a Clear Dates button', async (done) => {

        const wrapper = shallow(<Calendar listingData={state}/>)

        console.log('*******************', wrapper.text())
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.text()).toContain('Clear Dates');
        done();
    })
})