import React, { Component } from "react";
import DisplayCooperResult from "./components/DisplayCooperResult";
import DisplayPerformanceData from "./components/DisplayPerformanceData";
import InputFields from "./components/InputFields";
import LoginForm from "./components/LoginForm";
import { authenticate } from './modules/auth';
import { Message, Header, Container, Grid, Image, Segment, Button } from 'semantic-ui-react'


class App extends Component {
  state = {
    distance: "",
    gender: "female",
    age: "",
    renderLoginForm: false,
    authenticated: false,
    message: "",
    entrySaved: false,
    renderIndex: false
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value, entrySaved: false });
  };

  onLogin = async e => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  render() {
    const { renderLoginForm, authenticated, message } = this.state;
    let renderLogin;
    let performanceDataIndex
    switch(true) {
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case !renderLoginForm && !authenticated:
        renderLogin = (
          <>
            <Button
              id="login"
              onClick={() => this.setState({ renderLoginForm: true })}
              color="google plus"
            >
              Login
            </Button>
            <p id="message">{message}</p>
          </>
        );
        break;
      case authenticated:
        renderLogin = (
          <Message
            id="message"
            header='Hi'
            positive={true}
            floating={true}
            content={JSON.parse(sessionStorage.getItem("credentials")).uid}
          />
          // <p id="message">Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}</p>
        );
        
        
        if (this.state.renderIndex) {
          performanceDataIndex = (
            <>
              <DisplayPerformanceData
                updateIndex={this.state.updateIndex}
                indexUpdated={() => this.setState({ updateIndex: false })}
              />
              <Button color="black" onClick={() => this.setState({ renderIndex: false })}>Hide past entries</Button>
            </>
          )
        } else {
          performanceDataIndex = (
            <Button color="black" id="show-index" onClick={() => this.setState({ renderIndex: true })}>Show past entries</Button>
          )
        }
        break;
        default:
          break;
    }

    return (
      <>
        <Container>
          <Header id='main-header' className='centered' as='h2'>Cooper Test Tracker</Header>
          <p className='centered'> 
            Below there are some references by <a target='_blank' rel="noopener noreferrer" href="https://bijlmakers.com/cooper-test/">Bijlmakers</a>
          </p>
          <p className='centered'>
            This Cooper Test table gives an indication of your physical fitness, which depends on your sex and age, and the distance covered in 12 minutes.
          </p>
        
        
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Image src='https://i0.wp.com/bijlmakers.com/wp-content/uploads/2012/12/cooper-test-graph-males.gif?resize=478%2C337&ssl=1' />
              </Grid.Column>
              <Grid.Column width={8}>
                <Image src='https://i1.wp.com/bijlmakers.com/wp-content/uploads/2012/12/cooper-test-graph-females.gif?resize=478%2C337&ssl=1' />
              </Grid.Column>
            </Grid.Row>
            <br/>
            <Grid.Row>
              <Grid.Column >
                <Header className="centered" as='h2'>Go ahead and calculate your result!</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        <Container>
          
          <InputFields onChangeHandler={this.onChangeHandler} />
          
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <DisplayCooperResult
                  distance={this.state.distance}
                  gender={this.state.gender}
                  age={this.state.age}
                  authenticated={this.state.authenticated}
                  entrySaved={this.state.entrySaved}
                  entryHandler={() => this.setState({ entrySaved: true, updateIndex: true })}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Segment>
                  <h3>Login to save your entry and keep track of your progress</h3>
                  <Message negative>
                    <p>App under development, please use this credentials: </p>
                    <p>user@mail.com -- Password: password</p>
                  </Message>
                  {renderLogin}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Segment >
            Past Entries - (Must be logged in)
            <br/>
            {performanceDataIndex}
          </Segment>
          <br/>
          
        </Container>
      </>
    );
  }
}

export default App;