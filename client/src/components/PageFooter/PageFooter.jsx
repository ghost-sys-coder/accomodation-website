import React from 'react';
import { Link } from "react-router-dom";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../PageFooter/PageFooter.scss";

const PageFooter = () => {
  return (
    <section className='footer'>
        <footer className='footer--grid'>
            <div className="item">
                  <h1>support</h1>
                  <Link to={"/help-center"}>Help Center</Link>
                  <Link to={"/aircover"}>AirCover</Link>
                  <Link to={"/supporting"}>Supporting people with disabilities</Link>
                  <Link to={"/cancellation"}>Cancellation Options</Link>
                  <Link to={"/covid"}>Our Covid Response</Link>
                  <Link to={"/concern"}>Report a neighbourhood concern</Link>
            </div>
            <div className="item">
                  <h1>community</h1>
                  <Link to={"/disaster"}>AirStaar.org: disaster relief housing</Link>
                  <Link to={"/discrimination"}>Combating discrimination</Link>
            </div>
            <div className="item">
                  <h1>hosting</h1>
                  <Link to={"/become"}>Become a host</Link>
                  <Link to={"/host-aircover"}>AirCover for Hosts</Link>
                  <Link to={"/explore"}>Explore hosting resources</Link>
                  <Link to={"/community-forum"}>Visit our community forum</Link>
                  <Link to={'/host-responsibly'}>How to host responsibly</Link>
            </div>
            <div className="item">
                  <h1>AirStaar</h1>
                  <Link to={"/newsroom"}>Newsroom</Link>
                  <Link to={"/features"}>Learn about new features</Link>
                  <Link to={"/founders"}>Letter from our founders</Link>
                  <Link to={"/careers"}>careers</Link>
                  <Link to={"/investors"}>Investors</Link>
                  <Link to={"/gift-cards"}>Gift Cards</Link>
            </div>
        </footer>
        <div className="copyright--socials">
              <div className="copyright">
              <p>&copy; 2023 AirStaar, Inc</p>
              <a href="/terms">terms</a>
              <a href="/sitemap">sitemap</a>
              <a href="/privacy">privacy</a>
              </div>
              <div className="socials">
                  <p className='language'>
                    <AiOutlineGlobal />
                    English(US)
                  </p>
                  <p className="price">
                      US $
                  </p>
                  <a href="https://www.facebook.com/">
                      <FaFacebook />
                  </a>
                  <a href="http://www.instagram.com/">
                      <FaInstagram />
                  </a>
                  <a href="https:www.twitter.com/">
                      <FaTwitter />
                  </a>
              </div>
        </div>
    </section>
  )
}

export default PageFooter