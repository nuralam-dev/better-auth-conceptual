"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const SignUpPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    console.log(data);
    const { data: signUpData, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });
    console.log(signUpData, error, "after create account");
  };
  return (
    <div>
      <Form className="w-full max-w-96 mx-auto pt-10" onSubmit={onSubmit}>
        <Fieldset>
          <Fieldset.Legend>Profile Settings</Fieldset.Legend>
          <Description>Update your profile information.</Description>
          <FieldGroup>
            <TextField
              isRequired
              name="name"
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }
                return null;
              }}
            >
              <Label>Name</Label>
              <Input placeholder="John Doe" />
              <FieldError />
            </TextField>
            <TextField isRequired name="email" type="email">
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label>Password</Label>
              <Input placeholder="Enter your password" />
              <Description>
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError />
            </TextField>
          </FieldGroup>
          <div className="flex gap-2">
            <Button type="submit">Submit</Button>
            <Button type="reset" variant="secondary">
              Reset
            </Button>
          </div>
        </Fieldset>
      </Form>
    </div>
  );
};

export default SignUpPage;
