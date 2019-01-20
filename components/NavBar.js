import Link from 'next/link'
import {post} from "../functions.js";

const styles = {
	backgroundColor: "#24292e",
	color: "white",
	fontFamily: "Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
	height: 55,
	width: "100%",
	margin: 0,
	position: "fixed",
	top: 0
}

const titleStyles = {
	margin: 0,
	paddingTop: 15,
	paddingLeft: "5%",
	fontSize: 20,
	display: "inline-block"
}

const linkContainerStyles = {
	display: "inline-block",
	margin: 0,
	paddingTop: 15,
	position: "fixed",
	right: "5%"
}

const linkStyles = {
	display: "inline-block",
	margin: 0,
	padding: 0,
	fontSize: 16,
	marginRight: 15,
	cursor: "pointer"
}

const dropDownStyles = {
	color: "black",
	backgroundColor: "white",
	zIndex: 1,
	width: 175,
	border: "solid 1px #808080",
	borderRadius: 3,
	marginTop: 8
}

const triangleStyles = {
	position: "fixed",
	top: 39,
	right: "8%"
}

class NavBar extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {
			signedIn: false,
			showDropDown: false,
			name: ""
		};

		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleMouseEnter() { this.setState({showDropDown: true}); }
	handleMouseLeave() { this.setState({showDropDown: false}); }

	async handleClick()
  {
    //Send logout request to server
    let res = await post("/log-out", {});
    location.reload();
  }

	async componentDidMount()
	{
		let res = await post("/get-session-info", {});
		this.setState({
			signedIn : (res.msg === "signed-in") ? true : false,
			name: (res.msg === "signed-in") ? (res.firstName + ' ' + res.lastName) : ""
		});
	}

	render()
	{
		return (<div style={styles}>
			<style jsx>{` p {margin-top: 5px; margin-bottom: 5px; font-size: 14px;} `}</style>
			<p style={titleStyles}>China Taste of Vernon, LLC</p>
			<div style={linkContainerStyles}>
				<Link href="/"><p style={linkStyles}>Menu</p></Link>
				<Link href="/about"><p style={linkStyles}>About Us</p></Link>
				{this.state.signedIn && (<div style={linkStyles} onMouseEnter={this.handleMouseEnter}>
					<img src="static/images/profile.png" width="20" style={{verticalAlign: "middle", marginBottom: 2}}/> &#9662;
				</div>)}

				{this.state.signedIn && this.state.showDropDown && (<div style={dropDownStyles} onMouseLeave={this.handleMouseLeave}>
						<img src="static/images/triangle.png" width="15" height="10" style={triangleStyles}/>
						<div style={{borderBottom: "solid 1px #dddddd", padding: "2px 0px 2px 10px"}}>
							<p style={{marginBottom: 3}}>Signed in as</p>
							<p style={{fontWeight: 450, marginTop: 0}}>{this.state.name}</p>
						</div>
						<div style={{padding: "2px 0px 2px 10px"}}>
							<p>Your profile</p>
							<p>Your addresses</p>
							<p>Your past orders</p>
						</div>
						<div style={{borderTop: "solid 1px #dddddd", padding: "2px 0px 2px 10px"}} onClick={this.handleClick}>
							<p>Sign out</p>
						</div>
				</div>)}

				{!this.state.signedIn && <Link href="/login"><p style={linkStyles}>Login</p></Link>}
			</div>
		</div>);
	}
}

export default NavBar
