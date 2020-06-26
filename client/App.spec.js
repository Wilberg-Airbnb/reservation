import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow, configure } from "enzyme";
import App from "./App.jsx";
import axios from "axios";

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe('<App />', () => {
  it('sets listingId state based on url and calls componentDidMount', async () => {

    global.window = Object.create(window);
    const url = "http://localhost:8888/27";
    Object.defineProperty(window, 'location', {
      value: {
        href: url
      }
    })

    var wrapper = shallow(<App />);
    expect(wrapper.state().listingId).toEqual(27);
  })

  it('calls componentDidMount ', async () => {

    const spy = jest.spyOn(App.prototype, 'componentDidMount');
    var wrapper = await shallow(<App />);
    const instance = wrapper.instance();
    await instance.componentDidMount();
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  })
});