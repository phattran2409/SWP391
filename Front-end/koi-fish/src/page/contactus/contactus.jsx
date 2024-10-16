import React from 'react'
import ContactUsForm from './contactus/contactusform'
import ContactUsDetails from './contactus/contactusdetails'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
const ContactUs = () => {
  return (
    <>
        <Navbar/>
        <ContactUsForm/>
        <ContactUsDetails/>
        <Footer/>
    </>
  )
}

export default ContactUs