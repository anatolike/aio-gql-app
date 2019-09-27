import React from 'react';
import Header from "../Header";
import Footer from "../Footer";


const BaseLayout = ({children}) => {


  return (
    <React.Fragment>
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </React.Fragment>
  )
}

export default BaseLayout
