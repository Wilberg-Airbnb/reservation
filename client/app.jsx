import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listingId: null,
      availableDates: [],
      standardPrice: null,
      cleaningFee: null,
      weeklyDiscount: null,
      refundable: false
    }
  }

  componentDidMount() {
    var listingId = window.location.href.split('/')[3]
    axios.get(`/reservation/${listingId}`)
      .then(res => {
        console.log(res.data)

        this.setState({
          listingId: res.data.listingId,
          availableDates: res.data.availableDates,
          standardPrice: res.data.standardPrice,
          cleaningFfee: res.data.cleaningFee,
          weeklyDiscount: res.data.weeklyDiscount,
          refundable: res.data.refundable
        })
      })
  }

  render() {
    return (
      <div>
        <h1>RESERVATIONS</h1>
      </div>
    );
  }
}

export default App;