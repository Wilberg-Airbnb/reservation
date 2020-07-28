import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount, shallow, configure } from "enzyme";
import App from "../App.jsx";
import Page from "./Page.jsx";

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe('<Page/>', () => {

  it('should display days of the week', async (done) => {

    let monthDays = ["Sat 01","Sun 02","Mon 03","Tue 04","Wed 05","Thu 06","Fri 07","Sat 08","Sun 09","Mon 10","Tue 11","Wed 12","Thu 13","Fri 14","Sat 15","Sun 16","Mon 17","Tue 18","Wed 19","Thu 20","Fri 21","Sat 22","Sun 23","Mon 24","Tue 25","Wed 26","Thu 27","Fri 28","Sat 29","Sun 30","Mon 31"];
    let monthData = [{"date":"2020-08-01","fee":54},{"date":"2020-08-02","fee":47},{"date":"2020-08-02","fee":39},{"date":"2020-08-06","fee":47},{"date":"2020-08-06","fee":39},{"date":"2020-08-08","fee":47},{"date":"2020-08-11","fee":54},{"date":"2020-08-12","fee":47},{"date":"2020-08-13","fee":54},{"date":"2020-08-14","fee":47},{"date":"2020-08-14","fee":39},{"date":"2020-08-16","fee":54},{"date":"2020-08-16","fee":39},{"date":"2020-08-17","fee":47},{"date":"2020-08-17","fee":47},{"date":"2020-08-17","fee":47},{"date":"2020-08-17","fee":47},{"date":"2020-08-18","fee":47},{"date":"2020-08-18","fee":54},{"date":"2020-08-19","fee":54},{"date":"2020-08-21","fee":54},{"date":"2020-08-21","fee":47},{"date":"2020-08-22","fee":47},{"date":"2020-08-23","fee":39},{"date":"2020-08-25","fee":39},{"date":"2020-08-26","fee":39},{"date":"2020-08-30","fee":39}]
    let days = ['M', 'T', 'W', 'Th', 'F', 'S', 'S']

    const wrapper = mount(<Page monthDays={monthDays} monthData={monthData} monthName={"Aug 2020"}/>);

    days.map(d => {
      expect(wrapper.text()).toContain(d);
    })
    expect(wrapper.exists()).toBeTruthy();
    
    done();
  })
})