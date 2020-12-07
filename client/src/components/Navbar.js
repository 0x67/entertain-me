import React from 'react'
import { Link } from 'react-router-dom'

import { Breadcrumb } from 'semantic-ui-react'

const Navbar = () => {
  return (
    <>
    <Breadcrumb>
      <Breadcrumb.Section active>
        <Link to='/'>Home</Link>
      </Breadcrumb.Section>
      <Breadcrumb.Divider />
      <Breadcrumb.Section>
        <Link to='/favorite'>Favorite</Link>
      </Breadcrumb.Section>
      <Breadcrumb.Divider />
    </Breadcrumb>
    </>
  )
}

export default Navbar