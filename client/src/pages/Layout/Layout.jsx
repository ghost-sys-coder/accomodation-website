import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, PageFooter } from "../../components/index";

const Layout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <PageFooter />
    </>
  )
}

export default Layout