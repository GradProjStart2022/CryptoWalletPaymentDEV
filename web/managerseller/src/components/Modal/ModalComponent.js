import Modal from './Modal';
import classes from './ModalComponent.module.css';
import Web3 from 'web3';
import { useState } from 'react';

const ModalComponent = (props) => {
  const [balanceResult, setBalanceResult] = useState('');
  const [error, setError] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [isAddressValid, setAddressValid] = useState(false);

  const propsname = props.WalletName;
  const propsImageUrl = props.WalletImageUrl;
  const eth = 'ether';

  const requestData = {
    walletAddress,
    tokenName: 'ETH',
  };

  const url =
    'https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/brofucntions/sangyunbro/WalletOne/createSellerChosenWalletFunc';

  const handleAddressChange = (e) => {
    setWalletAddress(e.target.value);
  };

  /* 아직 미완성 */
  const handleRegistration = () => {
    if (isAddressValid) {
      console.log(`지갑 주소 등록: `, walletAddress);
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('응답 데이터:', data);

          // 데이터 처리 및 UI 업데이트 등 필요한 작업을 수행합니다.
        })
        .catch((error) => {
          console.error('요청 에러:', error);

          // 에러 처리 등 필요한 작업을 수행합니다.
        });
    } else {
      console.log(`조회되지 않은 주소입니다. 등록할 수 없습니다.`);
    }
  };

  const buttonHandler = () => {
    // 사용자가 입력한 지갑 주소 가져오기
    const address = document.getElementById('walletAddress').value;

    // Web3 인스턴스 생성
    const web3 = new Web3(
      new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/API-KEY')
    );
    // 주소 조회하기
    web3.eth
      .getBalance(address)
      .then((balance) => {
        const etherBalance = web3.utils.fromWei(balance, eth);
        const etherBalanceFixed = (+etherBalance).toFixed(6);
        console.log('조회 결과 (Ether):', etherBalanceFixed);
        setAddressValid(true);
        setBalanceResult(etherBalanceFixed.toString());
        setError(null); // 에러 상태 초기화
        // 조회된 결과를 처리하고 UI에 표시하는 로직을 추가하세요
      })
      .catch((error) => {
        console.error('조회 에러:', error);
        setError('조회 실패');
        setBalanceResult(null); // 조회 결과 초기화
        // 조회가 실패한 경우 에러 메시지를 UI에 표시하는 로직을 추가하세요
      });
  };

  return (
    <Modal>
      <div className={classes.wrap}>
        <h1 className={classes.title}>지갑 등록</h1>
        <div className={classes.wallet}>
          <img
            className={classes.walletimg}
            src={propsImageUrl}
            alt="이미지 파일"
          />
          <h2 className={classes.walletname}>{propsname}</h2>
        </div>
        <div className={classes.address}>
          <input
            id={'walletAddress'}
            className={classes.inputaddress}
            type={'text'}
            placeholder="0x..."
            onChange={handleAddressChange}
          />
          <button
            className={classes.buttonaddress}
            type="submit"
            onClick={buttonHandler}
          >
            조회
          </button>
        </div>
        <div className={classes.assetwrap}>
          <div className={classes.asset}>
            <h3 className={classes.currentasset}>자금 현황</h3>
            <ul className={classes.list}>
              <li className={classes.coinname}>
                {balanceResult && (
                  <p>
                    {eth}: {balanceResult}
                  </p>
                )}
                {error && <p>{error}</p>}
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.buttons}>
          <button
            className={classes.completebutton}
            onClick={handleRegistration}
            disabled={!isAddressValid}
          >
            등록
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
