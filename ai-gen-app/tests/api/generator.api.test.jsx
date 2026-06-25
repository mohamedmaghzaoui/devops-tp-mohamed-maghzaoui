import { describe, test, expect, vi, beforeEach } from 'vitest';
import { generateJson, fetchGenerations } from '../../src/api/generator.api';
import { api } from '../../src/api/client';

vi.mock('../../src/api/client', () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('generator.api', () => {
  test('generateJson - should call api.post and return data', async () => {
    api.post.mockResolvedValue({
      data: { success: true },
    });

    const payload = {
      schema: [{ name: 'test' }],
      count: 5,
    };

    const result = await generateJson(payload);

    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith('/generate/', payload);

    expect(result).toEqual({ success: true });
  });

  test('generateJson - should handle error', async () => {
    api.post.mockRejectedValue(new Error('Network error'));

    await expect(generateJson({ schema: [], count: 1 })).rejects.toThrow(
      'Network error'
    );
  });

  test('fetchGenerations - should call api.get and return data', async () => {
    api.get.mockResolvedValue({
      data: [{ id: 1, name: 'gen1' }],
    });

    const result = await fetchGenerations();

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('/generations/');

    expect(result).toEqual([{ id: 1, name: 'gen1' }]);
  });

  test('fetchGenerations - should handle error', async () => {
    api.get.mockRejectedValue(new Error('API failed'));

    await expect(fetchGenerations()).rejects.toThrow('API failed');
  });
});
