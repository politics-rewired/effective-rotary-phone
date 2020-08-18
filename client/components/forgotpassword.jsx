import React from "react";
import { Link } from "react-router-dom";

export const ForgotPassword = (props) => (
  <div>
    <Link to="/" style={{ float: "right" }}>
      Home
    </Link>
    <h1>Reset Your Password</h1>
    <form action="/api/session" method="post">
      Email:
      <input name="email" type="email" />
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
);