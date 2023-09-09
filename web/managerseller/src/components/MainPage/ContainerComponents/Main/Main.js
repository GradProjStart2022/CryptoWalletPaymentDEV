import classes from "./Main.module.css";
import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import nangnang from "../../../../asset/images/nangnang.png";
import UserContext from "../../../../contexts/UserContext";
const Main = () => {
  const signIn = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!signIn.isLogin) {
      navigate('/');
    }
  }, [signIn.isLogin, navigate]);

  return (
    <>
      {console.log(signIn)}
      <div className={classes.main_wrap}>
        <div className={classes.main}>
          {/* <div className={classes.main_text}>Main</div> */}
          <div className={classes.main_component_wrap}>
            <div className={classes.main_image_wrap}>
              <img
                className={classes.main_image}
                src={nangnang}
                alt="낭낭 메인 페이지 이미지"
              />
              <h1>{signIn.real_name}님 환영합니다!</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
