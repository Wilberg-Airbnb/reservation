import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow, configure } from "enzyme";
import App from "./App.jsx";
import Widget from "./components/Widget.jsx";
import Calendar from "./components/Calendar.jsx";
import axios from "axios";

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

//App unit testing

describe('<App />', () => {
  it('should set listingId state based on url', async (done) => {

    global.window = Object.create(window);
    const url = "http://localhost:8888/27/";
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
        pathname: '/27/'
      }
    })

    var wrapper = shallow(<App />);
    expect(wrapper.state().listingId).toEqual(27);
    done()
  })

  it(`should render with default props`, async (done) => {
    const wrapper = shallow(<App/>);
    expect(wrapper).toMatchSnapshot();
    done()
  });

  it('should only catch console errors when getData or getRated fails', async (done) => {
    const consoleError = jest.spyOn(global.console, 'error');
    const wrapper = shallow(<App/>);
    expect(consoleError).not.toHaveBeenCalled();
    done()
  })

  it('should render a Calendar & Widget', async (done) => {
    const wrapper = shallow(<App/>);

    expect(wrapper.find(Widget).exists).toBeTruthy();
    expect(wrapper.find(Calendar).exists).toBeTruthy();
    done()
  })

  it('should render starting with a booking stage of "check-in"', async (done) => {
    var wrapper = await shallow(<App/>);
    expect(wrapper.state().bookStage).toBe('check-in');
    console.log(wrapper.state())
    done()
  })

  it('should call componentDidMount & nested functions when rendered', async (done) => {
    
    const spy = jest.spyOn(App.prototype, 'componentDidMount');
    const spy2 = jest.spyOn(App.prototype, 'generateDates');
    const spy3 = jest.spyOn(App.prototype, 'getData');
    const spy4 = jest.spyOn(App.prototype, 'getRated');
    const spy5 = jest.spyOn(axios, 'get');
    var wrapper = await shallow(<App />);
    const instance = await wrapper.instance();
    instance.componentDidMount();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
    expect(spy4).toHaveBeenCalled();
    expect(spy5).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
    done()
  })
});

