import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from "enzyme";
import App from "./App.jsx";
import axios from "axios";

configure({ adapter: new Adapter() });

// beforeEach(() => {
//     window.history.pushState({}, 'Fake News', '27');
// })

// it('Fake News', () => {
//     const wrapper = mount(<App/>);

//     global.window = Object.create(window);
//     const url = "http://localhost:8888/27";
//     Object.defineProperty(window, 'location', {
//     value: {
//       href: url
//     }
// });

//     console.log(wrapper.state())

//     console.log(window.location.href);
//     expect(true).toBeTruthy();
// })

describe('<App />', () => {
    it('calls componentDidMount', () => {
      const spy = jest.spyOn(App.prototype, 'componentDidMount');
      const wrapper = mount(<App />);
      expect(spy).toHaveBeenCalled();
      spy.mockReset();
      spy.mockRestore();
    });
  });
