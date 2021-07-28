import PropTypes from "prop-types";

import styles from "./Filter.module.css";

const Filter = ( {filter, onChange} ) => {
  return (
    <>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        value = {filter}
        onChange={({ target }) => onChange(target.value)}
        name="filter"
        title=""
        required
        className={styles.input}
      />
    </>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
