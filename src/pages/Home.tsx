/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { connect } from "react-redux";
import { register } from "../Service/action/userAction";
import LandingPage from "../LandingPage/LandingPage";

interface Props {
  register: any;
  user: {
    authenticated: boolean;
    loading: boolean;
    user: Record<string, string | number | boolean>;
  };
}

const Home = ({ register, user }: Props) => {
  console.log(register, user);
  return (
    <>
      <LandingPage />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});
const mapDispatchToProps = {
  register,
};
const HomePage = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomePage;
