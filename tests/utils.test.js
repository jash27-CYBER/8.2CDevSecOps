const utils = require('../utils');

describe('utils', () => {
  test('ran_no returns a number within the requested range', () => {
    const result = utils.ran_no(1, 10);

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  test('uid returns a string of the requested length', () => {
    const result = utils.uid(12);

    expect(typeof result).toBe('string');
    expect(result).toHaveLength(12);
  });

  test('uid returns different values across calls', () => {
    const first = utils.uid(12);
    const second = utils.uid(12);

    expect(first).not.toBe(second);
  });

  test('forbidden sets HTTP 403 and sends Forbidden response', () => {
    const response = {
      statusCode: 200,
      headers: {},
      body: '',
      setHeader(name, value) {
        this.headers[name] = value;
      },
      end(body) {
        this.body = body;
      }
    };

    utils.forbidden(response);

    expect(response.statusCode).toBe(403);
    expect(response.headers['Content-Type']).toBe('text/plain');
    expect(response.headers['Content-Length']).toBe(9);
    expect(response.body).toBe('Forbidden');
  });
});