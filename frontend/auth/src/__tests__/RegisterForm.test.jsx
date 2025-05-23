import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '../pages/RegisterPage';
import * as authApi from '../api/authApi';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
const createMockStore = require('redux-mock-store').default;

// Захардкоженный thunk
const thunk = ({ dispatch, getState }) => next => action =>
  typeof action === 'function' ? action(dispatch, getState) : next(action);

// Моки API
jest.mock('../api/authApi', () => ({
  registerApi: jest.fn(),
  loginApi: jest.fn(),
}));

// Мок useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

const mockStore = createMockStore([thunk]);
const store = mockStore({ user: {} });

describe('RegisterPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('успешно регистрирует и перенаправляет пользователя', async () => {
    authApi.registerApi.mockResolvedValue({});
    authApi.loginApi.mockResolvedValue({ role: 'user' });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    await waitFor(() => {
      expect(authApi.registerApi).toHaveBeenCalledWith('test@example.com', '123456');
      expect(authApi.loginApi).toHaveBeenCalledWith('test@example.com', '123456');
      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('отображает ошибки при пустых полях', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    expect(screen.getByText(/введите email/i)).toBeInTheDocument();
    expect(screen.getByText(/введите пароль/i)).toBeInTheDocument();
  });

  it('отображает ошибку при неудачной регистрации', async () => {
    authApi.registerApi.mockRejectedValue(new Error('Ошибка'));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'fail@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    await waitFor(() => {
      expect(screen.getByText(/ошибка регистрации/i)).toBeInTheDocument();
    });
  });
});
