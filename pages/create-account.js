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
      }
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick()
  {
    //Check to see if fields are non-empty
    let update = this.state.error;
    for (const key in this.state.fields)
      if (this.state.fields.hasOwnProperty(key) && this.state.fields[key].length === 0)
        update[key] = true;

    this.setState({error: update});
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
            <Field type="password" id="password" error={this.state.error["password"]} value={this.state.fields["password"]} onChange={this.updateInputValue} />
          </div>
          <div style={columnStyles}>
            <Field type="password" id="confirmPassword" error={this.state.error["confirmPassword"]} value={this.state.fields["confirmPassword"]} onChange={this.updateInputValue} />
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
