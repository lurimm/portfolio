import React, { Component } from "react";
// import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import axios from 'axios'
import { weatherAPIKey, newsAPIKey } from './index'
import IdleTimer from 'react-idle-timer'

class App extends Component {
  constructor() {
    super();

    this.state = {
      output: '',
      input: '',
      lat: null,
      long: null,
      cityName: '',
      temp: null,
      weatherDescr: null,
      newsTitle: '',
      newsDesc: '',
      newsUrl: '',
    };
  }
  componentDidMount() {
    this.outputInstructions();
    this.getCurrentLocation();
    this.getNews();
  }

  getNews() {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsAPIKey}`)
    .then(res => {
      this.setState({
        newsTitle: res.data.articles[0].title,
        newsDesc: res.data.articles[0].description,
        newsUrl: res.data.articles[0].url,
      })
    })
    .catch(err => console.error(err))
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
    })
  }
  
  getWeather() {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&APPID=${weatherAPIKey}`)
    .then(res => {
      console.log(res.data)
      this.setState({
        temp: Math.floor(res.data.main.temp * 9 / 5 - 459.67),
        weatherDescr: res.data.weather[0].description,
        cityName: res.data.name,
      })
    })
    .catch(err => console.error(err))
    
  }

  typing(evt) {
    let input = evt.target.value;
    let audio = document.getElementById("beep");
    if (typeof input === "string") {
      audio.play();
    }
  }
  

  outputForWorkLinks(projects, work) {
    return projects.map((project, idx) => {
      return (
        <div className="about" key={idx}>
          <br />
          <a className="anchor" target="_blank" href={work[project]}>
            {project}
          </a>
          <br />
        </div>
      );
    });
  }

  mainOutput() {
    let aboutInput = ['about', 'who are you', 'hi', 'hello']
    if (aboutInput.includes(this.state.input)) {
        return (
          <div className="about">
            <p>Hi,</p>
            <br />
            <p>I'm a full stack developer</p>
            <p>specializing in javascript and</p>
            <p>making turkey sandwiches.</p>
            <br />
          </div>
        )
    } else if (this.state.input === 'weather') {
      return this.outputForWeather()
    } else if (this.state.input === 'latest news') {
      return this.outputForNews();
    } else {
      return this.outputInstructions();
    }
  }

  outputForWeather() {
    return (
      <div className="about">
        <p>Hi,</p>
        <br/>
        <p>It is {this.state.temp} degrees Farenheit</p>
        <p>and a {this.state.weatherDescr} kind of</p>
        day in {this.state.cityName}.
        <br />
      </div>
    )
  }

  outputForNews() {
    return (
      <div className="about-news">
        <p >News:</p>
        <a className="anchor-news" target="_blank" href={this.state.newsUrl}>
          {this.state.newsTitle}   
        </a>
        <p>{this.state.newsDesc}</p>
      </div>
    )
  }

  outputInstructions() {
    return (
      <div>
        <p className="about-title">List of Commands:</p>
        <p className="about">About</p>
        <p className="about">Projects</p>
        <p className="about">Links</p>
        <p className="about">Weather</p>
        <p className="about">Latest News</p>
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
    let workInput = ['work', 'projects']
    let aboutInput = ['about', 'who are you', 'hi', 'hello']
    if (workInput.includes(input)) {
      this.setState({
        output: {
          "The Listening Room": "http://symbalplayer.firebaseapp.com",
          MapStack: "http://github.com/FSACapstone/MapIt",
          SUPERmarket: "http://sup3r-market.herokuapp.com"
        },
        input
      });
      evt.target.inputval.value = "";
      this.outputAudio();
      return this.outputForWorkLinks(projects, work);
    } else if (input === "links") {
      this.setState({
        output: {
          Github: "https://github.com/lurimm",
          Medium: "https://medium.com/@luismiguelrincon",
          Instagram: "https://www.instagram.com/lurimm/",
          Photography: "http://luis-rincon.com",
          YouTube: "https://www.youtube.com/channel/UCA2LI0774ZPTjxB-X-3mjSg?view_as=subscriber",
        },
        input
      });
      evt.target.inputval.value = "";
      this.outputAudio();
      return this.outputForWorkLinks(projects, work);
    } else if (aboutInput.includes(input)) {
      this.setState({ output: "", input });
      evt.target.inputval.value = "";
      this.outputAudio();
      return this.mainOutput();
    } else if (input === 'weather') {
      this.setState({output: "", input})
      evt.target.inputval.value = "";
      this.outputAudio()
      return this.mainOutput()
    } else if (input === 'latest news') {
      this.setState({output: '', input})
      evt.target.inputval.value = "";
      this.outputAudio()
      return this.mainOutput()
    } else {
      this.setState({ output: "", input });
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
                  ? this.mainOutput()
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
