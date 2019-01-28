import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";
import Field from "../components/Field.js";
import Link from 'next/link';
import {post} from "../functions.js";
import {boxStyles, boxHeaderStyles, boxFooterStyles, columnStyles, dividerStyles, bold, linkStyles, buttonStyles, errorStyles} from "../styles.js";

class CreateAccountBox extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      fields: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      error: {
        firstName: false,
        lastName: false,
        phoneNumber: false,
        email: false,
        password: false,
        confirmPassword: false
      },
      passwordMsg: "Required field",
      confirmPasswordMsg: "Required field"
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.meetsRequirements = this.meetsRequirements.bind(this);
  }

  updateInputValue(e)
  {
    let update = {};
    update.fields = this.state.fields;
    update.fields[e.target.id] = e.target.value;
    update.error = this.state.error;
    update.error[e.target.id] = false;
    this.setState(update);
  }

  async handleClick()
  {
    //Check to see if fields are non-empty
    let error = false;
    let update = {};
    update.error = this.state.error;
    for (const key in this.state.fields)
      if (this.state.fields.hasOwnProperty(key) && this.state.fields[key].length === 0)
      {
        if (key === "password")
          update.passwordMsg = "Required field";
        if (key === "confirmPassword")
          update.confirmPasswordMsg = "Required field";

        update.error[key] = true;
        error = true;
      }

    let password = this.state.fields["password"];
    let confirmation = this.state.fields["confirmPassword"];
    if (password.length > 0 && confirmation.length > 0 && password !== confirmation)
    {
      update.confirmPasswordMsg = "Does not match password";
      update.error["confirmPassword"] = true;
      error = true;
    }

    if (password.length > 0 && !this.meetsRequirements(password))
    {
      update.passwordMsg = "Password does not meet requirements";
      update.error["password"] = true;
      error = true;
    }

    this.setState(update);
    if (error)
      return;

    //Send create account request to server
    let res = await post("/create-account", {
      firstName: this.state.fields["firstName"],
      lastName: this.state.fields["lastName"],
      email: this.state.fields["email"],
      phoneNumber: this.state.fields["phoneNumber"],
      password: this.state.fields["password"],
      confirmPassword: this.state.fields["confirmPassword"]
    });

    if (res.msg !== "ok")
      alert("An account under this email already exists!");
    else
      location.reload();
  }

  meetsRequirements(password)
  {
    let letters = password.match(/[A-Za-z]/g);
  	let numbers = password.match(/[0-9]/g);

  	if (password.length < 8 || letters === null || numbers === null)
  		return false;

    return true;
  }

  render()
  {
    return(<div style={boxStyles}>
      <style jsx>{` p {margin-top: 5px; margin-bottom: 5px; font-size: 14px;} `}</style>
      <div style={boxHeaderStyles}>Create your account</div>
      <div>

        <div style={{paddingTop: 5, paddingBottom: 5}}>
          <div style={columnStyles}>
            <Field id="firstName" error={this.state.error["firstName"]} value={this.state.fields["firstName"]} onChange={this.updateInputValue} />
          </div>
          <div style={columnStyles}>
            <Field id="lastName" error={this.state.error["lastName"]} value={this.state.fields["lastName"]} onChange={this.updateInputValue} />
          </div>
        </div>

        <div style={{paddingLeft: 20, paddingBottom: 5}}>
          <Field width={548} id="phoneNumber" error={this.state.error["phoneNumber"]} value={this.state.fields["phoneNumber"]} onChange={this.updateInputValue} />
        </div>

        <div style={{paddingLeft: 20, paddingBottom: 5}}>
          <Field width={548} id="email" error={this.state.error["email"]} value={this.state.fields["email"]} onChange={this.updateInputValue} />
        </div>

        <div style={{paddingBottom: 25}}>
          <div style={columnStyles}>
            <p style={{fontWeight: 450, fontSize: 16, margin: "5px 0px 5px 0px"}}>Password</p>
            <input id="password" type="password" style={{width: 240, height: 22, fontSize: 14}} value={this.state.fields["password"]} onChange={this.updateInputValue}></input>
            {this.state.error["password"] && <p style={{color: "red", fontSize: 14, margin: 0}}>{this.state.passwordMsg}</p>}
          </div>
          <div style={columnStyles}>
            <p style={{fontWeight: 450, fontSize: 16, margin: "5px 0px 5px 0px"}}>Confirm Password</p>
            <input id="confirmPassword" type="password" style={{width: 240, height: 22, fontSize: 14}} value={this.state.fields["confirmPassword"]} onChange={this.updateInputValue}></input>
            {this.state.error["confirmPassword"] && <p style={{color: "red", fontSize: 14, margin: 0}}>{this.state.confirmPasswordMsg}</p>}
          </div>
        </div>

      </div>
      <div style={boxFooterStyles}><button style={buttonStyles} onClick={this.handleClick}>Create Account</button></div>
    </div>);
  }
}

class CreateAccount extends React.Component
{
  render()
  {
    return (<div>
      <style jsx global>{` body { margin: 0 } `}</style>
      <NavBar />
      <CreateAccountBox />
      <Footer />
    </div>);
  }
}

export default CreateAccount;
