import React from 'react'
import { MDBContainer } from 'mdb-react-ui-kit';
import axios from 'axios'
import EventsList from './EventsList'


import './Eventlite.css'



class Eventlite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/events'
    })
    .then(response => {
      this.setState({events: response.data})
    })
  }


  render() {
    return (
      <MDBContainer breakpoint="lg">
        <h1 className="h4 mt-3">Latest events</h1>
        <EventsList events={this.state.events} />
      </MDBContainer>
    )
  }
}

export default Eventlite
