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
      const wrapper = shallow(<App />);
      expect(wrapper.state().listingId).toEqual(27);
      expect(spy).toHaveBeenCalled();
      spy.mockReset();
      spy.mockRestore();
    })
  });


  // describe('API', () => {

  //   it('should return data packet according to listingId when mounted', async () => {
  
  //     global.window = Object.create(window);
  //     const url = "http://localhost:8888/57";
  //     Object.defineProperty(window, 'location', {
  //       value: {
  //         href: url
  //       }
  //     })
  
  //     const wrapper = await shallow(<App/>)
  //     // console.log(wrapper.state())
  
  //   })
  
  
  // })