import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listingId: JSON.parse(window.location.href.split('/')[3]),
      availableDates: [],
      standardPrice: null,
      cleaningFee: null,
      weeklyDiscount: null,
      refundable: false
    }
  }

  componentDidMount() {

    var listingId = this.state.listingId
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
      .catch(err => {
        console.log("GET for data failed: ", err);
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