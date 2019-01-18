import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";
import Box1 from "../components/Box1.js";

class CreateAccount extends React.Component
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

        <Footer />
      </div>
    );
  }
}

export default CreateAccount;
