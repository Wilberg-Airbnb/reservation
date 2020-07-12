import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './components/Widget.jsx'
import axios from 'axios';
import Calendar from './components/Calendar.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);

    // this.requestedId = JSON.parse(window.location.href.split('/')[3]); 
    this.requestedId = JSON.parse(window.location.pathname.slice(1, -1));

    //init state values when static page is loaded
    this.state = {
      listingId: this.requestedId,
      availableDates: [],
      standardPrice: null,
      cleaningFee: null,
      weeklyDiscount: null,
      refundable: false,
      allDates: {}
    }
  }

  //get data method for retrieving the listing data
  getData() {

    var listingId = this.state.listingId

    axios.get(`http://localhost:5000/api/reservation/${listingId}`)
      .then(res => {
        console.log('AXIOS SUCCESS:', res)
        //data for listing set when component mounts
        this.setState({
          availableDates: res.data.availableDates,
          standardPrice: res.data.standardPrice,
          cleaningFee: res.data.cleaningFee,
          weeklyDiscount: res.data.weeklyDiscount,
          refundable: res.data.refundable
        })
      })
      .catch(err => {
        console.log("GET for data failed: ", err);
      })
  }

  generateDates() {
    let today = new Date;
    let month = today.getMonth();
    let year = today.getFullYear();
    let dayCount = [...Array(367).keys()];

    dayCount.map(day => {
      let date = new Date(year, month, day).toString();
      let details = date.split(' ');
      let monthYear = `${details[1]} ${details[3]}`;
      let dayDate = `${details[0]} ${details[2]}`;
      this.state.allDates[monthYear] = dayDate;
    })
  }

  componentDidMount() {
    //makes call to get data for listing
    this.generateDates();
    this.getData();
  }

  //Widget will display Calendar as modal while Calendar will also be listed further down the page

  render() {
    return (
      <div>
        <Widget listingData={this.state} />
        <Calendar listingData={this.state}/>
      </div>
    );
  }
}

export default App;