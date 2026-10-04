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
    const data = Object.fromEntries(formData.entries());

    const { data: signUpData, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    if (error) {
      console.error(error.message);
      // এখানে ইউজারকে এরর দেখান (toast/alert ইত্যাদি)
      return;
    }
    console.log(signUpData);
  };

  // onSubmit-এর বাইরে ডিফাইন করা হয়েছে
  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div>
      <Form className="w-full max-w-96 mx-auto pt-10" onSubmit={onSubmit}>
        <Fieldset>
          <Fieldset.Legend>Create Account</Fieldset.Legend>
          <Description>Sign up to get started.</Description>
          <FieldGroup>
            <TextField
              isRequired
              name="name"
              validate={(value) =>
                value.length < 3 ? "Name must be at least 3 characters" : null
              }
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
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) return "Password must be at least 8 characters";
                if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                if (!/[0-9]/.test(value)) return "Password must contain at least one number";
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
            <Button type="button" onPress={signInWithGoogle}>
              Sign Up With Google
            </Button>
          </div>
        </Fieldset>
      </Form>
    </div>
  );
};

export default SignUpPage;