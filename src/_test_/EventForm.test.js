import React from "react"
import EventForm from "../components/EventForm"
import { render, fireEvent } from "@testing-library/react"
import moment from 'moment'
import {
  // MDBContainer,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  // MDBCardText,
  MDBBtn,
  // MDBInputGroup,
  // MDBInputGroupText,
  // MDBInputGroupElement
} from 'mdb-react-ui-kit';

let container, submitButton, title, startDate, location

beforeEach(() => {
  container = render(<EventForm />)
  submitButton = container.getByRole("button", { type: "submit"} )
  title = container.getByLabelText(/Title/i)
  startDate = container.getByLabelText(/Start Date/i)
  location = container.getByLabelText(/Location/i)
})

describe("single invalid inputs", () => {
  beforeEach(() => {
    fireEvent.input(title, { target: { value: 'My Shiny Conference' } })
    fireEvent.input(startDate, { target: { value: moment().add(10, 'days') } })
    fireEvent.input(location, { target: { value: 'London' } })
  })

  test("submit button is disabled if title is invalid", () => {
    expect(submitButton).toBeEnabled()
    fireEvent.input(title, { target: { value: 'My' } })
    expect(submitButton).toBeDisabled()
  })

  test("submit button is disabled if start_datetime is invalid", () => {
    expect(submitButton).toBeEnabled()
    fireEvent.input(startDate, { target: { value: moment().subtract(10, 'days') } })
    expect(submitButton).toBeDisabled()
  })

  test("submit button is disabled if location is invalid", () => {
    expect(submitButton).toBeEnabled()
    fireEvent.input(location, { target: { value: '' } })
    expect(submitButton).toBeDisabled()
  })
})
