import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.requestedId = JSON.parse(window.location.href.split('/')[3]);

    this.state = {
      listingId: this.requestedId,
      availableDates: [],
      standardPrice: null,
      cleaningFee: null,
      weeklyDiscount: null,
      refundable: false
    }
  }

  componentDidMount() {

    var listingId = this.state.listingId

    console.log('axios called for listingId: ', listingId)
    axios.get(`http://localhost:8888/api/reservation/${listingId}`)
      .then(res => {
        console.log('AXIOS SUCCESS')

        this.setState({
          listingId: res.data.listingId,
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

  render() {
    return (
      <div>
        <h1>RESERVATIONS</h1>
      </div>
    );
  }
}

export default App;