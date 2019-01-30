import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";
import Link from 'next/link';
import {post} from "../functions.js";

const categoryContainerStyles = {
  display: "inline-block",
  border: "solid 2px #999999",
  width: 160,
	fontFamily: "Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
  textAlign: "left",
  padding: 0
}

const categoryStyles = {
  margin: 0,
  padding: "7px 0px 7px 12px",
  borderBottom: "solid 1px #cccccc"
}

const menuContainerStyles = {
  display: "inline-block",
  verticalAlign: "top",
  width: 520,
	fontFamily: "Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
  marginLeft: 20,
  paddingRight: 30,
  paddingLeft: 5
}

const titleStyles = {
  borderBottom: "solid 2px #999999",
  textAlign: "left",
  fontSize: 24,
  padding: "0px 0px 5px 0px",
  marginBottom: 0
}

const itemStyles = {
  textAlign: "left",
  margin: 0,
  padding: "15px 0px 15px 5px",
  borderBottom: "solid 1px #cccccc"
}

const orderContainerStyles = {
  display: "inline-block",
  verticalAlign: "top",
  border: "solid 2px #999999",
  borderRadius: 5,
  width: 330,
	fontFamily: "Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
  height: 200
}

const bodyStyles = {
  margin: "0 auto",
  marginTop: 80,
  width: "95%",
  textAlign: "center"
}

const PostLink = (props) => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

class Index extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      category: "appetizers",
      signedIn: false,
      firstName: "N/A",
      lastName: "N/A",
      menuItems: []
    }
  }

  static async getInitialProps({ req })
  {
    if(req)
    {

    }

    else
    {
        // called on client
    }

    return {};
  }

  async componentDidMount()
	{
    let req = { category: "appetizers" };
		let res = await post("/fetch-data", req);

    this.setState({ signedIn: res.sessionInfo.signedIn });
    this.setState({ firstName: res.sessionInfo.firstName });
    this.setState({ lastName: res.sessionInfo.lastName });
    this.setState({ menuItems: res.menuItems });
	}

  render()
  {
    return (<div>
      <style jsx global>{` body { margin: 0 } `}</style>
      <NavBar signedIn={this.state.signedIn} firstName={this.state.firstName} lastName={this.state.lastName} />

      <div style={bodyStyles}>

      <div style={categoryContainerStyles}>
        <p style={categoryStyles}>Appetizers</p>
        <p style={categoryStyles}>Soup</p>
        <p style={categoryStyles}>Chow Mein</p>
        <p style={categoryStyles}>Chop Suey</p>
      </div>

      <div style={menuContainerStyles}>
        <div style={titleStyles}>Appetizers</div>
        {this.state.menuItems.map(function(item){
          let cost = item.cost[0];
          if (item.cost.length > 1)
            cost += "+";
          return (<div style={itemStyles}>
            <p style={{width: "50%", margin: 0, display: "inline-block", textAlign: "left"}}>{item.name}</p>
            <p style={{width: "48%", margin: 0, display: "inline-block", textAlign: "right"}}>{cost}</p>
          </div>);
        })}
      </div>

      <div style={orderContainerStyles}>
        <div style={{backgroundColor: "#999999", color: "white", height: 50, fontSize: 20, paddingTop: 10}}>Your Order</div>
      </div>

      </div>

      <Footer />
    </div>);
  }
}

export default Index;
