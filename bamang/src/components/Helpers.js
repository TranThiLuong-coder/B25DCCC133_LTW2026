import { MAX_LIVES } from '../data';

const Helpers = ({ status, lives, used, onFifty, onSkip, onLife }) => {
  const canUse = status === 'answering';

  return (
    <div className="helpers">
      <button onClick={onFifty} disabled={!canUse || used.fifty}>
        50:50
      </button>
      <button onClick={onSkip} disabled={!canUse || used.skip}>
        Bỏ qua
      </button>
      <button onClick={onLife} disabled={!canUse || used.life || lives >= MAX_LIVES}>
        Thêm 1 mạng
      </button>
    </div>
  );
};

export default Helpers;