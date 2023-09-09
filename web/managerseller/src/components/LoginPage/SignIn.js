import React from "react";
import classes from "./SignIn.module.css";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const SignIn = (props) => {
  const [signInInvalid, setSignInInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const signIn = useContext(UserContext);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    if (isFormSubmitted && signIn.id !== "") {
      const apiUrl = `https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/brofucntions/sangyunbro/GetSellerData/getsellerdata?seller_id=${signIn.id}`;
      async function fetchData() {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            alert(`아이디가 없습니다.`);
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log(`data`, data.data);
          if (data.data.password === signIn.password) {
            signIn.isLogin = true;
            signIn.consumer_or_not = data.data.consumer_or_not;
            signIn.email = data.data.email;
            signIn.phone_number = data.data.phone_number;
            signIn.real_name = data.data.real_name;
            signIn.resident_registration_number = data.data.resident_registration_number;
            alert('로그인 되었습니다.');
            navigate('/main');
          } else {
            alert('비밀번호가 틀렸습니다.');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      fetchData();
    }
  }, [isFormSubmitted]);


  const handleUsernameChange = (event) => {
    signIn.id = event.target.value;
    setIsFormSubmitted(false);
  };

  const handlePasswordChange = (event) => {
    signIn.password = event.target.value;
    setIsFormSubmitted(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작을 막음
    setIsFormSubmitted(true); // 폼이 제출되었음을 표시
  };

  return (
    <div className={classes.login_component}>
      {console.log(`signIn`, signIn)}
      <div className={classes.wrap}>
        <h1>Seller Manager</h1>
        <h1>SignIn</h1>
        <br />
        <form id="signinForm" className={classes.form} onSubmit={handleSubmit}>
          <label className={classes.formlabel}>
            <span className={classes.formtext}>아이디&nbsp;&nbsp;</span>
            <input
              className={classes.inputaddress}
              type={"text"}
              id="username"
              placeholder=""
              required
              autoComplete="on"
              onChange={handleUsernameChange}
            />
          </label>
          <label className={classes.formlabel}>
            <span className={classes.formtext}>비밀번호&nbsp;&nbsp;</span>
            <input
              className={classes.inputaddress}
              type={"password"}
              id="password"
              placeholder="8자 이상"
              required
              autoComplete="off"
              onChange={handlePasswordChange}
            />
          </label>
          <div className={classes.signbuttons}>
            <button
              type="submit"
              id="signinbutton"
              className={classes.signinbutton}
            >
              로그인
            </button>
          </div>
        </form>
        <Link to={"/signup"} className={classes.signupbutton_wrap}>
          <button id="signupbutton" className={classes.signupbutton}>
            회원가입
          </button>
        </Link>
        <div className={classes.signInInvalid}>
          {signInInvalid && (
            <>
              <p> 아이디 또는 비밀번호를 잘못 입력했습니다.</p>
              <p> 입력하신 내용을 다시 확인해주세요.</p>
            </>
          )}
        </div>
        {loading ? (
          <p>로그인 중입니다...</p>
        ) : (
          <div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
