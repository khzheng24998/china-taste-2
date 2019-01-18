import Link from 'next/link';
import Field from "../components/Field.js";

const boxStyles = {
  border: "solid 2px #e6e6e6",
  borderRadius: 4,
  width: 640,
  margin: "0 auto",
  marginTop: 80,
	fontFamily: "Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
};

const boxHeaderStyles = {
  backgroundColor: "#f1f1f1",
  borderBottom: "solid 2px #e6e6e6",
  fontSize: 20,
  fontWeight: 500,
  paddingTop: 3,
  paddingBottom: 5,
  paddingLeft: 5
};

const boxFooterStyles = {
  backgroundColor: "#f1f1f1",
  borderTop: "solid 2px #e6e6e6",
  fontSize: 20,
  fontWeight: 500,
  paddingTop: 5,
  paddingBottom: 8,
  paddingLeft: 8
};

const columnStyles = {
  display: "inline-block",
  width: "45%",
  verticalAlign: "top",
  paddingLeft: 20
};

const dividerStyles = {
  display: "inline-block",
  width: "3%",
  borderLeft: "solid 2px #e6e6e6",
  height: 160,
  marginTop: 15,
  marginBottom: 15
}

const bold = {
  fontWeight: 450,
  fontSize: 16
};

const linkStyles = {
  color: "#007bff",
  cursor: "pointer"
}

class Box1 extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {
        email: false,
        password: false
      }
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  updateInputValue(e)
  {
    let update = {};
    update[e.target.id] = e.target.value;
    update.error = this.state.error;
    update.error[e.target.id] = false;
    this.setState(update);
  }

  handleClick()
  {
    let update = this.state.error;

    if (this.state.email.length === 0)
      update.email = true;
    if (this.state.password.length === 0)
      update.password = true;

    this.setState({error: update});
  }

	render()
	{
    return (<div style={boxStyles}>
      <style jsx>{` p {margin-top: 5px; margin-bottom: 5px; font-size: 14px;} `}</style>
      <div style={boxHeaderStyles}>User Login</div>
      <div>
        <div style={columnStyles}>

          <Field id="email" error={this.state.error["email"]} value={this.state.email} onChange={this.updateInputValue} />
          <Field type="password" id="password" error={this.state.error["password"]} value={this.state.password} onChange={this.updateInputValue} />
          <p style={linkStyles}>Forgot password?</p>
        </div>

        <div style={dividerStyles}></div>

        <div style={columnStyles}>
          <p style={bold}>Don't have an account?</p>
          <p style={{marginBottom: 15}}><Link href="/create-account"><span style={linkStyles}>Create one now.</span></Link> It's simple and free!</p>
          <p style={bold}>Creating an account allows you to:</p>
          <p><strong>&bull;</strong> Save order info for quick checkout</p>
          <p><strong>&bull;</strong> View all your past orders</p>
        </div>
      </div>
      <div style={boxFooterStyles}><button style={{fontSize: 16, padding: 3, cursor: "pointer"}} onClick={this.handleClick}>Sign In</button></div>
    </div>);
	}
}

class Box2 extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {
        email: false,
        password: false
      }
    };

    this.updateInputValue = this.updateInputValue.bind(this);
  }

  updateInputValue(e)
  {
    let update = {};
    update[e.target.id] = e.target.value;
    update.error = this.state.error;
    update.error[e.target.id] = false;
    this.setState(update);
  }

  render()
  {
    return(<div style={boxStyles}>
      <style jsx>{` p {margin-top: 5px; margin-bottom: 5px; font-size: 14px;} `}</style>
      <div style={boxHeaderStyles}>Create your account</div>
      <div>
        <div style={columnStyles}>
          <Field id="firstName" error={this.state.error["email"]} value={this.state.email} onChange={this.updateInputValue} />
        </div>
        <div style={columnStyles}>
          <Field id="lastName" error={this.state.error["email"]} value={this.state.email} onChange={this.updateInputValue} />
        </div>

        <div style={{paddingLeft: 20}}>
          <Field width={548} id="phoneNumber" error={this.state.error["email"]} value={this.state.email} onChange={this.updateInputValue} />
          <Field width={548} id="email" error={this.state.error["email"]} value={this.state.email} onChange={this.updateInputValue} />
        </div>

        <div style={columnStyles}>
          <Field type="password" id="password" error={this.state.error["email"]} value={this.state.email} onChange={this.updateInputValue} />
        </div>
        <div style={columnStyles}>
          <Field type="password" id="confirmPassword" error={this.state.error["email"]} value={this.state.email} onChange={this.updateInputValue} />
        </div>

      </div>
      <div style={boxFooterStyles}><button style={{fontSize: 16, padding: 3, cursor: "pointer"}}>Create Account</button></div>
    </div>);
  }
}

export {Box1, Box2};
