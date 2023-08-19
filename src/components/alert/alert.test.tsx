import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from './alert';

describe('Alert', () => {
  describe('Given that I am playing the game, when I am in need of information, then the alert generates', () => {
    test('Alert activates with message', async () => {
      const myAlert = 'Alert';
      render(<Alert message={myAlert} clearMessageFromAlert={jest.fn()} />);
      const alert = await screen.findByText(myAlert);
      expect(alert).toBeInTheDocument();
    });
  });
});
