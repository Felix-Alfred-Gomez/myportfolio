import { Link } from "react-router-dom";

function EmailVerification() {
  return (
    <div>
      <h2>Verify Your Email</h2>
      <p>
        A verification email has been sent to your email address. Please check
        your inbox and click on the verification link to activate your account.
      </p>
      <p>
        Once verified, you can <Link to="/">log in</Link>.
      </p>
    </div>
  );
}

export default EmailVerification;