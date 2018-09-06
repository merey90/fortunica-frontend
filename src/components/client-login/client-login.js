import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import './client-login.css';
const ClientLogin = (props) => {
  return (
    <Grid container
      className="client-login"
      direction="row"
      justify="center"
      alignItems="stretch"
      spacing={16}
      >
      <Grid item xs={12} sm={6}>
        <Paper className="default-padding full-height" elevation={1}>
          <form className='login' onSubmit={props.handleSubmitLogin}>
            <FormControl fullWidth>
              <TextField
                  name="name"
                  label="Name"
                  onChange={props.handleInputChange}
                  margin="normal"
                />
            </FormControl>
            <FormControl fullWidth>
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit">Sign In</Button>
            </FormControl>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className="default-padding" elevation={1}>
          <form className='register' onSubmit={props.handleSubmitRegister}>
            <FormControl fullWidth>
              <TextField
                name="name"
                label="Name"
                onChange={props.handleInputChange}
                margin="normal"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                name="zodiac"
                label="Zodiac"
                onChange={props.handleInputChange}
                margin="normal"
              />
            </FormControl>
            <FormControl fullWidth>
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit">Register</Button>
            </FormControl>
          </form>
        </Paper>
      </Grid>
      
    </Grid>
  );
}

export default ClientLogin;