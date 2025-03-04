import { motion } from 'framer-motion';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <motion.div
      className={styles.loader}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    >
      🔄
    </motion.div>
  );
};

export default Loader;
