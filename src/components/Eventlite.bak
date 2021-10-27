import React from 'react'
import axios from 'axios'
import EventsList from './EventsList'
import history from './../history'

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

  addNewEvent = (event) => {
    const events = [...this.state.events, event].sort(function(a, b){
      return new Date(a.start_datetime) - new Date(b.start_datetime)
    })
    this.setState({events: events})
  }



  render() {
    const currentUser = localStorage.getItem('user')
    return (
      <div>
        {currentUser &&
           <form>
            <button type="button" onClick={() => history.push('/create')}>Create Event</button>
          </form>
          // <EventForm onSuccess={this.addNewEvent} />
        }
        <EventsList events={this.state.events} />
      </div>
    )
  }
}

export default Eventlite
