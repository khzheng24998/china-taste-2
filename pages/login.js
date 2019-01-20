import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";
import Field from "../components/Field.js";
import Link from 'next/link';
import {post, getCookie} from "../functions.js";
import {boxStyles, boxHeaderStyles, boxFooterStyles, columnStyles, dividerStyles, bold, linkStyles, buttonStyles, errorStyles} from "../styles.js";

class LoginBox extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      fields: {
        email: "",
        password: ""
      },
      error: {
        email: false,
        password: false
      },
      invalidCredentials: false
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

    //Send login request to server
    let res = await post("/log-in", {
      email: this.state.fields["email"],
      password: this.state.fields["password"]
    });

    if (res.msg !== "ok")
      this.setState({invalidCredentials: true});
    else
    {
      this.setState({invalidCredentials: false});
      location.reload();
    }
  }

	render()
	{
    return (<div style={boxStyles}>
      <style jsx>{` p {margin-top: 5px; margin-bottom: 5px; font-size: 14px;} `}</style>
      <div style={boxHeaderStyles}>User Login</div>
      <div>

        <div style={columnStyles}>
          <div style={{paddingTop: 10}}>
            {this.state.invalidCredentials && <div style={errorStyles}><p style={{color: "#ae3b1d"}}>Email/password provided is incorrect</p></div>}
            <Field id="email" error={this.state.error["email"]} value={this.state.fields["email"]} onChange={this.updateInputValue} />
            <Field type="password" id="password" error={this.state.error["password"]} value={this.state.fields["password"]} onChange={this.updateInputValue} />
            <Link href="/forgot-password"><p style={linkStyles}>Forgot password?</p></Link>
            <br />
          </div>
        </div>

        <div style={dividerStyles}></div>

        <div style={columnStyles}>
          <div style={{paddingTop: 10}}>
            <p style={bold}>Don't have an account?</p>
            <p style={{marginBottom: 15}}><Link href="/create-account"><span style={linkStyles}>Create one now.</span></Link> It's simple and free!</p>
            <p style={bold}>Creating an account allows you to:</p>
            <p><strong>&bull;</strong> Save order info for quick checkout</p>
            <p><strong>&bull;</strong> View all your past orders</p>
          </div>
        </div>

      </div>
      <div style={boxFooterStyles}><button style={buttonStyles} onClick={this.handleClick}>Sign In</button></div>
    </div>);
	}
}

class Login extends React.Component
{
  render()
  {
    return (<div>
      <style jsx global>{` body { margin: 0 } `}</style>
      <NavBar />
      <LoginBox />
      <Footer />
    </div>);
  }
}

export default Login;
