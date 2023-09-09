import Modal from './Modal';
import classes from './ModalComponent.module.css';
import { useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import UserContext from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const walletArr = ["MetaMask", "TrustWallet", "Bitpay", "Argent", "Rainbow", "taehwanWallet"];

async function getWalletData(id) {
  const response = await fetch(
    `https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/brofucntions/sangyunbro/WalletTwo/chosenwallet?seller_id=${id}`
  );
  const data = await response.json();

  return data.data;
}

const ModalComponent = (props) => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  const signIn = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!signIn.isLogin) {
      navigate('/');
    }
  }, [signIn.isLogin, navigate]);



  const onDeleteSubmit = async (selectedWallet) => {
    // console.log(typeof selectedWallet);
    try {
      // 판매자 ID와 선택한 지갑 인덱스를 사용하여 API 요청을 생성
      const response = await fetch('https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/brofucntions/sangyunbro/WalletTwo/chosenwallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "seller_id": `${signIn.id}`, // 판매자 ID
          "crypto_wallet_idx": `${selectedWallet}`, // 선택한 지갑 인덱스
        }),
      });

      if (!response.ok) {
        throw new Error('API 호출이 실패했습니다.');
      }

      const data = await response.json();

      if (data === 1) {
        // 삭제에 성공한 경우
        console.log('지갑 삭제 성공');
        // 추가적인 처리를 수행할 수 있습니다.
      } else {
        // 삭제에 실패한 경우
        console.log('지갑 삭제 실패');
        // 실패에 대한 처리를 수행할 수 있습니다.
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      // 오류 처리를 수행할 수 있습니다.
    }
  };

  const { data: walletData, isLoading, isError, error } = useQuery(
    'sellerWallet', () => getWalletData(signIn.id), {
    staleTime: 2000,
  }
  );


  useEffect(() => {
  }, [walletData]); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  const handleCheckboxChange = (key) => {
    if (selectedWallet === key) {
      // 이미 선택한 항목을 클릭하면 선택 해제
      setSelectedWallet(null);
    } else {
      // 다른 항목을 클릭하면 선택
      setSelectedWallet(key);
    }
  };

  const handleDeleteClick = () => {
    if (selectedWallet !== null) {
      // 선택한 항목을 삭제하는 함수 호출
      onDeleteSubmit(selectedWallet);
      setSelectedWallet(null); // 선택 해제
    }
  };


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
            <input
              type="checkbox"
              checked={selectedWallet === key}
              onChange={() => handleCheckboxChange(key)}
            />
            <span className={classes.wallet_name}>{walletArr[key]}: </span>
            <span className={classes.wallet_value}>{value}</span>
            <br />
            <br />
          </div>
        ))}
        <br />
        <br />
      </div>
  }
  else {
    content =
      <>
        <p>Found no Wallet.</p>
        <br />
        <br />
        <br />
      </>
  }


  return (
    <Modal>
      <div className={classes.wrap}>
        <h1 className={classes.title}>지갑 삭제</h1>

        <div className={classes.address}>

        </div>
        <div className={classes.assetwrap}>
          {content}
        </div>
        <div className={classes.buttons}>
          <button
            className={classes.completebutton}
            onClick={() => {
              props.onHideModal();
              handleDeleteClick();
            }}
          >
            삭제
          </button>
          <button onClick={props.onHideModal} className={classes.backbutton}>
            돌아가기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
