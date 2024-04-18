import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import { SignInForm } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      render(<SignInForm onSubmit={onSubmit} />);

      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'Mr. Tester');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'MrTesterHasNoPassword!!1');
      fireEvent.press(screen.getByText('Sign in'));
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'Mr. Tester',
          password: 'MrTesterHasNoPassword!!1',
        });
      });
    });
  });
});