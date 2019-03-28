import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from "../components/Navigation/Navigation"
import Logo from "../components/Logo/Logo"
import FaceDetect from "../components/FaceDetect/FaceDetect"
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm"
import Rank from "../components/Rank/Rank"
import "./App.css"
import Signin from '../components/Signin/Signin';
import Register from '../components/Signin/Register';

const ParticleOptions = {
  particles: {
    number: {
      value: 100,
      density :{
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      errorRegister : "",
      errorSignin : "",
      input: "",
      imageUrl: "",
      boxes: [],
      currentRank: 0,
      route: "signin",
      user : {
        id: '',
        name: '',
        email: '',        
        history: [],
        joined: ''
      }
    }
  }

  onChangeUser = (data,type) => {
    if (type === "register" || type === "signin"){
      this.setState({
        input: "",
        imageUrl: "",
        boxes: [],
        currentRank: 0,
        user: {
          id: data.id,
          name: data.name,
          email: data.email,          
          joined: data.joined
        }
      })
    } else if (type === "home"){
      this.setState({
        user: {
          id: data.id,
          name: data.name,
          email: data.email,          
          joined: data.joined
        }
      })
    }
    
  }

  onRouteChange = (route) => {
    this.setState({
      route: route
    });
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  displayFaceBox = (boxes) => {
    this.setState({
      boxes: boxes,
      currentRank: boxes.length
    });
  }

  calculateFaceBox = (response) => {  
    const boxes = response.outputs[0].data.regions.map(region => {
      return region.region_info.bounding_box;
    })    
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);    
    return boxes.map(box => {
      return {
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol : width - (box.right_col * width),
        bottomRow: height - (box.bottom_row * height),
      }
    })
  }

  onButtonSubmit = () => {
    const { input } = this.state;
    this.setState({
      imageUrl: input
    });
    
    fetch("https://quiet-earth-49424.herokuapp.com/faceApi", {
      headers: {"Content-Type": "application/json"},
      method: "post",
      body: JSON.stringify({
          input: this.state.input              
      })
    })
    .then(res => res.json())
    .then(res => {
      if ( res.status === "success"){
        this.displayFaceBox(this.calculateFaceBox(res.data))
      } else {
        alert(res.status)
      }
    })
    .then(() => {
      fetch("https://quiet-earth-49424.herokuapp.com/rank", {
        headers: {"Content-Type": "application/json"},
        method: "post",
        body: JSON.stringify({
            email: this.state.user.email,
            rank: this.state.currentRank,
            imageUrl: this.state.imageUrl
        })
      })
      .then(res => res.json())
      .then(data => {
          if (data.status === "success"){
              this.onChangeUser(data.user,"home");
          } else {
              alert(data.status)
          }
      })
    })
    .catch(err => console.log(err))
  }

  onSigninStatusChange = (status="") => {    
    this.setState({
      errorSignin : status
    })
  }

  onRegisterStatusChange = (status="") => {    
    this.setState({
      errorRegister : status
    })
  }

  render() {
    const { 
      currentRank, 
      user, 
      boxes, 
      imageUrl , 
      route , 
      errorSignin , 
      errorRegister } = this.state;
    const particles = <Particles
                          className="particles"
                          params={ParticleOptions}               
                      />
    switch ( route ){
      case "home":
        return (
          <div>
            {particles}
            <Navigation onRouteChange={this.onRouteChange}/>
            <Logo />        
            <Rank currentRank={currentRank} user={user}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceDetect imageUrl={imageUrl} boxes={boxes}/>
          </div>
        )
      case "signin":
        return (
          <div>
            {particles}
            <Signin 
              onRouteChange={this.onRouteChange}
              onChangeUser= {this.onChangeUser}
              errorSignin={errorSignin}
              onSigninStatusChange={this.onSigninStatusChange}
            />
          </div>
        )
      case "register":
        return (
          <div>
            {particles}
            <Register 
              onRouteChange={this.onRouteChange}
              onChangeUser={this.onChangeUser}
              errorRegister={errorRegister}
              onRegisterStatusChange={this.onRegisterStatusChange}
              />
          </div>
        )
      default:
          return ;
    }    
  }
}

export default App;