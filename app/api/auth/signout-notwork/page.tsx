const SignOut = () => {
  return (
    <div className="signout">
      <div className="card bg-base-100 shadow-xl mx-6 mt-10">
        <div className="card-body flax flex-col items-center gap-6">
          <p className=" font-bold">آیا میخواهید خارج شوید؟</p>
          <form
            className=" card-actions"
            action="http://localhost:3000/api/auth/signout"
            method="POST"
          >
            <input
              type="hidden"
              name="csrfToken"
              value="da7012e7057a12697e98f9bea7590c4b9b5a520ddd66f342a78ebd9dac177203"
            />
            <button id="submitButton" type="submit" className=" btn btn-info">
              خروج
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignOut;
