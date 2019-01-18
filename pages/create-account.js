import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";
import {Box2} from "../components/Box.js";

class CreateAccount extends React.Component
{
  render()
  {
    return (<div>
      <style jsx global>{` body { margin: 0 } `}</style>
      <NavBar />
      <Box2 />
      <Footer />
    </div>);
  }
}

export default CreateAccount;
