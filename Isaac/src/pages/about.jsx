import React from "react";
import useSubmit from "@/hooks/useSubmit";
import { LoginSchema } from "@/config/schema";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

const About = () => {
  const { errors, register, handleSubmit } = useSubmit(LoginSchema);

  const onLogin = (data) => {
    console.log(data);
  };
  return (
    <React.Fragment>
      <NavBar />
      <section className="bg-white ">
        <div className="flex flex-col md:flex-row gap-6 p-8  md:p-8 justify-center items-center md:text-3xl md:w-auto h-auto tracking-wider " style={{ maxWidth: "1000px", margin: "auto", paddingTop: "60px", paddingBottom: "60px"}}>
          <h2>
            Our aim is to ensure that citizens get the government to fix their
            local Issues. The government can see pressing issues within a local
            government from the number of upvotes coming from that issue. When
            Issues are resolved, citizens can also click on the resolved button
            to acknowledge that the issue has been resolved. With fixeet,
            citizens can get updates on the latest news happening around them.
          </h2>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default About;
