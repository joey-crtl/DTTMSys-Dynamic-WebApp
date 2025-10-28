import { useState } from "react";
import { supabase } from "../supabaseClient"; // make sure this points to your Supabase client
import "../styles/main.css";

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question}
      </button>
      <div className={`faq-answer ${isOpen ? "open" : ""}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer both local and international travel packages, visa assistance, flight and hotel booking, group tours, customized itineraries, and travel insurance coordination.",
    },
    {
      question: "How can I book a trip?",
      answer:
        "Booking is easy! Just send us: 1.Full names of all travelers (as shown in passport)2. Preferred travel dates and destination 3. Number of travelers. Our team will send your quotation and booking steps.",
    },
    {
      question: "Can you customize itineraries?",
      answer:
        "Absolutely! We can personalize your itinerary according to your preferences, schedule, and budget — whether it’s a family getaway, honeymoon, or barkada trip.",
    },
    {
      question: "Do you assist with visa applications?",
      answer:
        "Yes! We provide visa assistance for destinations like Japan, Korea, China, and more. We’ll guide you with requirements, forms, and tips to ensure a smooth process.",
    },
    {
      question: "What happens if my trip gets canceled?",
      answer:
        "Cancellations are subject to airline and hotel policies. We’ll guide you through the process and help with rebooking options whenever possible.",
    },{
      question: "Do you accommodate group or corporate travel?",
      answer:
        "Yes, we specialize in group bookings — perfect for company outings, educational tours, and family reunions. Large group packages may include a FREE tour guide!",
    },
  ];

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!name || !email || !message) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      const { data, error } = await supabase.from("feedback_info").insert([
        { name, email, message, submitted_at: new Date().toISOString() }
      ]);

      setLoading(false);

      if (error) {
        console.error("Error submitting feedback:", error);
        alert("Failed to send message. Please try again.");
      } else {
        alert("Thank you for your feedback!");
        setName("");
        setEmail("");
        setMessage("");
      }
    };
  return (
    <>
      {/* Contact Form Section */}
      <section className="contact" id="contact">
        <h2>Contact Us</h2>
        <p>Have questions or need help? Send us a message below!</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="contact-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions (FAQ's)</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* Branch Maps */}
      <section className="branch-maps">
        <h2>Our Branch Locations</h2>
        <div className="map-grid">
          <div className="map-card">
            <h3>Dagupan City, Pangasinan</h3>
            <iframe
              src="https://www.google.com/maps?q=Dagupan+City,+Pangasinan&output=embed"
            ></iframe>
          </div>
          <div className="map-card">
            <h3>Malasiqui, Pangasinan</h3>
            <iframe
              src="https://www.google.com/maps?q=Magsaysay+St,+Poblacion,+Malasiqui,+Pangasinan&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="map-card">
            <h3>Bayambang, Pangasinan</h3>
            <iframe
              src="https://www.google.com/maps?q=21+Rizal+Ave,+Bayambang,+Pangasinan&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="map-card">
            <h3>Camiling, Tarlac</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v163278973029128082!6m8!1m7!1skwofGDMPv7611Tmk9fz5Og!2m2!1d120.4148237!2d15.9183753!3f108.9!4f76.72!5f0.7820865974627469"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="map-card">
            <h3>San Jose, Rodriguez, Rizal</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v163278973029128082!6m8!1m7!1sZqUm8nQMisUbFbFQ0nqMkA!2m2!1d121.1403355!2d14.7526334!3f353.14!4f70.21!5f0.7820865974627469"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="connect-section">
        <div className="connect-top">
          <div className="connect-brand">
            <img src="./img/logoo.png" alt="Logo" className="connect-logo" />
            <span className="brand-name">Doctor Travel & Tours</span>
          </div>
        </div>
        <div className="connect-container">
          <div className="connect-social">
            <h2>You can also visit us on social media</h2>
            <div className="social-icons">
              <a href="https://www.facebook.com/drtravelph"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.tiktok.com/@dr.travelph"><i className="fab fa-tiktok"></i></a>
              <a href="https://www.instagram.com/dr.travelph/"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className="connect-info">
            <h3>Contact Information</h3>
            <p><strong>Phone:</strong> +639757818134</p>
            <p><strong>Email:</strong> doctortravelph@gmail.com</p>
            <p><strong>Address:</strong> B7 L2 E-9 PH-1F San Jose Plains, San Jose, Rodriguez, Rizal</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
