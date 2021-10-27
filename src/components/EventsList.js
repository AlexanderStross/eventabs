import React from 'react'
import PropTypes from 'prop-types'
import EventSummary from './EventSummary'
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';

const EventsList = props => (
  <MDBContainer>
      <MDBRow>
    {props.events.map(function(event){
      return(
        <EventSummary key={event.id} event={event} />
      )
    })}
    </MDBRow>
 </MDBContainer>
)

EventsList.propTypes = {
  events: PropTypes.array.isRequired
}

export default EventsList
