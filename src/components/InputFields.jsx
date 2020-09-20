import React from "react";
import { Form, Segment } from 'semantic-ui-react';

const InputFields = ({ onChangeHandler }) => {
  return (
    <Segment className="input-form">
      <Form  >
        <Form.Group>
        <Form.Field label='Select gender' control='select' onChange={onChangeHandler} name="gender" id="gender">
            <option value='male'>Male</option>
            <option value='female'>Female</option>
        </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          
          <Form.Field required>
            <label>Distance</label>
            <input onChange={onChangeHandler} name="distance" id="distance" placeholder='Distance' />
          </Form.Field>
          
          <Form.Field required>
            <label>Age</label>
            <input onChange={onChangeHandler} name="age" id="age" placeholder='Age' />
          </Form.Field>
        </Form.Group>
      </Form>
    </Segment>
  );
};

export default InputFields;

