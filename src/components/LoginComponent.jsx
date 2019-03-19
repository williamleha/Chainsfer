import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { GoogleLogin } from 'react-google-login'
import Avatar from '@material-ui/core/Avatar'
import SendLandingIllustration from '../images/send-landing.svg'

class LoginComponent extends Component {
  loginSuccess = async (response) => {
    this.props.onLogin(response)
  }

  loginFailure = async (response) => {
    console.log(response)
  }

  render () {
    let { classes } = this.props

    return (
      <Grid container direction='column' justify='center' alignItems='center'>
        {/* Center the entire container, this step is necessary to make upper and lower section to have same width */}
        <Grid item>
          {/* 'stretch' ensures upper and lower section align properly */}
          <Grid container direction='column' justify='center' alignItems='stretch'>
            {/* Upper section */}
            <Grid item>
              <Grid container direction='row' alignItems='center'>
                <Grid item xl={6} lg={6} md={6} className={classes.leftColumn}>
                  <Grid container direction='column' justify='center' alignItems='center'>
                    <Grid item className={classes.leftContainer}>
                      <img
                        src={SendLandingIllustration}
                        alt={'landing-illustration'}
                        className={classes.landingIllustration}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xl={6} lg={6} md={6} className={classes.rightColumn}>
                  <Grid container direction='column' justify='center' alignItems='center'>
                    <Grid item className={classes.rightContainer}>
                      <Grid item className={classes.stepTitleContainer}>
                        <Typography className={classes.stepTitle}>
                          Send cryptocurrency directly to another person using email
                        </Typography>
                      </Grid>
                      <Grid item className={classes.step}>
                        <Grid container direction='row'>
                          <Avatar className={classes.stepIcon}> 1 </Avatar>
                          <Typography align='left' className={classes.stepText}>
                            Connect to your wallet
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item className={classes.step}>
                        <Grid container direction='row'>
                          <Avatar className={classes.stepIcon}> 2 </Avatar>
                          <Typography align='left' className={classes.stepText}>
                            Set the amount, recipient email and security answer
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item className={classes.step}>
                        <Grid container direction='row'>
                          <Avatar className={classes.stepIcon}> 3 </Avatar>
                          <Typography align='left' className={classes.stepText}>
                            Review and transfer
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item align='center'>
                        <GoogleLogin
                          className={classes.loginBtn}
                          theme='dark'
                          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                          scope={process.env.REACT_APP_GOOGLE_API_SCOPE}
                          discoveryDocs={process.env.REACT_APP_GOOGLE_API_DISCOVERY_DOCS}
                          onSuccess={this.loginSuccess}
                          onFailure={this.loginFailure}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Lower section (TODO) */}
        </Grid>
      </Grid>
    )
  }
}

const styles = theme => ({
  subComponent: {
    width: '100%',
    maxWidth: '680px',
    margin: '0px 0px 16px 0px'
  },
  leftContainer: {
    margin: '60px',
    maxWidth: '600px'
  },
  rightContainer: {
    margin: '60px'
  },
  landingIllustration: {
    maxWidth: '100%',
    marginBottom: '60px'
  },
  stepContainer: {
    padding: '30px'
  },
  stepTitleContainer: {
    marginBottom: '30px'
  },
  step: {
    marginBottom: '22px'
  },
  stepTitle: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  stepText: {
    color: '#333333',
    fontSize: '18px'
  },
  stepIcon: {
    height: '34px',
    width: '34px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #4285F4',
    color: theme.palette.primary.main,
    marginRight: '9.5px'
  },
  title: {
    color: '#333333',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '36px',
    letterSpacing: '0.97px',
    padding: '0px 0px 0px 0px'
  },
  transferId: {
    color: '#777777',
    fontSize: '12px',
    lineHeight: '17px'
  },
  btnSection: {
    marginTop: '60px'
  },
  helperTextSection: {
    marginTop: '20px'
  },
  recentTxTitle: {
    color: '#333333',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '30px'
  },
  recentTransferItemTransferAmount: {
    marginRight: '30px'
  },
  checkCircleIcon: {
    color: '#0CCD70',
    fontSize: '40px'
  },
  sendIcon: {
    fontSize: '40px'
  },
  notInterestedIcon: {
    color: '#a8aaac',
    fontSize: '40px'
  },
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  heading: {
    marginTop: '42px',
    height: '43px',
    width: '100%',
    color: '#333333',
    fontSize: '32px',
    fontWeight: 'bold',
    letterSpacing: '0.56px',
    lineHeight: '43px'
  },
  content: {
    marginTop: '20px',
    width: '90vw',
    maxWidth: '640px',
    color: '#666666',
    fontSize: '18px',
    letterSpacing: '0.32px',
    lineHeight: '24px'
  },
  loginBtn: {
    width: '60%',
    margin: '60px'
  }
})

export default withStyles(styles)(LoginComponent)