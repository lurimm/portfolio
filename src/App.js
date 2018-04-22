import React, { Component } from "react";
// import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import axios from 'axios'
import { weatherAPIKey } from './index'

class App extends Component {
  constructor() {
    super();

    this.state = {
      output: '',
      about: null,
      weather: null,
      lat: null,
      long: null,
      temp: null,
      weatherDescr: null,
    };
  }

  componentDidMount() {
    this.outputInstructions();
    this.getCurrentLocation();
  }

  getWeather() {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&APPID=${weatherAPIKey}`)
    .then(res => {
      console.log(res.data)
      this.setState({
        temp: Math.floor(res.data.main.temp * 9 / 5 - 459.67),
        weatherDescr: res.data.weather[0].description,
      })
    })
    console.log(this.state)
  }

  typing(evt) {
    let input = evt.target.value;
    let audio = document.getElementById("beep");
    if (typeof input === "string") {
      audio.play();
    }
  }
  
  getCurrentLocation() {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0, 
    }
    navigator.geolocation.getCurrentPosition((position, error, options) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      this.setState({
        lat, long
      })
      this.getWeather()
      console.log(this.state)
    })
  }

  outputForWorkLinks(projects, work) {
    return projects.map((project, idx) => {
      return (
        <div key={idx}>
          <br />
          <a className="anchor" target="_blank" href={work[project]}>
            {project}
          </a>
          <br />
        </div>
      );
    });
  }

// weather, latest news, use thes API'S

  mainOutput(about) {
    if (this.state.about === true) {
      return (
        <div>
          <p className="about">Hi,</p>
          <br />
          <p className="about">I'm a full stack developer</p>
          <p className="about">specializing in javascript and</p>
          <p className="about">making turkey sandwiches.</p>
          <br />
        </div>
      );
    } else if (this.state.weather === true) {
      console.log(this.state)
      return this.outputForWeather()
    } else {
      return this.outputInstructions();
    }
  }

  outputForWeather() {
    return (
      <div>
        <p className="about">Hi,</p>
        <br />
        <p className="about">It is {this.state.temp} degrees Farenheit</p>
        <p className="about">and a {this.state.weatherDescr} kind of day.</p>
        <br />
      </div>
    )
  }

  outputInstructions() {
    return (
      <div>
        <p className="about-title">Commands:</p>
        <p className="about">About</p>
        <p className="about">Projects</p>
        <p className="about">Links</p>
        <p className="about">Weather</p>
        <br />
      </div>
    )
  }

  outputAudio() {
    let audio = document.getElementById("data");
    audio.play();
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const projects = Object.keys(this.state.output) || this.state.output;
    const work = this.state.output;
    let input = evt.target.inputval.value;
    if (input === "work" || input === "projects") {
      this.setState({
        output: {
          "The Listening Room": "http://symbalplayer.firebaseapp.com",
          MapStack: "http://github.com/FSACapstone/MapIt",
          SUPERmarket: "http://sup3r-market.herokuapp.com"
        }
      });
      evt.target.inputval.value = "";
      this.outputAudio();
      return this.outputForWorkLinks(projects, work);
    } else if (input === "links") {
      this.setState({
        output: {
          Github: "https://github.com/lurimm",
          Instagram: "https://www.instagram.com/lurimm/",
          Photography: "http://luis-rincon.com"
        }
      });
      evt.target.inputval.value = "";
      this.outputAudio();
      return this.outputForWorkLinks(projects, work);
    } else if (
      input === "about" ||
      input === "who are you" ||
      input === "hi" ||
      input === "hello"
    ) {
      this.setState({ output: "", about: true });
      evt.target.inputval.value = "";
      this.outputAudio();
      return this.mainOutput();
    } else if (input === 'weather') {
      this.setState({weather: true})
      this.outputAudio()
      this.mainOutput()
    } else {
      this.setState({ output: "", about: false });
      evt.target.inputval.value = "";
      this.outputAudio();
      return this.mainOutput();
    }
  }

  render() {
    const projects = Object.keys(this.state.output) || this.state.output;
    const work = this.state.output;
    let about;
    return (
      <div className="App">
        <h1 className="white luis">// LUIS RINCON //</h1>
        <div className="panels">
          <div className="input-panel">
            <p className="white">INPUT</p>
            <form onSubmit={evt => this.handleSubmit(evt)}>
              <input
                onChange={this.typing}
                className="input-box"
                name="inputval"
              />
              <button type="submit" className="white">
                | SUBMIT |
              </button>
            </form>
            <audio
              id="beep"
              src="https://firebasestorage.googleapis.com/v0/b/symbalplayer.appspot.com/o/music%2Fbeep.wav?alt=media&token=e076788f-03ae-433c-98cf-d977b1d38f80"
            />
            <audio
              id="data"
              src="https://firebasestorage.googleapis.com/v0/b/symbalplayer.appspot.com/o/music%2Fdata_1.mp3?alt=media&token=534f968d-a663-4b3a-9282-5061ac52acdb"
            />
          </div>

          <div className="output-panel">
            <p className="white">OUTPUT</p>
            <div className="output-box">
              {typeof work === "string"
                ? this.mainOutput(about)
                : this.outputForWorkLinks(projects, work)}
            </div>
            <p>hi</p>
          </div>
        </div>
        <div className="footer white">+</div>
      </div>
    );
  }
}

export default App;
