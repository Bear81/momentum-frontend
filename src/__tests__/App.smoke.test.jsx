/* eslint-env vitest */
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';

test('App renders inside providers without crashing', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>,
    { container: div }
  );
});
