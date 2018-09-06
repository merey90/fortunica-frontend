import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import './home-page.css';

class HomePage extends Component {
  render() {
    return (
      <div className="home-page">
        <h2>You want to:</h2>
        <Grid container direction="row"
          justify="center"
          alignItems="center"
          spacing={16}>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              color="primary"
              component={Link}
              to="/client">ASK <Icon className="right-icon">contact_support</Icon></Button>
          </Grid>
          <Grid item>
            <h2> or </h2>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              color="primary"
              component={Link}
              to="/user">ANSWER <Icon className="right-icon">feedback</Icon></Button>
          </Grid>
        </Grid>
        <h2>the question?</h2>
      </div>
    );
  }
}

export default HomePage;