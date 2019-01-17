import Link from 'next/link'

const styles = {
	backgroundColor: "#404040",
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

	render()
	{
		return (<div style={styles}>
			<p style={titleStyles}>China Taste of Vernon, LLC</p>
			<div style={linkContainerStyles}>
				<Link href="/"><p style={linkStyles}>Menu</p></Link>
				<Link href="/about"><p style={linkStyles}>About Us</p></Link>
				<Link href="/login"><p style={linkStyles}>Login</p></Link>
			</div>
		</div>);
	}
}

export default NavBar
