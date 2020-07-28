import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount, shallow, configure } from "enzyme";
import App from "../App.jsx";
import Calendar from "./Calendar.jsx";
import Page from "./Page.jsx"

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

    it(`should render with default props`, async (done) => {
      const wrapper = shallow(<Calendar listingData={state}/>);
      expect(wrapper).toMatchSnapshot();
      done()
    });

    it('should render at least 6 Pages of dates', async (done) => {
      const wrapper = shallow(<Calendar listingData={state}/>)
      expect(wrapper.find(Page).length).toBeGreaterThanOrEqual(6);
      done()
    });

    it('should load with a Clear Dates button', async (done) => {

        const wrapper = shallow(<Calendar listingData={state}/>)
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.text()).toContain('Clear Dates');
        done();
    });

    it('should call clearDates when ClearDates is clicked', async (done) => {
      const mockClearDates = jest.fn();
      const wrapper = shallow(<Calendar listingData={state} clearDates={mockClearDates}/>);
      wrapper.find('#clearDates').simulate('click');
      expect(mockClearDates.mock.calls.length).toEqual(1);
      expect(wrapper.find('.selected')).toMatchObject({});
      done();
    })


})