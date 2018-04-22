import React, { Component } from "react";
// import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import ReactAudioPlayer from "react-audio-player";

class App extends Component {
  constructor() {
    super();

    this.state = {
      output: "",
      about: null
    };
  }

  componentDidMount() {
    this.outputInstructions();
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

  outputForAboutMe(about) {
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
    } else {
      return this.outputInstructions();
    }
  }

  outputInstructions() {
    return (
      <div>
        <p className="about-title">Commands:</p>
        <br />
        <p className="about">About</p>
        <p className="about">Projects</p>
        <p className="about">Links</p>
        <br />
      </div>
    );
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
      return this.outputForAboutMe();
    } else {
      this.setState({ output: "", about: false });
      evt.target.inputval.value = "";
      this.outputAudio();
      return this.outputForAboutMe();
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
                ? this.outputForAboutMe(about)
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
