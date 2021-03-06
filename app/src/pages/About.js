import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Experience from "../components/Experience";
import Title from "../components/Title";
import api from "../utils/axios";

const About = () => {
  const [personalInfo, setPersonalInfo] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    api.get("/user/6252f29254f74e6a862248fc").then((myData) => {
      setPersonalInfo(myData.data.data);
    });
  };

  const calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  };

  const years = [
    {
      number: "1",
      icon: "+",
      title: "YEARS OF EXPERIENCE",
      key: "1",
    },
    {
      number: "3",
      icon: "+",
      title: "COMPLETED PROJECTS",
      key: "2",
    },
    {
      number: "2",
      icon: "+",
      title: "HAPPY CUSTOMERS",
      key: "3",
    },
    {
      number: "3",
      icon: "+",
      title: "AWARDS WON",
      key: "4",
    },
  ];

  return (
    <div className="about">
      <div className="about-">
        <Title
          classes="about-subtitle"
          title="RESUME"
          subtitle="ABOUT"
          secondTitle="ME"
          class="about-title"
        />
      </div>
      {personalInfo ? (
        <div className="container">
          <div className="about-me">
            <div className="info">
              <h1>PERSONAL INFOS</h1>
              <div className="about-image "></div>
              <div className="info-data">
                <div>
                  <p>
                    <span>First Name:</span> {personalInfo.firstName}
                  </p>
                </div>
                <div>
                  <p>
                    <span>LastName:</span> {personalInfo.lastName}
                  </p>
                </div>
                <div>
                  <p>
                    <span>Age:</span>{" "}
                    {calculate_age(
                      new Date(personalInfo.birthDate).toLocaleDateString()
                    )}
                    {}
                  </p>
                </div>
                <div>
                  <p>
                    <span>Phone:</span> {personalInfo.phoneNo}
                  </p>
                </div>
                <div>
                  <p>
                    <span>Nationality: </span>
                    {personalInfo.nationality}
                  </p>
                </div>
                <div>
                  <p>
                    <span>Address: </span>
                    {personalInfo.city}
                  </p>
                </div>
                <div>
                  <p>
                    <span>Status: </span>
                    {personalInfo.jobStatus}
                  </p>
                </div>
                <div>
                  <p>
                    <span>Email: </span>
                    {personalInfo.email}
                  </p>
                </div>
              </div>
              <a
                className="cv-link"
                href={personalInfo.cvLink}
                classes="about-button btn"
              >
                Download CV
              </a>
            </div>
            <div className="experience-container">
              <Experience year={years} />
            </div>
          </div>
        </div>
      ) : (
        <p className="no-data">No data found!</p>
      )}
    </div>
  );
};

export default About;
