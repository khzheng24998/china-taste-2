import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";
import {Box1, Box2} from "../components/Box.js";

class Login extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {display: 2};
  }

  render()
  {
    return (
      <div>
        <style jsx global>{`
          body {
            margin: 0
          }
        `}</style>

        <NavBar />

        {(this.state.display === 1) && <Box1 />}
        {(this.state.display === 2) && <Box2 />}

        <Footer />
      </div>
    );
  }
}

export default Login;
