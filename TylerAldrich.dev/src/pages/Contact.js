import React, { Suspense, useEffect, useState } from "react";
import * as Icon from "react-feather";
import { Helmet } from "react-helmet";
import Sectiontitle from "../components/Sectiontitle";
import Spinner from "../components/Spinner";
// import { useContact } from "../providers/DataProvider";
import Layout from "../components/Layout.js"
import sendMessage from "../data/db/firebaseMessaging";
import { useFirebaseData } from "../providers/FirebaseDataProvider";

function Contact() {
  const { contact } = useFirebaseData();

  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [emailAddress, setEmailAddress] = useState([]);
  const [address, setAddress] = useState([]);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    subject: "",
    phoneNumber: "",
    message: "",
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const isValudEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }


  const submitHandler = (event) => {
    console.log("SENDING MESSAGE");
    event.preventDefault();
    if (!formdata.name) {
      setError(true);
      setMessage("Name is required");
      return
    } else if (!formdata.email) {
      setError(true);
      setMessage("Email is required");
      return
    } else if (!formdata.subject) {
      setError(true);
      setMessage("Subject is required");
      return
    } else if (!formdata.message) {
      setError(true);
      setMessage("Message is required");
      return
    } else if (!isValudEmail(formdata.email)) {
      setError(true);
      setMessage("Email is not valid, please try again.")
      return
    }
    else {
      setError(false);
      // setMessage("You message has been sent!!!");
    }
    console.log(`formdata: ${formdata}`)
    sendMessage(formdata)
      .then(() => {
        setMessage("Success! I'll reach back to you shortly 🙃");

        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((e) => {
        console.error(`An Error occurred while triggering Firebase Function\nError: ${e}`)
        setMessage(response.body);
      });
  };
  const handleChange = (event) => {
    setFormdata({
      ...formdata,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const numberFormatter = (number) => {
    const phnNumber = number;
    return phnNumber;
  };

  const handleAlerts = () => {
    if (error && message) {
      return <div className="alert alert-danger mt-4">{message}</div>;
    } else if (!error && message) {
      return <div className="alert alert-success mt-4">{message}</div>;
    } else {
      return null;
    }
  };

  useEffect(() => {
    setPhoneNumbers(contact.phoneNumbers);
    setEmailAddress(contact.emailAddress);
    setAddress(contact.address);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Contact Information :: Tyler Aldrich</title>
        <meta
          name="description"
          content="Get intouch with me"
        />
      </Helmet>
      <Suspense fallback={<Spinner />}>
        <div className="mi-contact-area mi-section mi-padding-top mi-padding-bottom">
          <div className="container">
            <Sectiontitle title="Contact Me" />
            <div className="row">
              <div className="col-lg-6">
                <div className="mi-contact-formwrapper">
                  <h4>Get In Touch</h4>
                  <form
                    action="#"
                    className="mi-form mi-contact-form"
                    onSubmit={submitHandler}
                  >
                    <div className="mi-form-field">
                      <label htmlFor="contact-form-name">
                        Enter your name*
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="contact-form-name"
                        value={formdata.name}
                      />
                    </div>
                    <div className="mi-form-field">
                      <label htmlFor="contact-form-email">
                        Enter your email*
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="email"
                        id="contact-form-email"
                        value={formdata.email}
                      />
                    </div>
                    <div className="mi-form-field">
                      <label htmlFor="contact-form-phoneNumber">
                        Enter your cellphone number
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="phoneNumber"
                        id="contact-form-phoneNumber"
                        value={formdata.phoneNumber}
                        placeholder="Optional"
                      />
                    </div>
                    <div className="mi-form-field">
                      <label htmlFor="contact-form-subject">
                        Enter your subject*
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="subject"
                        id="contact-form-subject"
                        value={formdata.subject}
                      />
                    </div>
                    <div className="mi-form-field">
                      <label htmlFor="contact-form-message">
                        Enter your Message*
                      </label>
                      <textarea
                        onChange={handleChange}
                        name="message"
                        id="contact-form-message"
                        cols="30"
                        rows="6"
                        value={formdata.message}
                      ></textarea>
                    </div>
                    <div className="mi-form-field">
                      <button className="mi-button" type="submit">
                        Send Mail
                      </button>
                    </div>
                  </form>
                  {handleAlerts()}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mi-contact-info">
                  {!phoneNumbers ? null : (
                    <div className="mi-contact-infoblock">
                      <span className="mi-contact-infoblock-icon">
                        <Icon.Phone />
                      </span>
                      <div className="mi-contact-infoblock-content">
                        <h6>Phone</h6>
                        {phoneNumbers.map((phoneNumber) => (
                          <p key={phoneNumber}>
                            <a href={numberFormatter(phoneNumber)}>
                              {phoneNumber}
                            </a>
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                  {!emailAddress ? null : (
                    <div className="mi-contact-infoblock">
                      <span className="mi-contact-infoblock-icon">
                        <Icon.Mail />
                      </span>
                      <div className="mi-contact-infoblock-content">
                        <h6>Email</h6>
                        {emailAddress.map((email) => (
                          <p key={email}>
                            <a href={`mailto:${email}`}>{email}</a>
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                  {!phoneNumbers ? null : (
                    <div className="mi-contact-infoblock">
                      <span className="mi-contact-infoblock-icon">
                        <Icon.MapPin />
                      </span>
                      <div className="mi-contact-infoblock-content">
                        <h6>Address</h6>
                        <p>{address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}

export default Contact;
