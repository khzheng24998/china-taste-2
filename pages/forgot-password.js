import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";
import Field from "../components/Field.js";
import {post} from "../functions.js";
import {boxStyles, boxHeaderStyles, boxFooterStyles, columnStyles, dividerStyles, bold, linkStyles, buttonStyles, errorStyles} from "../styles.js";

class ForgotPasswordBox extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      fields: {
        email: ""
      },
      error: {
        email: false
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

  async handleClick()
  {
    //Check to see if fields are non-empty
    let error = false;
    let update = this.state.error;
    for (const key in this.state.fields)
      if (this.state.fields.hasOwnProperty(key) && this.state.fields[key].length === 0)
      {
        update[key] = true;
        error = true;
      }

    this.setState({error: update});
    if (error)
      return;
  }

  render()
  {
    return (<div style={boxStyles}>
      <style jsx>{` p {margin-top: 5px; margin-bottom: 5px; font-size: 14px;} `}</style>
      <div style={boxHeaderStyles}>Forgot password</div>
      <div style={{padding: "8px 15px 18px 15px"}}>
        <p>Please enter the email address associated with your account below and instructions on how to reset your password will be sent to you.</p>
        <Field id="email" width={400} error={this.state.error["email"]} value={this.state.fields["email"]} onChange={this.updateInputValue} />
      </div>
      <div style={boxFooterStyles}><button style={buttonStyles} onClick={this.handleClick}>Submit</button></div>
    </div>);
  }
}

class ForgotPassword extends React.Component
{
  render()
  {
    return (<div>
      <style jsx global>{` body { margin: 0 } `}</style>
      <NavBar />
      <ForgotPasswordBox />
      <Footer />
    </div>);
  }
}

export default ForgotPassword;
