import React from 'react'
import PropTypes from 'prop-types'

const UserPage = ({ token }) => {
  return (
    <div className='w-100 h-100'>
      <manager0-user-manager
        token={token}
        filter="email,username,role,profile,lastLogin"
    ></manager0-user-manager>
    </div>
  )
}

UserPage.propTypes = {
  token: PropTypes.string.isRequired
}

export default UserPage
