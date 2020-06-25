import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from "enzyme";
import App from "./App.jsx";
import axios from "axios";

configure({ adapter: new Adapter() });

describe('<App />', () => {

    it('sets listingId state based on url and calls componentDidMount', () => {

      global.window = Object.create(window);
      const url = "http://localhost:8888/27";
      Object.defineProperty(window, 'location', {
        value: {
          href: url
        }
      })

      const spy = jest.spyOn(App.prototype, 'componentDidMount');
      const wrapper = mount(<App />);
      expect(wrapper.state().listingId).toEqual(27);
      expect(spy).toHaveBeenCalled();
      spy.mockReset();
      spy.mockRestore();
    })
  });
