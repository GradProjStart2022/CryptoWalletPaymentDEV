import classes from "./PaymentRecords.module.css";
import { useQuery } from 'react-query'; // react-query import 추가
import PaymentRecordList from "./PaymentRecordList";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../../contexts/UserContext";

async function fetchRecords(id) {
  const response = await fetch(
    `https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/getpaymentreceiptdata/getallpaymentreceiptdatabyuserid?user_id=${id}`
  );
  const data = await response.json();

  return data.data;
}

const PaymentRecords = () => {
  const signIn = useContext(UserContext);

  let navigate = useNavigate();
  useEffect(() => {
    if (!signIn.isLogin) {
      navigate('/');
    }
  }, [signIn.isLogin, navigate]);

  const { data: records, isLoading, isError, error, refetch } = useQuery(
    'paymentRecords', () => fetchRecords(signIn.id), {
    staleTime: 2000,
  }
  );

  let content = <p>Found no Records.</p>;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );
  else {
    content = <PaymentRecordList records={records} />;
  }

  return (
    <div className={classes.paymentrecords_wrap}>
      <div className={classes.paymentrecords}>
        <div className={classes.text_button_wrap}>
          <div className={classes.paymentrecords_text}>결제내역</div>
          <button
            className={classes.check_table_button}
            onClick={() => refetch()}
          >
            조회
          </button>
        </div>
        <br />
        <div className={classes.paymentrecords_table_wrap}>{content}</div>
      </div>
    </div>
  );
};

export default PaymentRecords;