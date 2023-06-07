import { useDispatch, useSelector } from 'react-redux';
import { InputLabel } from './Filter.styled';
import { getFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';
export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  return (
    <InputLabel>
      Find contacts by name
      <input
        type="text"
        onChange={e => dispatch(setFilter(e.target.value))}
        value={filter}
      ></input>
    </InputLabel>
  );
};

// Filter.propTypes = {
//   onChange: PropTypes.func.isRequired,
//   value: PropTypes.string.isRequired,
// };

// onChange={onChange} value={value}
