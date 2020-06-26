import React from 'react';
// import React from 'react-dom';

class Widget extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMout() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <div id="widget-heading">
          <h3 id="night-price">$70 / night</h3>
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
      </div>
    )
  }
}

export default Widget