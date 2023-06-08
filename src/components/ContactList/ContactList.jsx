import { RiDeleteBin5Line } from 'react-icons/ri';
import { List, Item, Button } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  getContacts,
  getFilter,
  getError,
  getIsLoading,
} from 'redux/selectors';

import { deleteContact } from 'redux/operations';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();
  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {filteredContacts.length === 0 && !error && !isLoading ? (
        <b>No contacts</b>
      ) : null}
      <List>
        {filteredContacts.map(({ name, phone, id }) => (
          <Item key={id}>
            {name}: {phone}
            <Button
              type="button"
              aria-label="Delete"
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete <RiDeleteBin5Line />
            </Button>
          </Item>
        ))}
      </List>
    </>
  );
};

// export const ContactList = ({ contacts, onDelete }) => (
//   <List>
//     {contacts.map(({ name, number, id }) => (
//       <Item key={id}>
//         {name}: {number}
//         <Button type="button" aria-label="Delete" onClick={() => onDelete(id)}>
//           Delete <RiDeleteBin5Line />
//         </Button>
//       </Item>
//     ))}
//   </List>
// );
// ContactList.propTypes = {
//   onDelete: PropTypes.func.isRequired,
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     }).isRequired
//   ),
// };
