import React from 'react';
import { MDBContainer, MDBAlert } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types'

const FormErrors = (props) =>
  Object.keys(props.formErrors).map((formErrorField) => {
    return (
      props.formErrors[formErrorField].map((error) => {
        return (
          <MDBContainer>
            <MDBAlert show className='w-100' color='danger'>{formErrorField} {error}</MDBAlert>
          </MDBContainer>
        )
      })
    )
  })


FormErrors.propTypes = {
  formErrors: PropTypes.object
}

export default FormErrors
