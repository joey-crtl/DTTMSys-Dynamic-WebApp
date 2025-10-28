import "../styles/main.css";

function About() {
  return (
    <>
      {/* ✅ About Us */}
      <section className="about" id="about">
        <h2>About Us</h2>
        <p>Learn about our journey and what drives us. </p>

        <div className="mv-container">
          <div className="mission-box">
            <h3>Mission</h3>
            <p>
              At Doctor Travel & Tours, we believe travel is the best medicine—our 
              mission is to make every adventure easy, fun, and full of heartwarming memories.
            </p>
          </div>
          <div className="vision-box">
            <h3>Vision</h3>
            <p>
              To become a leading name in the travel industry by consistently providing excellence, 
              reliability, and inspiration in every journey we create.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Meet Our Team */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="/img/DOC.jpg" alt="Kryshia Dean" />
            <p className="team-desc">
              “With over 15 years of experience in global travel, Kryshia founded
              Horizon Travels to help others explore the world with ease and
              confidence.”
            </p>
            <h3>Kryshia Dean</h3>
            <span>Manager</span>
          </div>

          <div className="team-member">
            <img src="/img/SOLI.jpg" alt="Jose Enrique Soliman" />
            <p className="team-desc">
              “With over 15 years of experience in global travel, Kryshia founded
              Horizon Travels to help others explore the world with ease and
              confidence.”
            </p>
            <h3>Jose Enrique Soliman</h3>
            <span>Team Leader</span>
          </div>

          <div className="team-member">
            <img src="/img/KATH.jpg" alt="Kathlyn Leal" />
            <p className="team-desc">
              “With over 15 years of experience in global travel, Kryshia founded
              Horizon Travels to help others explore the world with ease and
              confidence.”
            </p>
            <h3>Kathlyn Leal</h3>
            <span>Designer</span>
          </div>

          <div className="team-member">
            <img src="/img/GIE.jpg" alt="Rogie Cabunas" />
            <p className="team-desc">
              “With over 15 years of experience in global travel, Kryshia founded
              Horizon Travels to help others explore the world with ease and
              confidence.”
            </p>
            <h3>Rogie Cabunas</h3>
            <span>Documentation</span>
          </div>

          <div className="team-member">
            <img src="/img/LEE.jpg" alt="Jhon Lee Teofilo" />
            <p className="team-desc">
              “With over 15 years of experience in global travel, Kryshia founded
              Horizon Travels to help others explore the world with ease and
              confidence.”
            </p>
            <h3>Jhon Lee Teofilo</h3>
            <span>Developer</span>
          </div>
        </div>
      </section>

      {/* ✅ Our Story */}
      <section className="our-story">
        <h2>Our Story</h2>

        <div className="story-block">
          <img src="/img/hp1.png" alt="Story 1" />
          <div className="story-text">
            <h3>Where It All Began</h3>
            <p>
              Doctor Travel & Tours started as a simple dream shared by a group of doctors 
              who found healing not only in medicine—but in travel. Before the pandemic, our 
              founders spent their free time exploring breathtaking destinations, 
              discovering the joy of new experiences, and realizing how travel can rejuvenate 
              both body and soul. This shared passion inspired the birth of 
              Doctor Travel & Tours—built on the belief that travel, like medicine, 
              can be the perfect remedy for life’s stresses.
            </p>
          </div>
        </div>

        <div className="story-block reverse">
          <img src="/img/hp2.png" alt="Story 2" />
          <div className="story-text">
            <h3>Growing with Passion</h3>
            <p>
              When the pandemic struck, the world came to a standstill. 
              Flights were grounded, borders closed, and dreams were momentarily paused. 
              For us, it was a heartbreaking chapter. 
              Yet amid the uncertainty, our passion for travel never faded. 
              We used that time to strengthen our vision, improve our services, and 
              prepare for the day people could explore again—safely, comfortably, and confidently.
            </p>
          </div>
        </div>

        <div className="story-block">
          <img src="/img/hp3.png" alt="Story 3" />
          <div className="story-text">
            <h3>Looking Ahead</h3>
            <p>
              Today, Doctor Travel & Tours stands stronger than ever. 
              What began as a group of doctors who love traveling has grown 
              into a dedicated team committed to crafting seamless, joy-filled adventures for everyone. 
              We continue to live by our promise—Your Rx for Adventure—because we believe that travel 
              remains one of life’s greatest medicines, bringing healing, happiness, and connection 
              wherever the journey leads.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
