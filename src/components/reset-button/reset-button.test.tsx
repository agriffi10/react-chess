import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ResetButton from './reset-button';

describe('Button', () => {
  describe('Given I am playing a game of chess, when I click this button, then the reset function is called', () => {
    test('Passed in title is displayed', () => {
      const buttonTitle = 'My Button';
      render(<ResetButton buttonTitle={buttonTitle} resetFunc={jest.fn()} />);
      expect(screen.getByText(buttonTitle)).toBeInTheDocument();
    });
    test('Passed in function is called', async () => {
      const buttonTitle = 'My Button';
      const myFunction = jest.fn();
      render(<ResetButton buttonTitle={buttonTitle} resetFunc={myFunction} />);
      const button = screen.getByText(buttonTitle);
      await userEvent.click(button);
      expect(myFunction).toHaveBeenCalled();
    });
  });
});
