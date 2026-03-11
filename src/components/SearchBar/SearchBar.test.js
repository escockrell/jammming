import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('calls onSearch with the input value when Search button is clicked', async () => {
    const onSearch = jest.fn();

    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Enter a song title');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      await userEvent.type(input, 'Hello');
    });
    await act(async () => {
      await userEvent.click(searchButton);
    });

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('Hello');
  });

  it('calls onSearch with empty string when Search is clicked without typing', async () => {
    const onSearch = jest.fn();

    render(<SearchBar onSearch={onSearch} />);

    const searchButton = screen.getByRole('button', { name: /search/i });
    await act(async () => {
      await userEvent.click(searchButton);
    });

    expect(onSearch).toHaveBeenCalledWith('');
  });

  it('updates input value as user types', async () => {
    const onSearch = jest.fn();

    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Enter a song title');
    await act(async () => {
      await userEvent.type(input, 'test query');
    });

    expect(input).toHaveValue('test query');
  });
});
