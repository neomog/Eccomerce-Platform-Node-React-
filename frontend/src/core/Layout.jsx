// REACT IMPORT
import React from 'react';

// NAV BAR IMPORT
import Menu from "./Menu";

// STYLES IMPORT
import '../styles.css'

const Layout = ({ title = 'Title', description = 'description', className, children }) => {
  return (
    <div>
        <Menu />
        <div className='jumbotron'>
            <h2>{title}</h2>
            <p className='lead'>{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>

  )
}

export default Layout;