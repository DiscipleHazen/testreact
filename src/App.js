import logo from './logo.svg';
import './App.css';
import React from 'react';
import {legacy_createStore as createStore, combineReducers, applyMiddleWare} from 'redux';
import {Provider, useDispatch, useSelector, connect} from 'react-redux'

// Redux setup for managing messages
// Create a const for an action type called ADD
const ADD = "ADD";

// Create an action creator called addMessage that takes a message as an argument
// and returns an action with type ADD and the message as payload
const addMessage = (message) => {
  return {
    type: "ADD",
    message: message
  }
};

// Create a reducer called messageReducer that takes the current state and an action
// and returns the new state based on the action type
const messageReducer = (state = [], action) => {
  switch(action.type) {
    case "ADD":
      return [...state, action.message];
    default:
      return state;
  }
}

// Create a Redux store using the messageReducer
// This store will hold the state of messages
const store = createStore(messageReducer);


// A simple React component to display the current time
class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: Date() };

    this.updateTime = this.updateTime.bind(this);
  }

  updateTime() {
    this.setState({ time: Date() });
  }

  render() {
    setInterval(() => this.updateTime(), 1000);
    return (
      <div>
        <h2>Current Time</h2>
        <p>{this.state.time}</p>
      </div>
    )
  }
}


// Learning basic React state management
// This component will allow users to input messages and display them in a list
// Planning to use Redux in conjunction with this component in the future
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      /* remove messages from state and use Redux instead
      messages: [] */
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  // Add handleChange() and submitMessage() methods here
  handleChange(event) {
    this.setState({
      input: event.target.value,
      /* remove messages from state and use Redux instead
      messages: this.state.messages*/
    })
  };
  submitMessage() {
    this.setState({
      input: '',
      /* remove messages from state and use Redux instead
      messages: [...this.state.messages, this.state.input]*/
    });
    this.props.submitNewMessage(this.state.input);
  };
  render() {
    const items = this.props.messages.map(message => <li key={message}>{message}</li>);
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input value={this.state.input} onChange={this.handleChange} />
        <button onClick={this.submitMessage}>Add Message</button>
        <ul>
        {items}
        </ul>
      </div>
    );
  }
};


// React-Redux integration
// Create a mapStateToProps function that maps the state to props
// This function will be used to connect the Redux state to the component props
// It will return an object with messages as a property
const mapStateToProps = (state) => {
  return { messages: state }
};

// Create a mapDispatchToProps function that maps the dispatch to props
// This function will be used to connect the Redux dispatch to the component props
// It will return an object with a submitNewMessage function that dispatches the addMessage action
const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (newMessage) => {
       dispatch(addMessage(newMessage))
    }
  }
};

const ProviderWrapper = Provider;

// Define the Container component here:
const DisplayMessages = connect(mapStateToProps, mapDispatchToProps)(Presentational);


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ProviderWrapper store={store}>
          <Time />
          <DisplayMessages />
        </ProviderWrapper>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
    </div>
  );
}

export default App;
