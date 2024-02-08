import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.init";

const Register = () => {
  const handlerSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(`${email},${password}`);

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="border">
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
            />
            <br />
            <input
              type="password"
              name="password"
              id=""
              placeholder="password"
              className="w-3/4 mb-4 py-2 px-4 border"
            />
            <br />
            <input
              type="submit"
              value="Register"
              className="btn btn-secondary w-3/4 text-lg "
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
