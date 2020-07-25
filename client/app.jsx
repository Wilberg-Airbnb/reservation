import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './components/Widget.jsx'
import axios from 'axios';
import lodash from 'lodash';
import Calendar from './components/Calendar.jsx'

const dateString = (info) => {
  info = info.split('T')[0]
  //TODO remove logs!
  // console.log('in', info)
  // console.log('out', new Date(info).toISOString().slice(0, -14));
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
      checkOut: '',
      currentPrice: null,
      invoice: false,
      calendarPage: 0,
      guestOpen: false,
      adults: 1,
      children: 0,
      infants: 0,
      calendarPopup: false
    }

    this.selectDate = this.selectDate.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.openGuests = this.openGuests.bind(this);
    this.handleGuests = this.handleGuests.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
  }

  //get data method for retrieving the listing data
  getData() {

    var listingId = this.state.listingId

    axios.get(`http://${window.location.host}/api/reservation/${listingId}`)
      .then(res => {
        console.log('AXIOS SUCCESS:', res)
        //data for listing set when component mounts
        let sortedDates = _.sortBy(res.data.availableDates, ["date"]);
        sortedDates = sortedDates.map(x => {
          return {date: x.date.split('T')[0], fee: x.fee}
        })

        this.setState({
          availableDates: sortedDates,
          standardPrice: res.data.standardPrice,
          cleaningFee: res.data.cleaningFee,
          weeklyDiscount: res.data.weeklyDiscount,
          refundable: res.data.refundable,
          currentPrice: res.data.standardPrice
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

    this.setState({ allDates: renderedDates });
  }


  //deals with selecting dates and storing them in state
  selectDate(e) {
    //format selected element data for checking
    let monthYear = e.target.id.slice(3)
    let selectedDay = parseInt(e.target.innerHTML);
    let allAvailable = this.state.availableDates.map(x => dateString(x.date));
    let stay = [];
    
    //CHECK-IN STAGE *********************************************************
    //if we're in check-in stage...
    if (this.state.bookStage === 'check-in') {
      //add selected style to first chosen date
      let el = document.getElementById(e.target.id);
      el.classList.add('selected')
      
      //we filter out all dates that are not possible as checkout dates
      while (true) {
        let filtered = this.state.availableDates.filter(y => {
          return y.date === dateString(selectedDay + ' ' + monthYear)
        })
        console.log(stay)
        if (allAvailable.indexOf(dateString(selectedDay + ' ' + monthYear)) !== -1) {
          // console.log(allAvailable)
          stay.push(filtered[0])
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
        availableDates: stay,
        checkIn: e.target.id,
        bookStage: 'checkout'
      });
    }

    //CHECKOUT STAGE *********************************************************
    //if we are in checkout stage when selecting...
    if (this.state.bookStage === 'checkout') {

      //filter out all dates except the ones containing your stay
      while (true) {
        let filtered = this.state.availableDates.filter(y => y.date === dateString(selectedDay + ' ' + monthYear))
        if (allAvailable.indexOf(dateString(selectedDay + ' ' + monthYear)) !== -1) {
          //add selected class to dates and push to stay
          let padDay = _.padStart(selectedDay, 2, '0')
          let el = document.getElementById(padDay + ' ' + monthYear);
          if (el === null) { break }
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
        checkOut: e.target.id,
        currentPrice: this.state.availableDates[0].fee,
        bookStage: 'invoice',
        invoice: true
      })
    }
  }

  nextPage() {
    let currentPage = this.state.calendarPage;
    this.setState({
      calendarPage: currentPage + 323
    })
  }

  prevPage() {
    let currentPage = this.state.calendarPage;
    this.setState({
      calendarPage: currentPage - 323
    })
  }

  clearDates() {

    //get original availableDates
    this.getData()

    //remove selected class from all selected dates
    let allSelected = document.querySelectorAll(".selected");
    for (var i = 0; i < allSelected.length; i++) {
      allSelected[i].classList.remove("selected");
    }

    //set invoice back to false and back to checkin mode
    this.setState({
      bookStage: 'check-in',
      checkIn: '',
      checkOut: '',
      invoice: false
    })
  }

  openGuests() {
    this.setState({guestOpen: !this.state.guestOpen})
  }

  handleGuests(name, isAdding) {
    // const name = target.name;
    console.log(name)
    var value = this.state[name];
    if(isAdding) {
      value++
      this.setState({[name]: value});
    } else {
      value > 0 ? value-- : value;
      name === 'adults' && value < 1 ? value++ : value;
      this.setState({[name]: value});
    }
  }

  openCalendar() {
    this.setState({calendarPopup: !this.state.calendarPopup})
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
        <Widget listingData={this.state} openGuests={this.openGuests} handleGuests={this.handleGuests} selectDate={this.selectDate} page={this.state.calendarPage} nextPage={this.nextPage} prevPage={this.prevPage} clearDates={this.clearDates} openCalendar={this.openCalendar}/>
        <Calendar listingData={this.state} selectDate={this.selectDate} page={this.state.calendarPage} nextPage={this.nextPage} prevPage={this.prevPage} clearDates={this.clearDates} />
      </div>
    );
  }
}

export default App;