import React from "react"

export const ProfileData = ({ getCustomer }) => {
  const { fname, lname, email } = getCustomer
  return(
    <div>
      <p><strong>First Name:</strong> {fname}</p>
      <p><strong>Last Name:</strong> {lname}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  )
}

export default ProfileData