// Use renderHook and act from @testing-library/react
import { renderHook, act, waitFor } from '@testing-library/react';
import { usePortfolioImage } from './HandlePortfolioImage';
import BackgroundDefault from '../assets/Background_default.jpg';

// Mock Firebase storage functions
jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
}));

const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');

describe('usePortfolioImage', () => {
  const username = 'testuser';
  const CharVarName = 'profile.jpg';
  const refreshKey = 0;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches image URL successfully', async () => {
    getDownloadURL.mockResolvedValue('https://mockurl.com/image.jpg');
    const { result } = renderHook(() =>
      usePortfolioImage(username, CharVarName, refreshKey)
    );
    await waitFor(() => expect(result.current.imageUrl).toBe('https://mockurl.com/image.jpg'));
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets default background if image not found', async () => {
    getDownloadURL.mockRejectedValue(new Error('Not found'));
    const { result } = renderHook(() =>
      usePortfolioImage(username, CharVarName, refreshKey)
    );
    await waitFor(() => expect(result.current.imageUrl).toBe(BackgroundDefault));
    expect(result.current.error).toMatch(/Error fetching image/);
    expect(result.current.loading).toBe(false);
  });

  it('returns null imageUrl if username or CharVarName is missing', async () => {
    const { result } = renderHook(() =>
      usePortfolioImage('', '', refreshKey)
    );
    await waitFor(() => expect(result.current.imageUrl).toBeNull());
    expect(result.current.loading).toBe(false);
  });

  it('uploads image and updates imageUrl', async () => {
    const file = new File(['dummy'], 'test.jpg', { type: 'image/jpeg' });
    uploadBytes.mockResolvedValue({});
    getDownloadURL.mockResolvedValue('https://mockurl.com/uploaded.jpg');
    const { result } = renderHook(() =>
      usePortfolioImage(username, CharVarName, refreshKey)
    );
    await waitFor(() => result.current.loading === false);
    await act(async () => {
      await result.current.handleImageUpload({ target: { files: [file] } });
    });
    await waitFor(() => expect(result.current.imageUrl).toBe('https://mockurl.com/uploaded.jpg'));
    expect(result.current.error).toBeNull();
  });

  it('shows error if upload fails', async () => {
    const file = new File(['dummy'], 'test.jpg', { type: 'image/jpeg' });
    uploadBytes.mockRejectedValue(new Error('Upload failed'));
    getDownloadURL.mockResolvedValue('https://mockurl.com/uploaded.jpg');
    const { result } = renderHook(() =>
      usePortfolioImage(username, CharVarName, refreshKey)
    );
    await waitFor(() => result.current.loading === false);
    await act(async () => {
      await result.current.handleImageUpload({ target: { files: [file] } });
    });
    await waitFor(() => expect(result.current.error).toMatch(/Error uploading/));
    expect(result.current.imageUrl).toBe(BackgroundDefault);
  });

  it('shows error if file is too large', async () => {
    const file = new File(['a'.repeat(11 * 1024 * 1024)], 'big.jpg', { type: 'image/jpeg' });
    const { result } = renderHook(() =>
      usePortfolioImage(username, CharVarName, refreshKey)
    );
    await waitFor(() => result.current.loading === false);
    await act(async () => {
      await result.current.handleImageUpload({ target: { files: [file] } });
    });
    expect(result.current.error).toBe('Image size must be less than 10MB.');
  });
});
