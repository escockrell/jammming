/**
 * App integration test - verifies Search flow from SearchBar through to search results
 */
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock Spotify module
jest.mock('../../util/Spotify', () => ({
  __esModule: true,
  default: {
    search: jest.fn(() => Promise.resolve([])),
    savePlaylist: jest.fn(() => Promise.resolve()),
  },
}));

const Spotify = require('../../util/Spotify').default;

describe('App Search flow', () => {
  beforeEach(() => {
    Spotify.search.mockClear();
    Spotify.search.mockResolvedValue([]);
  });

  it('calls Spotify.search when user types and clicks Search', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Enter a song title');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      await userEvent.type(input, 'Bohemian Rhapsody');
    });
    await act(async () => {
      await userEvent.click(searchButton);
    });

    expect(Spotify.search).toHaveBeenCalledTimes(1);
    expect(Spotify.search).toHaveBeenCalledWith('Bohemian Rhapsody');
  });

  it('displays search results when Spotify returns tracks', async () => {
    const mockTracks = [
      {
        id: '1',
        name: 'Test Song',
        artist: 'Test Artist',
        album: 'Test Album',
        uri: 'spotify:track:1',
      },
    ];

    Spotify.search.mockResolvedValue(mockTracks);

    render(<App />);

    const input = screen.getByPlaceholderText('Enter a song title');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      await userEvent.type(input, 'test');
      await userEvent.click(searchButton);
    });

    expect(await screen.findByText('Test Song')).toBeInTheDocument();
    expect(await screen.findByText(/Test Artist/)).toBeInTheDocument();
  });
});
