import classes from './Wallet.module.css';

const Wallet = (props) => {
  return (
    <>
      <div className={classes.component_components}>
        <div className={classes.component_component_no2}>
          <button
            className={classes.component_component_no2_button}
            onClick={() => props.showModal('name', 'imgUrl')}
          >
            삭제
          </button>
        </div>
      </div>
    </>
  );
};

export default Wallet;
