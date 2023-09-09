import classes from "./BlockchainManage.module.css";
import { useQuery, useMutation } from "react-query";
import { useContext, useEffect } from 'react';
import UserContext from "../../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";



const fetchBlockchainList = async () => {
  const response = await fetch('https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/brofucntions/sangyunbro/BlockchainOne/readMainBlockchainList');
  if (!response.ok) {
    throw new Error('API 호출이 실패했습니다.');
  }
  return response.json();
};

const fetchSellerChosenList = async (id) => {
  // console.log(id);
  const response = await fetch(`https://asia-northeast3-nangnang-b59c0.cloudfunctions.net/api/brofucntions/sangyunbro/BlockchainTwo/readSellersChosenMainBlockchain?seller_id=${id}`);
  if (!response.ok) {
    throw new Error('API 호출이 실패했습니다.');
  }
  return response.json();
};


const BlockchainManage = () => {
  const signIn = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!signIn.isLogin) {
      navigate('/');
    }
  }, [signIn.isLogin, navigate]);

  const { data: firstData, isLoading: isLoadingFirst } = useQuery(
    "firstData",
    fetchBlockchainList
  );

  const { data: secondData, isLoading: isLoadingSecond } = useQuery(
    "secondData",
    () => fetchSellerChosenList(signIn.id), // argument는 원하는 인수
  );

  const sellerChosen = secondData?.data || [];

  return (
    <div className={classes.blockchainmanage_wrap}>
      <div className={classes.blockchainmanage}>
        <div className={classes.blockchainmanage_text}>블록체인 관리</div>
        <hr className={classes.divider} />
        <div className={classes.payment_blockchain}>
          <h3>결제 가능한 블록체인</h3>
          <br />
          {isLoadingFirst ? (
            <p>Loading list data...</p>
          ) : (
            <table className={classes.blockchain_list}>
              <tbody>
                {Object.entries(firstData.data).map(([key, value]) => (
                  <tr
                    key={key}
                    className={sellerChosen.includes(key) ? classes.unhighlighted_row : classes.highlighted_row}
                  >
                    <td className={classes.td}>
                      {value}
                    </td>
                    {/* {console.log(typeof +key)} */}
                    <td className={classes.td}>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* <button className={classes.edit_button}>수정</button> */}
      </div>
    </div>
  );
};

export default BlockchainManage;