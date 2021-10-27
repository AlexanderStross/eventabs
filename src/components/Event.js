import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import {useParams, Link} from 'react-router-dom'
import history from './../history'

import {
  MDBContainer, MDBRow, MDBCol,
  // MDBInput,
  // MDBCard,
  // MDBCardBody,
  // MDBCardTitle,
  // MDBCardText,
  MDBBtn,
  // MDBInputGroup,
  // MDBInputGroupText,
  // MDBInputGroupElement
} from 'mdb-react-ui-kit';

function Event(props) {
  const [event, setEvent] = useState({})
  const [editPath, setEditPath] = useState({})

  let {id} = useParams()

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3001/events/${id}`,
      headers: JSON.parse(localStorage.getItem('user'))
    }).then((response) => {
      setEvent(response.data)
      setEditPath(
        response.data.currentUserCanEdit
        ? `/events/${response.data.id}/edit`
        : undefined)
      localStorage.setItem('currentUserCanEdit', response.data.currentUserCanEdit.toString())
    }).catch(error => {
      console.log(error)
      // this.setState({
      //   apiErrors: error
      // })
      history.push('/')
    })
  }, [id])

  return (<header>
    <MDBContainer className="content-container mt-3">

      <div className="event-details">
        <MDBRow className='g-0'>
          <MDBCol xs={12} sm={12} md={8} lg={8}>
            {event.image_url && <img alt={event.title} className="event-image" src={event.image_url} style={{ maxWidth: '65rem' }} />}
          </MDBCol>
          <MDBCol xs={12} sm={12} md={4} className="bg-light">
            <div className="p-4">
              {
                editPath && <MDBBtn variant="outline-dark" href={editPath} className="float-right">
                    Edit
                  </MDBBtn>
              }
              <p className="text-uppercase event-date-abbreviated">{moment(event.start_datetime).format('MMM')}</p>
              <p className="event-date-abbreviated">{moment(event.start_datetime).format('DD')}</p>
              <h1 className="pt-4 h5">{event.title}</h1>
              {event.user && <div className="pb-3 text-muted">by {event.user.name}</div>}
              <div className="event-price">
                <div className="text-muted">
                  Free
                </div>
              </div>
            </div>
          </MDBCol>
        </MDBRow>

        <MDBRow className="event-register-button-container g-0">
          <MDBCol xs={12} sm={12} md={8} lg={8}></MDBCol>
          <MDBCol xs={12} sm={12} md={4} lg={4}>
            <div className="px-4">
              <MDBBtn color="success" size="lg" block="block">
                <small>Register</small>
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>

        <MDBRow className="event-description-container g-0">
          <MDBCol xs={12} sm={12} md={8} lg={8}>
            <h2 className="h4">About this Event</h2>
            {
              event.description && <p className="lead" dangerouslySetInnerHTML={{
                    __html: event.description
                  }}/>
            }
          </MDBCol>
          <MDBCol xs={12} sm={12} md={4} lg={4}>
            <div className="p-4">
              <h3 className="h6">Date and Time</h3>
              <div className="event-details__data">
                <p>{moment(event.start_datetime).format('ddd, DD MMMM YYYY')}</p>
                <p>{moment(event.start_datetime).format('hh:mm a')}</p>
                <p>
                  <Link to="#">Add to Calendar</Link>
                </p>
              </div>
              <h3 className="h6">Location</h3>
              <p>{event.location}</p>
            </div>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  </header>)
}

export default Event
