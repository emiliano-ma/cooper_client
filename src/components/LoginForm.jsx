
import React from "react";
import { Button, Form } from 'semantic-ui-react';

const LoginForm = ({ submitFormHandler }) => {
  return (
    <Form onSubmit={submitFormHandler} id="login-form">
    <Form.Field required>
      <label>Email</label>
      <input name="email" type="email" id="email" placeholder='example@mail.com' />
    </Form.Field>
    <Form.Field required>
      <label>Password</label>
      <input name="password" type="password" id="password" placeholder='Password' />
    </Form.Field>
    <Button id="submit" type='submit'>Submit</Button>
    </Form>
  );
};

export default LoginForm;
