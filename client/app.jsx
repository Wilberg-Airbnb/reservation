import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './components/Widget.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    // this.requestedId = JSON.parse(window.location.href.split('/')[3]); 
    this.requestedId = JSON.parse(window.location.pathname.slice(1, -1));

    this.state = {
      listingId: this.requestedId,
      availableDates: [],
      standardPrice: null,
      cleaningFee: null,
      weeklyDiscount: null,
      refundable: false
    }
  }

  getData() {
    
    var listingId = this.state.listingId

    axios.get(`/api/reservation/${listingId}`)
      .then(res => {
        console.log('AXIOS SUCCESS:', res)

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

  componentDidMount() {
    this.getData();

  }

  render() {
    return (
      <div>
        <Widget listingData={this.state} />
      </div>
    );
  }
}

export default App;