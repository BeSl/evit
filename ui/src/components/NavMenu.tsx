import React, { Dispatch, useState } from 'react';
import { connect } from "react-redux";
import { Link, NavLink, Redirect } from 'react-router-dom';
import { User } from "../models/user";
import { setUser } from "../redux/actions/setUserAction";


const NavMenu = (props: any) => {
  let menu;
  let visible = false;
  

  if (props.user?.id) {
    menu = (
      <div className="col-md-3 text-end">
        <Link to={'/rankings'} className="btn me-2">Rankings</Link>
        <Link to={'/stats'} className="btn me-2">Stats</Link>
        <a href="#" className="btn btn-outline-primary me-2"
        >Logout</a>
        <Link to={'/profile'} className="btn btn-primary">{props.user.first_name} {props.user.last_name}</Link>
      </div>
    )
  } else {
    menu = (
      <>
        <div className="col-md-3 text-end">
        </div>
      </>
    )
  }

  return (
    <></>
    );
};

export default connect(
  (state: { user: User }) => ({
    user: state.user
  }),
  (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user))
  })
)(NavMenu);
