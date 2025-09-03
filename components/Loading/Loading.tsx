import { HashLoader } from 'react-spinners';
import css from '../Loading/Loading.module.css';

const Loading = () => {
  return (
    <div className={css.loading}>
      <HashLoader />
    </div>
  );
};

export default Loading;
