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
  paddingLeft: 20,
  paddingTop: 10,
  paddingBottom: 15
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

const inputStyles = {
  fontSize: 22,
  width: 240
}

const linkStyles = {
  color: "#007bff",
  cursor: "pointer"
}

class Box1 extends React.Component {

	render()
	{
    return (<div style={boxStyles}>
      <style jsx>{` p {margin-top: 5px; margin-bottom: 5px; font-size: 14px;} `}</style>
      <div style={boxHeaderStyles}>User Login</div>
      <div>
        <div style={columnStyles}>
          <p style={bold}>Email</p>
          <input type="text" style={inputStyles}></input><br />
          <p style={bold}>Password</p>
          <input type="text" style={inputStyles}></input><br />
          <p style={linkStyles}>Forgot password?</p>
        </div>

        <div style={dividerStyles}></div>

        <div style={columnStyles}>
          <p style={bold}>Don't have an account?</p>
          <p style={{marginBottom: 15}}><span style={linkStyles}>Create one now.</span> It's simple and free!</p>
          <p style={bold}>Creating an account allows you to:</p>
          <p><strong>&bull;</strong> Save order info for quick checkout</p>
          <p><strong>&bull;</strong> View all your past orders</p>
        </div>
      </div>
      <div style={boxFooterStyles}><button style={{fontSize: 16, padding: 3, cursor: "pointer"}}>Sign In</button></div>
    </div>);
	}
}

export default Box1;
