import React from "react";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registeredName: "",
            registeredEmail: "",
            registeredPassword: ""
        }
    }
    onEmailChange = (event) => {
        this.setState({
            registeredEmail: event.target.value
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            registeredPassword: event.target.value
        })
    }

    onNameChange = (event) => {
        this.setState({
            registeredName: event.target.value
        })
    }

    onSubmit = () => {
        const { registeredEmail, registeredName, registeredPassword } = this.state;
        const { onRouteChange , onChangeUser , onRegisterStatusChange } = this.props;

        fetch("https://quiet-earth-49424.herokuapp.com/register", {
            headers: {"Content-Type": "application/json"},
            method: "post",
            body: JSON.stringify({
                email: registeredEmail,
                password: registeredPassword,
                name: registeredName
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success"){
                onChangeUser(data.user,"register");
                onRegisterStatusChange()
                onRouteChange("home");
            } else {
                onRegisterStatusChange(data.status)
            }
        })
    }

    render () {    
        return (
            <div className="black-80 center mt6">
                <div className="measure shadow-5 br3 pa5 ma3">
                    <fieldset id="sign_up" className=" center ba b--transparent ph0 mh0">
                        <legend className="center f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-white-60 hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={this.onNameChange}
                            />
                        </div>
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
                            className="center b ph3 pv2 input-reset hover-white-70 ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" 
                            onClick={this.onSubmit}
                        />
                    </div>
                    <p className="center white"> {this.props.errorRegister }</p>
                </div>
            </div>
        );
    }
}

export default Register;