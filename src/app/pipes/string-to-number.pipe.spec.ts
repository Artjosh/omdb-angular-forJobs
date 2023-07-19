import { StringToNumberPipe } from './string-to-number.pipe';

describe('StringToNumberPipe', () => {
  let pipe: StringToNumberPipe;

  beforeEach(() => {
    pipe = new StringToNumberPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return 0 for undefined value', () => {
    const result = pipe.transform(undefined);
    expect(result).toEqual(0);
  });

  it('should return a number for a valid string', () => {
    const result = pipe.transform('123');
    expect(result).toEqual(123);
  });

  it('should return NaN for an invalid string', () => {
    const result = pipe.transform('abc');
    expect(result).toBeNaN();
  });
});
