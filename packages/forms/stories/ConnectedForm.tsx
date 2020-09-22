/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import Input from '@xcritical/input';
import Button from '@xcritical/button';

import Select from '@xcritical/select';

import Form, { FormField } from '../src';
import { xcriticalFormError, xcriticalFormInit, xcriticalFormReset } from '../src/actions';
import { formSelector } from '../src/reducer';


const FORM_NAME = 'connectedForm';

const selectItems = [
  { value: 'ff0000', label: 'Red' },
  { value: '00ff00', label: 'Green' },
  { value: '0000ff', label: 'Blue' },
];

const validate = (values) => {
  let errors = {};

  if (values.firstName === null) errors = { firstName: 'First name is required.' };

  if (values.lastName === null) errors = { ...errors, lastName: 'Last name is required.' };

  return errors;
};

const SimpleForm = ({
  formData,
  init,
  reset,
  setErrors,
}) => {
  useEffect(() => {
    init({
      firstName: null,
      lastName: null,
      favoriteColors: [],
      leastFavoriteColor: null,
    });
  }, []);

  return (
    <Form name={ FORM_NAME }>
      <div>
        <label>First Name</label>
        <div>
          <FormField
            name="firstName"
            component={ Input }
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <FormField
            name="lastName"
            component={ Input }
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Favorite Colors</label>
        <div>
          <FormField
            isMulti
            name="favoriteColors"
            component={ Select }
            options={ selectItems }
          />
        </div>
      </div>
      <div>
        <label>Least Favorite Color</label>
        <div>
          <FormField
            name="leastFavoriteColor"
            isClearable
            component={ Select }
            options={ selectItems }
          />
        </div>
      </div>
      <div>
        <Button
          type="submit"
          onClick={ (e) => {
            e.preventDefault();

            const errors = validate(formData.model);
            const isValid = Object.entries(errors).length === 0;

            if (isValid) init(formData.model);
            else setErrors(errors);
          } }
        >
          Submit
        </Button>
        <Button type="button" disabled={ !formData.isChanged } onClick={ reset }>Reset</Button>
      </div>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  formData: formSelector(state, FORM_NAME),
});

const mapDispatchToProps = (dispatch) => ({
  init: (data) => dispatch(xcriticalFormInit(FORM_NAME, data)),
  reset: () => dispatch(xcriticalFormReset(FORM_NAME)),
  setErrors: (errors) => dispatch(xcriticalFormError(FORM_NAME, errors)),
});

export const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SimpleForm);

export default FormContainer;
