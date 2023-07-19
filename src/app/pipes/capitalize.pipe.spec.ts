import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize the first letter of a string', () => {
    const input = 'test';
    const output = 'Test';
    expect(pipe.transform(input)).toEqual(output);
  });

  it('should return empty string if input is empty', () => {
    expect(pipe.transform('')).toEqual('');
  });

  it('should not change a string that is already capitalized', () => {
    const input = 'Test';
    expect(pipe.transform(input)).toEqual(input);
  });
});
