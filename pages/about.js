import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";

const About = () => (
  <div>
    <style jsx global>{`
      body {
        margin: 0
      }
    `}</style>

    <NavBar />

    <div style={{height: 1000}}>Hello Next.js</div>

    <Footer />
  </div>
)

export default About;
