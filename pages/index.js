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
  width: 500,
	fontFamily: "Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
}

const orderContainerStyles = {
  display: "inline-block",
  verticalAlign: "top",
  border: "solid 2px #999999",
  borderRadius: 5,
  width: 300,
	fontFamily: "Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
}

const bodyStyles = {
  margin: "0 auto",
  marginTop: 80,
  width: "90%",
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
		let res = await post("/get-menu", { category: "appetizers" });
    console.log(res.items);
	}

  render()
  {
    return (<div>
      <style jsx global>{` body { margin: 0 } `}</style>
      <NavBar />

      <div style={bodyStyles}>

      <div id="categories" style={categoryContainerStyles}>
        <p style={categoryStyles}>Appetizers</p>
        <p style={categoryStyles}>Soup</p>
        <p style={categoryStyles}>Chow Mein</p>
        <p style={categoryStyles}>Chop Suey</p>
      </div>

      <div id="categories" style={menuContainerStyles}>
      </div>

      <div id="categories" style={orderContainerStyles}>
        <p>Appetizers</p>
        <p>Soup</p>
      </div>

      </div>

      <Footer />
    </div>);
  }
}

export default Index;
