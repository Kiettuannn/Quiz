import { generateToken } from "../../helpers/generateToken";
import { checkExits, register } from "../../services/userService";
import { useNavigate } from "react-router-dom"
function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const checkExitsEmail = await checkExits("email", email);
    if (checkExitsEmail.length > 0) {
      alert("Email da ton tai");
    } else {
      const options = {
        fullName: fullName,
        email: email,
        password: password,
        token: generateToken(),
      };
      const response = await register(options);
      if (response) {
        navigate("/login");
      } else {
        alert("Đăng ký thất bại");
      }
    }

    // if(response.length > 0){
    //   setCookie("id",response[0].id,1);
    //   setCookie("fullName",response[0].fullName,1);
    //   setCookie("email",response[0].email,1);
    //   setCookie("token",response[0].token,1);
    //   dispatch(checkLogin(true));
    //   navigate("/");
    // }
    // else{
    //   alert("Sai tai khoan hoac mat khau");
    // }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Đăng ký</h2>
        <div>
          <input type="text" placeholder="Nhập họ và tên" required />
        </div>
        <div>
          <input type="email" placeholder="Nhập email" />
        </div>
        <div>
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>
        <button type="text">Đăng ký</button>
      </form>
    </>
  )
}
export default Register;