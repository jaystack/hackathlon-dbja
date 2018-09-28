import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 8,
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
});

const Layout = ({ title, classes, children }) => (
  <div>
    <Head>
      <title>Game title</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
    </Head>
    <div>
      <div>
        header
      </div>
      <div>
        {children}  
      </div>
      <div>
        footer
        <button>Speak</button>
      </div>
    </div>
  </div>
);


export default Layout;
