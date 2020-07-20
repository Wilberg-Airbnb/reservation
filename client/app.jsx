import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './components/Widget.jsx'
import axios from 'axios';
import lodash from 'lodash';
import Calendar from './components/Calendar.jsx'

const dateString = (info) => {
  return new Date(info).toISOString().slice(0, -14);
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.requestedId = JSON.parse(window.location.pathname.slice(1, -1));

    //init state values when static page is loaded
    this.state = {
      listingId: this.requestedId,
      availableDates: [],
      standardPrice: null,
      cleaningFee: null,
      weeklyDiscount: null,
      refundable: false,
      allDates: {},
      bookStage: 'check-in',
      checkIn: '',
      checkOut: ''
    }

    this.selectDate = this.selectDate.bind(this);
  }

  //get data method for retrieving the listing data
  getData() {

    var listingId = this.state.listingId

    axios.get(`http://${window.location.host}/api/reservation/${listingId}`)
      .then(res => {
        console.log('AXIOS SUCCESS:', res)
        //data for listing set when component mounts
        let sortedDates = _.sortBy(res.data.availableDates, ["date"]);

        this.setState({
          availableDates: sortedDates,
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

  //generates all dates from this month that will populate our calendar when we pull up page
  generateDates() {
    let today = new Date;
    let month = today.getMonth();
    let year = today.getFullYear();
    let dayCount = [...Array(367).keys()].slice(1);

    let renderedDates = {};

    dayCount.map(day => {
      let date = new Date(year, month, day).toString();
      let details = date.split(' ');
      let monthYear = `${details[1]} ${details[3]}`;
      let dayDate = `${details[0]} ${details[2]}`;
      renderedDates[monthYear] 
      ? renderedDates[monthYear].push(dayDate) 
      : renderedDates[monthYear] = [dayDate];
    })

    this.setState({allDates: renderedDates});
  }


  //deals with selecting dates and storing them in state
  selectDate(e, monthYear) {
    //format selected element data for checking
    let selectedDay = parseInt(e.target.innerHTML);
    let allAvailable = this.state.availableDates.map(x => dateString(x.date));
    
    //if we're in check-in stage...
    if (this.state.bookStage === 'check-in') {
      let el = document.getElementById(e.target.id);
      el.classList.add('selected')

      //we filter out all dates that are not possible as checkout dates
      let checkoutDates = [];

      while (true) {
        let filtered = this.state.availableDates.filter(y => y.date.slice(0, -14) === dateString(selectedDay + ' ' + monthYear))
        if (allAvailable.indexOf(dateString(selectedDay + ' ' + monthYear)) !== -1) {
          checkoutDates.push(filtered[0])
        } else {
          break
        } 

        selectedDay++

        //logic dealing with turnover from one month or year to the next
        if (new Date(selectedDay + ' ' + monthYear).toString() === 'Invalid Date') {
          selectedDay = 1
          let nextMonthIndex = new Date(monthYear).getMonth() + 1
          let yearIndex = new Date(monthYear).getFullYear();
          if (nextMonthIndex > 11) {
            yearIndex++
            nextMonthIndex = 0
          }

          let details = new Date(yearIndex, nextMonthIndex).toString().split(' ');
          monthYear = details[1] + ' ' + details[3];
        }
      }

      //set availableDates to only the selected day and available checkout dates, checkin to selection and bookStage to checkout
      this.setState({
        availableDates: checkoutDates,
        checkIn: selectedDay + ' ' + monthYear,
        bookStage: 'checkout'
      });
    }

    //if we are in checkout stage when selecting...
    if (this.state.bookStage === 'checkout') {

      //filter out all dates except the ones containing your stay
      let stay = [];

      while (true) {
        let filtered = this.state.availableDates.filter(y => y.date.slice(0, -14) === dateString(selectedDay + ' ' + monthYear))
        if (allAvailable.indexOf(dateString(selectedDay + ' ' + monthYear)) !== -1) {
          //add selected class to dates and push to stay
          let padDay = _.padStart(selectedDay, 2, '0')
          let el = document.getElementById(padDay + ' ' + monthYear);
          el.classList.add('selected')
          stay.push(filtered[0])
        } else {
          break
        }

        selectedDay--

        //logic dealing with turnover from one month/year to the previous
        if (new Date(selectedDay + ' ' + monthYear).toString() === 'Invalid Date') {
          selectedDay = 31
          let nextMonthIndex = new Date(monthYear).getMonth() - 1
          let yearIndex = new Date(monthYear).getFullYear();
          if (nextMonthIndex < 0) {
            yearIndex--
            nextMonthIndex = 11
          }
          let details = new Date(yearIndex, nextMonthIndex).toString().split(' ');
          monthYear = details[1] + ' ' + details[3];
          while (new Date(selectedDay + ' ' + monthYear).toString() === 'Invalid Date') {
            selectedDay--
          }
        }
      }

      //set state to stay, checkout to selected end date and bookStage to final invoice
      this.setState({
        availableDates: stay,
        checkOut: selectedDay + ' ' + monthYear,
        bookStage: 'invoice'
      })

      //TODO must write logic to clear calendar when user wants to reselect dates
      //TODO pull up invoice for remaining availableDates after selection
    }

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
        <Calendar listingData={this.state} selectDate={this.selectDate}/>
      </div>
    );
  }
}

export default App;