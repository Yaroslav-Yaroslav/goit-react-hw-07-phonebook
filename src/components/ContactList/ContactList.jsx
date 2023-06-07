import { RiDeleteBin5Line } from 'react-icons/ri';
import { List, Item, Button } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  console.log('contacts:', contacts);

  const filter = useSelector(getFilter);
  console.log('filter:', filter);
  const dispatch = useDispatch();
  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {filteredContacts.length === 0 ? <h3>No contacts</h3> : null}
      <List>
        {filteredContacts.map(({ name, number, id }) => (
          <Item key={id}>
            {name}: {number}
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
