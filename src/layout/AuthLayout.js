import React from "react";

export function AuthLayout(props) {
  return (
    <div className="authLayout">
      <div className="login-wrapper">{props.children}</div>
    </div>
  );
}

// export default AuthLayout;
