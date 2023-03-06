import React from "react";

function About() {
  return (
    <>
    
     <h2 className="heading_aditya" style={{textAlign:"center","marginTop":"5rem"}}>ABOUT US</h2>
      <div className="about_stars">
        <div class="about_body">
          <div class="div_img_about">
            <img class="img_about" src="static/about/ishti.jpg" />
          </div>
          <div class="social_links">
            <a
              href="https://www.instagram.com/i_am_ishtiaqahmed/"
              target="_blank"
            >
              <img
                src="static/SocialLinks/instagram.svg"
                alt=""
                class="social_link"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/ishtiaq-samdani-5460a4211/"
              target="_blank"
            >
              <img
                src="static/SocialLinks/linkedin.svg"
                alt=""
                class="social_link"
              />
            </a>
            <a href="https://github.com/ishtiaqSamdani" target="_blank">
              <img
                src="static/SocialLinks/github.svg"
                alt=""
                class="social_link"
              />
            </a>
          </div>
          <div class="about_matter">
            <center>
              <h3>Ishtiaq</h3>
              <div style={{ textAlign: "left" }}>
                <p>Front End Developer | Dev team Lead GDSC"21</p>
                <ul>
                  <li>Crafts websites into beautiful web experiences</li>
                  <li>Internship Experince in React</li>
                  <li>Love to use CSS and JS</li>
                  <li>outsmarts in Chess</li>
                </ul>
              </div>
              <br />
              <h4>Skills</h4>
              <p>React | Firebase | CSS | HTML | JS</p>
              <h4>FrameWorks/Tools</h4>
              <p>Bootstrap | Tailwind CSS | Figma </p>
              <h4>CS languages</h4>
              <p>C++ | python </p>
              <p>
                <a href="https://lichess.org/@/ishtiaqSamdani" target="_blank" style={{"color":"blue",textDecoration:"underline"}}>
                  Chess Player
                </a>
              </p>
            </center>
          </div>
        </div>
        <div class="about_body">
          <div class="div_img_about">
            <img class="img_about" src="static/about/veer.jpg" />
          </div>
          <div class="social_links">
            <a
              href="https://www.instagram.com/raja_singamsetti/?hl=en"
              target="_blank"
            >
              <img
                src="static/SocialLinks/instagram.svg"
                alt=""
                class="social_link"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/veerraju-singamsetti-5099131b3/"
              target="_blank"
            >
              <img
                src="static/SocialLinks/linkedin.svg"
                alt=""
                class="social_link"
              />
            </a>
            <a href="https://github.com/veerraju418" target="_blank">
              <img
                src="static/SocialLinks/github.svg"
                alt=""
                class="social_link"
              />
            </a>
          </div>
          <div class="about_matter">
            <center>
              <h3>Veerraju</h3>
              <p>Computer Science graduate from Aditya Engineering College</p>
              <p>
                I am quick learner and curious person , looking for an
                opportunity in the field of information technology to utilize my
                skills for the benefit of organization while upgrading my skill
                set and knowledge
              </p>
              <br />
              <h4>Skills</h4>
              <p>C++ | Python | Java</p>
              <p>
                Web Development( React | Angular | HTML | CSS | JS | Django)
              </p>
              <p>Cloud Computing (AWS)</p>
            </center>
          </div>
        </div>
        <div class="about_body">
          <div class="div_img_about">
            <img class="img_about" src="static/about/praneeth.jpg" />
          </div>
          <div class="social_links">
            <a
              href="https://www.instagram.com/insta._.cute._.boy/?next=%2F"
              target="_blank"
            >
              <img
                src="static/SocialLinks/instagram.svg"
                alt=""
                class="social_link"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/praneeth-manchem-6a04b41ab"
              target="_blank"
            >
              <img
                src="static/SocialLinks/linkedin.svg"
                alt=""
                class="social_link"
              />
            </a>
            <a href="https://github.com/praneethmanchem" target="_blank">
              <img
                src="static/SocialLinks/github.svg"
                alt=""
                class="social_link"
              />
            </a>
          </div>
          <div class="about_matter">
            <center>
              <h3>Praneeth</h3>
              <p>Computer Science graduate from Aditya Engineering College</p>
              <p>
                I'm a computer science college student with a passion for
                problem-solving and innovation. My interest in technology
                started at a young age, and I've pursued it through various
                projects and coursework. I have experience with programming
                languages such as Python and Java and have worked on projects
                involving software development and data analysis. I'm eager to
                continue learning and contributing to the field of computer
                science through research and practical application.
              </p>
              <br />
              <h4>Skills</h4>
              <p>C++ | Python | Java</p>
              <p>Cloud Computing (AWS)</p>
            </center>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
