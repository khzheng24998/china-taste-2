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
  padding: "3px 0px 5px 5px"
};

const boxFooterStyles = {
  backgroundColor: "#f1f1f1",
  borderTop: "solid 2px #e6e6e6",
  fontSize: 20,
  fontWeight: 500,
  padding: "5px 0px 8px 8px"
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

const buttonStyles = {
  color: "white",
  backgroundColor: "#28a745",
  border: "solid 1px #23903c",
  borderRadius: 3,
  fontSize: 16,
  padding: "5px 8px 5px 8px",
  cursor: "pointer"
}

class Box1 extends React.Component
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
    return (<div style={boxStyles}>
      <style jsx>{` p {margin-top: 5px; margin-bottom: 5px; font-size: 14px;} `}</style>
      <div style={boxHeaderStyles}>User Login</div>
      <div>

        <div style={columnStyles}>
          <div style={{paddingTop: 10}}>
            <Field id="email" error={this.state.error["email"]} value={this.state.fields["email"]} onChange={this.updateInputValue} />
            <Field type="password" id="password" error={this.state.error["password"]} value={this.state.fields["password"]} onChange={this.updateInputValue} />
            <p style={linkStyles}>Forgot password?</p>
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

class Box2 extends React.Component
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

export {Box1, Box2};
