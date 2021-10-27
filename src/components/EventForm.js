import React from 'react'
import PropTypes from 'prop-types'
import FormErrors from './FormErrors'
import validations from '../validations'
import axios from 'axios'
import {
  MDBContainer,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  // MDBInputGroup,
  // MDBInputGroupText,
  // MDBInputGroupElement
} from 'mdb-react-ui-kit';
//import { useLocation } from 'react-router-dom'

class EventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: {value: '', valid: false},
      start_datetime: {value: '', valid: false},
      location: {value: '', valid: false},
      image_url: {value: '', valid: false},
      description: {value: '', valid: false},
      successMessage: '',
      formErrors: {},
      apiErrors: {},
      formValid: false,
      editing: false,
      deleteConfirm: false,
    }
    this.successMessageTimeoutHandle = 0
  }

  static formValidations = {
    title: [
      (value) => { return(validations.checkMinLength(value, 3)) }
    ],
    start_datetime: [
      (value) => { return(validations.checkMinLength(value, 1)) },
      (value) => { return(validations.timeShouldBeInTheFuture(value)) }
    ],
    location: [
      (value) => { return(validations.checkMinLength(value, 1)) }
    ],
    image_url: [],
    description: []
  }

  componentDidMount () {
    if (this.props.match) {
    if (this.props.match.path === '/events/:id/edit') {
      this.setState({editing: this.props.match.path === '/events/:id/edit'})
      axios({
        method: "GET",
        url: `http://localhost:3001/events/${this.props.match.params.id}`,
        headers: JSON.parse(localStorage.getItem('user'))
      })
      .then((response) => {
        this.setState({
          title: {valid: true, value: response.data.title},
          location: {valid: true, value: response.data.location},
          start_datetime: {valid: true, value: new Date(response.data.start_datetime).toDateString()},
          image_url: {valid: true, value: response.data.image_url},
          description: {valid: true, value: response.data.description},
          currentUserCanEdit: {valid: true, value: response.data.currentUserCanEdit}
        }, this.validateForm)
        this.resetApiErrors();
      })
      .catch(error => {
        console.log(error)
        // this.setState({
        //   apiErrors: error
        // })
        this.props.history.push('/')
      })
    }
  }
}

componentWillUnmount() {
    clearTimeout(this.successMessageTimeoutHandle);
}


  handleInput = e => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    const newState = {}
    newState[name] = {...this.state[name], value: value}
    this.setState(newState, () => this.validateField(name, value, EventForm.formValidations[name]))
  }

  handleSubmit = e => {
    e.preventDefault()

    const event = {
      title: this.state.title.value,
      start_datetime: this.state.start_datetime.value,
      location: this.state.location.value,
      image_url: this.state.image_url.value,
      description: this.state.description.value,
    }
    const method = this.state.editing ? 'PUT' : 'POST'
    const url = this.state.editing ? `http://localhost:3001/events/${this.props.match.params.id}` : 'http://localhost:3001/events'

    axios({
      method: method,
      url: url,
      headers: JSON.parse(localStorage.user),
      data: { event: event }
    })
    .then(response => {
      if(!this.state.editing && this.props.onSuccess) {
        this.props.onSuccess(response.data)
      }
      this.resetFormErrors();
      if (this.props.match.path === '/create') {this.setSuccessMessage('Your Event Has Been Created Successfully!')}
      if (this.props.match.path === '/events/:id/edit') {this.setSuccessMessage('Your Event Has Been Edited Successfully!')}
    })
    .catch(error => {
      this.setState({formErrors: error.response.data, formValid: false})
    })
  }

  validateField(fieldName, fieldValue, fieldValidations) {
    let fieldValid = true
    let errors = fieldValidations.reduce((errors, validation) => {
      let [valid, fieldError] = validation(fieldValue)
      if(!valid) {
        errors = errors.concat([fieldError])
      }
      return(errors);
    }, []);

    fieldValid = errors.length === 0

    const newState = {formErrors: {...this.state.formErrors, [fieldName]: errors}}
    newState[fieldName] = {...this.state[fieldName], valid: fieldValid}
    this.setState(newState, this.validateForm)
  }

  validateForm() {
    this.setState({formValid: this.state.title.valid && this.state.location.valid && this.state.start_datetime.valid})
  }

  resetFormErrors () {
    this.setState({formErrors: {}})
  }

  resetApiErrors() {
    this.setState({apiErrors: {}})
  }

  deleteEvent = () => {
    axios({
      method: 'DELETE',
      url: `http://localhost:3001/events/${this.props.match.params.id}`,
      headers: JSON.parse(localStorage.getItem('user'))
    }).then((response) => {
      this.props.history.push('/')
    })
  }

  setSuccessMessage(message) {
      this.setState({
          successMessage: message
      });
      clearTimeout(this.successMessageTimeoutHandle);
      this.successMessageTimeoutHandle = setTimeout(() => {
          this.setState({
              successMessage: ''
          });
          this.successMessageTimeoutHandle = 0;
      }, 3000)
  }

  render() {
    return (
      <MDBContainer breakpoint="sm">
      <MDBCard style={{ maxWidth: '60rem' }}>
      <MDBCardBody stype="mt-3">
        <MDBCardTitle>{this.state.editing ? "Edit Event" : "Create a new Event"}</MDBCardTitle>
        {this.state.successMessage && (
               <div className="alert alert-success text-center">
                   {this.state.successMessage}
               </div>
           )}
        <FormErrors formErrors = {this.state.formErrors} />
        <form onSubmit={this.handleSubmit}>
          <MDBInput type="text" name="title" label="Title" value={this.state.title.value} onChange={this.handleInput} />
          <MDBInput type="text" name="start_datetime" label="Date" value={this.state.start_datetime.value} onChange={this.handleInput} />
          <MDBInput type="text" name="location" label="Location" value={this.state.location.value} onChange={this.handleInput} />
          <MDBInput label='Image URL input' id='typeURL' type='url' value={this.state.image_url.value} onChange={this.handleInput} />
          <MDBInput label='Description' name="description" id="description" textarea rows={6} value={this.state.description.value} onChange={this.handleInput} />
          <MDBInput type="submit" value={this.state.editing ? "Update Event" : "Create Event"}
           disabled={!this.state.formValid} />
        </form>
        {this.state.editing &&
          (!this.state.deleteConfirm
          ? (<><p>
              <button onClick={() => { this.setState({ deleteConfirm: true })}}>Delete Event</button>
            </p></>)
          : (<><p>Are you sure you want to delete this event?</p><p>
              <button onClick={() => { this.setState({ deleteConfirm: false })}}>Cancel</button> <button onClick={this.deleteEvent}>Yes, delete this event</button>
            </p></>))
        }
        </MDBCardBody>
      </MDBCard>
      </MDBContainer>
    )
  }
}

EventForm.propTypes = {
  onSuccess: PropTypes.func,
}

export default EventForm
