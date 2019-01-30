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

const noHoverStyles = {
	color: "black",
	backgroundColor: "white",
	padding: "3px 0px 3px 10px",
	cursor: "pointer"
}

const hoverStyles = {
	color: "white",
	backgroundColor: "#0366d6",
	padding: "3px 0px 3px 10px",
	cursor: "pointer"
}

class NavBar extends React.Component {

	constructor(props)
	{
		super(props);

		this.state = {
			showDropDown: false,
			hover: {
				profile: false,
				addresses: false,
				pastOrders: false,
				signOut: false
			}
		};

		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleMouseEnter2 = this.handleMouseEnter2.bind(this);
		this.handleMouseLeave2 = this.handleMouseLeave2.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleMouseEnter() { this.setState({showDropDown: true}); }
	handleMouseLeave() { this.setState({showDropDown: false}); }

	handleMouseEnter2(e)
	{
		let update = {};
		update.hover = this.state.hover;
		update.hover[e.target.id] = true;
		this.setState(update);
	};

	handleMouseLeave2(e)
	{
		let update = {};
		update.hover = this.state.hover;
		update.hover[e.target.id] = false;
		this.setState(update);
	};

	async handleClick()
  {
    //Send logout request to server
    let res = await post("/log-out", {});
    location.reload();
  }

	render()
	{
		const name = this.props.firstName + " " + this.props.lastName;

		return (<div style={styles}>
			<style jsx>{` p {margin-top: 5px; margin-bottom: 5px; font-size: 14px;} `}</style>
			<p style={titleStyles}>China Taste of Vernon, LLC</p>
			<div style={linkContainerStyles}>
				<Link href="/"><p style={linkStyles}>Menu</p></Link>
				<Link href="/about"><p style={linkStyles}>About Us</p></Link>

				{this.props.signedIn && (<div style={linkStyles} onMouseEnter={this.handleMouseEnter}>
					<img src="static/images/profile.png" width="20" style={{verticalAlign: "middle", marginBottom: 2}}/> &#9662;
				</div>)}

				{this.props.signedIn && this.state.showDropDown && (<div style={dropDownStyles} onMouseLeave={this.handleMouseLeave}>
						<img src="static/images/triangle.png" width="15" height="10" style={triangleStyles}/>
						<div style={{borderBottom: "solid 1px #dddddd", padding: "2px 0px 2px 10px"}}>
							<p style={{marginBottom: 3}}>Signed in as</p>
							<p style={{fontWeight: 450, marginTop: 0}}>{name}</p>
						</div>
						<div style={{padding: "0px 1px 0px 1px"}}>
							<p id="profile" style={(this.state.hover["profile"]) ? hoverStyles : noHoverStyles} onMouseEnter={this.handleMouseEnter2} onMouseLeave={this.handleMouseLeave2}>Your profile</p>
							<p id="addresses" style={(this.state.hover["addresses"]) ? hoverStyles : noHoverStyles} onMouseEnter={this.handleMouseEnter2} onMouseLeave={this.handleMouseLeave2}>Your addresses</p>
							<p id="pastOrders" style={(this.state.hover["pastOrders"]) ? hoverStyles : noHoverStyles} onMouseEnter={this.handleMouseEnter2} onMouseLeave={this.handleMouseLeave2}>Your past orders</p>
						</div>
						<div style={{borderTop: "solid 1px #dddddd", padding: "0px 1px 0px 1px"}} onClick={this.handleClick}>
							<p id="signOut" style={(this.state.hover["signOut"]) ? hoverStyles : noHoverStyles} onMouseEnter={this.handleMouseEnter2} onMouseLeave={this.handleMouseLeave2}>Sign out</p>
						</div>
				</div>)}

				{!this.props.signedIn && <Link href="/login"><p style={linkStyles}>Login</p></Link>}
			</div>
		</div>);
	}
}

NavBar.defaultProps = {
	signedIn: false,
	firstName: "N/A",
	lastName: "N/A"
};

export default NavBar;
