import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../Firebase/firebase.init";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Register = () => {
  //  REACT STATE MANAGE HOOKS
  const [registererror, setRegistererror] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const [showpassword, setShowpassword] = useState(false);

  //  GOOGLE AUTHENTICATION
  const googleAuth = new GoogleAuthProvider();

  //   FORM SUBMIT

  const handlerSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(email, password, accepted);

    setRegistererror("");
    setSuccess("");
    if (password.length < 6) {
      setRegistererror("Password should be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegistererror("Your password should hava one uppercase character");
      return;
    } else if (!accepted) {
      setRegistererror("Please accept our terms and condition");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess("User Register Successfully");
      })
      .catch((error) => {
        console.log(error);
        setRegistererror(error.message);
      });
  };

  // SIGN WITH GOOGLE EVENT HANDLER

  const handlerSignwithgoogle = () => {
    signInWithPopup(auth, googleAuth)
      .then((result) => {
        const loggedGoogle = result.user;
        console.log(loggedGoogle);
        setUser(loggedGoogle);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // LOGOUT WITH EVENT HANDLER

  const handleLogout = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mx-auto md:w-1/2">
      <h2 className="text-3xl">Please Register</h2>
      <div className="mt-10">
        <form onSubmit={handlerSubmit}>
          <input
            type="email"
            name="email"
            id=""
            placeholder="email"
            className="w-3/4 mb-4 py-2 px-4 border"
            required
          />
          <br />
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            id=""
            placeholder="password"
            className="w-3/4 mb-4 py-2 px-4 border"
            required
          />
          <span onClick={() => setShowpassword(!showpassword)}>
            {showpassword ? (
              <FaRegEye></FaRegEye>
            ) : (
              <FaRegEyeSlash></FaRegEyeSlash>
            )}
          </span>
          <div>
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms">Accept our terms and condition</label>
          </div>
          <br />
          <input
            type="submit"
            value="Register"
            className="btn btn-secondary w-3/4 text-xl font-bold "
          />
        </form>
        {registererror && (
          <p className="text-red-800 font-bold">{registererror}</p>
        )}
        {success && <p className="text-green-600 font-bold">{success}</p>}
        <div className="mt-5">
          {/* LOGOUT */}

          {user ? (
            <button
              onClick={handleLogout}
              className="w-3/4 mb-4 py-2 px-4  btn btn-success font-bold text-xl text-white "
            >
              Logout
            </button>
          ) : (
            <div>
              {/* GOOGLE SIGNUP */}
              <button
                onClick={handlerSignwithgoogle}
                className="w-3/4 mb-4 py-2 px-4  btn btn-success font-bold text-xl text-white "
              >
                Resister With Google
              </button>
            </div>
          )}

          {user && (
            <div>
              <img src={user.photoURL} alt="" />
              <h3>User:{user.displayName}</h3>
              <h4>Email:{user.email}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
