import React from 'react';
// import React from 'react-dom';

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listingId: this.props.listingData.listingId
    };
  }

  handleClick() {
    
  }

  componentDidMount() {
    // console.log('widget inherits listing data: ', this.props.listingData)
  }

  render() {
    return (
      <div>
        <div id="widget-heading">
          <h3 id="night-price">${this.props.listingData.standardPrice} / night</h3>
          <span id="avg-rating">⭐️ 4.90 (323)</span>
        </div>
        <div id="calendar-picker">
          <input type="date" id="datemin" name="datemin"></input>
          <input type="date" id="datemax" name="datemax"></input>
          <div id="guest-picker">
            <h5>GUESTS</h5>
            <div>1 guest</div>
          </div>
        </div>
        <div>
          <button id="check-available" onClick={(e) => this.handleClick(e)}>Check availability</button>
        </div>
      </div>
    )
  }
}

export default Widget