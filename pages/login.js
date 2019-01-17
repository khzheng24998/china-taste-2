import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";
import Box1 from "../components/Box1.js";

class Login extends React.Component
{
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

        <Box1 />

        <Footer />
      </div>
    );
  }
}

export default Login;
