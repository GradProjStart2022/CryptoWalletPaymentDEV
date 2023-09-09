import React, { useEffect, useContext } from 'react';
import { useQuery } from 'react-query';
import classes from './WalletView.module.css';
import Wallet from './Wallet';
import UserContext from '../../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const walletArr = ["MetaMask", "TrustWallet", "Bitpay", "Argent", "Rainbow", "taehwanWallet"];

async function getWalletData(id) {
  const response = await fetch(
    `https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/brofucntions/sangyunbro/WalletTwo/chosenwallet?seller_id=${id}`
  );
  const data = await response.json();

  return data.data;
}

const WalletView = (props) => {
  const signIn = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!signIn.isLogin) {
      navigate('/');
    }
  }, [signIn.isLogin, navigate]);

  const { data: walletData, isLoading, isError, error } = useQuery(
    'sellerWallet', () => getWalletData(signIn.id), {
    staleTime: 2000,
  }
  );


  useEffect(() => {
    // console.log(walletData);
  }, [walletData]); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행


  let content = <p>Found no Wallet.</p>;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );
  } else if (walletData[1] !== undefined) {
    content =
      <div>
        {Object.entries(walletData).map(([key, value], index) => (
          <div key={index} className={classes.wallet}>
            <span className={classes.wallet_name}>{walletArr[key]}: </span>
            <span className={classes.wallet_value}>{value}</span>
            <br />
            <br />
          </div>
        ))}
        <br />
        <br />

        <Wallet
          showModal={props.onShowModal}
          walletData={walletData}
        />
      </div>
  }
  else {
    content =
      <>
        <p>Found no Wallet.</p>
        <br />
        <br />
        <br />
        <Wallet
          showModal={props.onShowModal}
          walletData={walletData}
        />
      </>
  }

  return (
    <div className={classes.walletview_wrap}>
      <div className={classes.walletview}>
        <div className={classes.walletview_text}>지갑조회/등록</div>
        <div className={classes.walleview_components_wrap}>
          <div className={classes.component}>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching wallet data</p>}
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletView;