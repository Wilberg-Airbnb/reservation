import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow, configure } from "enzyme";
import App from "./App.jsx";
import Widget from "./components/Widget.jsx"

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe('<App />', () => {
  it('should set listingId state based on url', async () => {

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

  it('should pass listingId & listingData to Widget', () => {
    const wrapper = shallow(<App/>);
    // console.log(wrapper.find(Widget).state())
    expect(wrapper.find(Widget).exists()).toBeTruthy();
  })

  it('should call componentDidMount ', async () => {

    const spy = jest.spyOn(App.prototype, 'componentDidMount');
    var wrapper = await shallow(<App />);
    const instance = wrapper.instance();
    await instance.componentDidMount();
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  })
});