import React from "react";

class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: ""
        }
    }

    onEmailChange = (event) => {
        this.setState({
            signInEmail: event.target.value
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            signInPassword: event.target.value
        })
    }

    onSubmit = () => {        
        const { onRouteChange , onChangeUser , onSigninStatusChange } = this.props;
        fetch("https://quiet-earth-49424.herokuapp.com/signin", {
            headers: {"Content-Type": "application/json"},
            method: "post",
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword            
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success"){
                onChangeUser(data.user,"signin");
                onSigninStatusChange();
                onRouteChange("home");                
            } else {                
                onSigninStatusChange(data.status);
            }
        })
    }
    

    render(){
        return (
            <div className="black-80 center mt6">
                <div className="measure shadow-5 br3 pa5 ma3">
                    <fieldset id="sign_up" className=" center ba b--transparent ph0 mh0">
                        <legend className="center f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-white-60 hover-white w-100" 
                                type="email" 
                                name="email-address"
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-white-60 hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"                                 
                                onChange={this.onPasswordChange}
                            />
                        </div>                
                    </fieldset>
                    <div className="">
                        <input 
                            className="center b ph3 pv2 input-reset ba b--black bg-transparent grow hover-white-70 pointer f6 dib" 
                            type="submit" 
                            value="Sign in"
                            onClick={this.onSubmit}
                            />
                    </div>
                    <div className="lh-copy mt3">
                        <p 
                            className="pointer center f6 link dim black db"
                            onClick={() => this.props.onRouteChange("register")}
                        >
                            Register
                        </p>
                    <div className="center white">{this.props.errorSignin}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signin;