import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";
import Link from 'next/link';

const categoryStles = {
  border: "solid 2px #999999",
  width: 150
}

const bodyStyles = {
  margin: "0 auto",
  width: "80%",
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
        // called on server
    }

    else
    {
        // called on client
    }

    return {};
  }

  render()
  {
    return (<div>
      <style jsx global>{` body { margin: 0 } `}</style>
      <NavBar />
      <br/><br/><br/>

      <div style={bodyStyles}>

      <div id="categories" style={categoryStles}>
        <p>Appetizers</p>
        <p>Soup</p>
      </div>

      </div>

      <Footer />
    </div>);
  }
}

export default Index;
