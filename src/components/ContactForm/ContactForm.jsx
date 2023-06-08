import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Form, ErrorMessage, FormField, Button } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import { toast } from 'react-hot-toast';

const phoneRegExp =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .max(30, 'The max number of characters is 30!')
    .required('Enter a name'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Enter a phone number'),
});
export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const onSubmit = (valuesFormik, actionsFormik) => {
    if (contacts.find(({ name }) => name === valuesFormik.name)) {
      return toast.error(`${valuesFormik.name} is already in contacts`);
    }
    dispatch(addContact(valuesFormik));
    actionsFormik.resetForm({ valuesFormik: { name: '', phone: '' } });
  };
  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
      }}
      validationSchema={ContactSchema}
      onSubmit={(values, actions) => {
        onSubmit(values, actions);
      }}
    >
      <Form>
        <FormField>
          Name
          <Field name="name" />
          <ErrorMessage name="name" component="p" />
        </FormField>
        <FormField>
          Number
          <Field name="phone" />
          <ErrorMessage name="phone" component="p" />
        </FormField>
        <Button type="submit">Add contact</Button>
      </Form>
    </Formik>
  );
};
