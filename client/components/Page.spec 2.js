import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount, shallow, configure } from "enzyme";
import App from "../App.jsx";
import Page from "./Page.jsx";

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe('<Page/>', () => {

  it('should display days of the week', async (done) => {

    let days = ['M', 'T', 'W', 'Th', 'F', 'S', 'S']
    const wrapper = mount(<Page />)

    days.map(d => {
      expect(wrapper.text()).toContain(d);
    })
    expect(wrapper.exists()).toBeTruthy();
    
    done();
  })
})