import React from 'react'
import PropTypes from 'prop-types'

const DeviseErrors = (props) =>
  <div>
    {Object.keys(props.formErrors).map((formErrorField) => {
      return (
        props.formErrors[formErrorField].map((error) => {
          return (
            <p>{formErrorField} {error}</p>
          )
        })
      )
    })}
  </div>

  DeviseErrors.propTypes = {
    formErrors: PropTypes.object
  }


export default DeviseErrors
