// src/pages/auth/Register.jsx
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { applyServerErrors } from '../../utils/applyServerErrors';

const passwordRules =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]{8,}$/;
// >= 8 chars, at least 1 letter & 1 number; widen the charset as needed

const schema = yup.object({
  username: yup
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  email: yup
    .string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  password1: yup
    .string()
    .matches(passwordRules, 'Min 8 chars, at least 1 letter & 1 number')
    .required('Password is required'),
  password2: yup
    .string()
    .oneOf([yup.ref('password1')], 'Passwords do not match')
    .required('Please confirm your password'),
});

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      // success handled by toast & navigate below
    }
  }, [isSubmitSuccessful]);

  const onSubmit = async (values) => {
    try {
      // dj-rest-auth default registration endpoint
      const payload = {
        username: values.username,
        email: values.email,
        password1: values.password1,
        password2: values.password2,
      };
      await axios.post('/dj-rest-auth/registration/', payload);

      toast.success('Account created! Please log in.');
      navigate('/login'); // redirect after successful registration
    } catch (err) {
      applyServerErrors(err, setError, (msg) => toast.error(msg));
    }
  };

  return (
    <div className="container py-4">
      <Card className="mx-auto" style={{ maxWidth: 520 }}>
        <Card.Body>
          <Card.Title className="mb-3">Create an account</Card.Title>

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Username */}
            <Form.Group className="mb-3" controlId="register-username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Choose a username"
                isInvalid={!!errors.username}
                {...register('username')}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3" controlId="register-email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                isInvalid={!!errors.email}
                {...register('email')}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="register-password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter a strong password"
                isInvalid={!!errors.password1}
                autoComplete="new-password"
                {...register('password1')}
              />
              <Form.Text className="text-muted">
                Minimum 8 characters, with at least 1 letter and 1 number.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {errors.password1?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-4" controlId="register-password2">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter your password"
                isInvalid={!!errors.password2}
                autoComplete="new-password"
                {...register('password2')}
              />
              <Form.Control.Feedback type="invalid">
                {/* Explicit, user-visible mismatch message (fixes previous fail) */}
                {errors.password2?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100" disabled={isSubmitting}>
              {isSubmitting ? <Spinner size="sm" /> : 'Create account'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
