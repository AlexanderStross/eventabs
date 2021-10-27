import React from 'react'
import PropTypes from 'prop-types'
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';
import moment from 'moment'


const EventSummary = props => (<MDBCol md={4}>
  <MDBCard style={{
      maxWidth: '22rem'
    }} className="mb-4 event-card">
    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
      <MDBCardImage src={props.event.image_url} fluid="fluid" alt='...'/>
      <a href={`/events/${props.event.id}`}>
        <div className='mask' style={{
            backgroundColor: 'rgba(251, 251, 251, 0.15)'
          }}></div>
      </a>
    </MDBRipple>
    <MDBCardBody>
      <MDBCardLink href={`/events/${props.event.id}`} className="event-card-link" style={{
          textDecoration: 'none',
          color: 'black'
        }}>
        <MDBCardTitle>{props.event.title}</MDBCardTitle>
      </MDBCardLink>
      <MDBCardText>
        <span className="event-datetime"> {moment(props.event.start_datetime).format('ddd, MMM DD, YYYY hh:mm A z')}</span>
      </MDBCardText>
      <MDBCardText>
        <span className="event-location">{props.event.location}</span>
      </MDBCardText>
      <MDBBtn href={`/events/${props.event.id}`}>View Event</MDBBtn>
    </MDBCardBody>
  </MDBCard>
</MDBCol>)

Event.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    start_datetime: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
  })
}

export default EventSummary
