import React from "react";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneOutboundFill, BsGithub } from "react-icons/bs";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <h5 className="footerTitle text-center py-2">
        &copy; This app created by Bekjon Ishpulatov
      </h5>
      <div className="contacts">
          <div>Savol va takliflar uchun: </div>
        <div className="email">
          <MdEmail style={{ color: "#fff" }} />
          <a href="mailto:bekjonishpulatov8@gmail.com">
            bekjonishpulatov8@gmail.com
          </a>
        </div>
        <div>
          <BsGithub />
          <a href="https://github.com/bekjon-me" target="_blank">MyGithub</a>
        </div>
        <div className="number">
          <BsFillTelephoneOutboundFill style={{ color: "#fff" }} />
          <a href="tel:+998908702909">+998908702909</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
