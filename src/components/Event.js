import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import history from './../history'

function Event(props){
  const [event, setEvent] = useState({})
  const [editPath, setEditPath] = useState({})

const formatDate = datetime =>
  new Date(datetime).toDateString()
  let { id } = useParams()

  useEffect(() => {
      axios({
        method: "GET",
        url: `http://localhost:3001/events/${id}`,
        headers: JSON.parse(localStorage.getItem('user'))
      }).then((response) => {
        setEvent(response.data)
        setEditPath(response.data.currentUserCanEdit ? `/events/${response.data.id}/edit` : undefined )
        localStorage.setItem('currentUserCanEdit', response.data.currentUserCanEdit.toString())
      }).catch(error => {
        console.log(error)
        // this.setState({
        //   apiErrors: error
        // })
        history.push('/')
      })
    }, [id])

  return (
    <div className="event">
      {editPath &&
        <Link to= {editPath} >
          Edit
        </Link>
      }
      {event.image_url && <img alt="" src={event.image_url} />}
      <h2 className="event-title">{event.title}</h2>
      <div className="event-datetime">{formatDate(event.start_datetime)}</div>
      <div className="event-location">{event.location}</div>
      <div className="event-description">{event.description}</div>
    </div>
  )
}

export default Event
