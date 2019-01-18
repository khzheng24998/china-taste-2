import Link from 'next/link'

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

class NavBar extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {signedIn: false};

		this.handleMouseEnter = this.handleMouseEnter.bind(this);
	}

	handleMouseEnter()
	{
		console.log("Detected mouse enter!");
	}

	render()
	{
		return (<div style={styles}>
			<p style={titleStyles}>China Taste of Vernon, LLC</p>
			<div style={linkContainerStyles}>
				<Link href="/"><p style={linkStyles}>Menu</p></Link>
				<Link href="/about"><p style={linkStyles}>About Us</p></Link>
				{this.state.signedIn && <Link href="/profile"><div style={linkStyles} onMouseEnter={this.handleMouseEnter}><img src="static/images/profile.png" width="20" style={{verticalAlign: "middle", marginBottom: 2}}/> &#9662;</div></Link>}
				{!this.state.signedIn && <Link href="/login"><p style={linkStyles}>Login</p></Link>}
			</div>
		</div>);
	}
}

export default NavBar
