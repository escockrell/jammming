/**
 * Spotify module tests - mocks fetch and window.location to isolate search logic
 */
describe('Spotify.search', () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn();

    // Mock window.location and history to simulate having an access token
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost:3000/?access_token=test-token-123&expires_in=3600',
      },
      writable: true,
    });
    window.history.pushState = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.resetModules();
  });

  it('calls Spotify API with correct URL and auth header', async () => {
    global.fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          tracks: { items: [] },
        }),
    });

    const { default: Spotify } = await import('./Spotify');
    await Spotify.search('hello world');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('q=hello%20world'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token-123',
        }),
      })
    );
  });

  it('returns empty array when API returns no tracks', async () => {
    global.fetch.mockResolvedValue({
      json: () => Promise.resolve({}),
    });

    const { default: Spotify } = await import('./Spotify');
    const result = await Spotify.search('test');

    expect(result).toEqual([]);
  });

  it('returns mapped tracks when API returns results', async () => {
    global.fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          tracks: {
            items: [
              {
                id: '1',
                name: 'Song 1',
                artists: [{ name: 'Artist 1' }],
                album: { name: 'Album 1' },
                uri: 'spotify:track:1',
              },
            ],
          },
        }),
    });

    const { default: Spotify } = await import('./Spotify');
    const result = await Spotify.search('test');

    expect(result).toEqual([
      {
        id: '1',
        name: 'Song 1',
        artist: 'Artist 1',
        album: 'Album 1',
        uri: 'spotify:track:1',
      },
    ]);
  });
});
