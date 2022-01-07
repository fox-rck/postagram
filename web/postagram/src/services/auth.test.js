import { render, screen } from '@testing-library/react';
import auth from './auth';

test('defaults properly', () => {
    expect(auth.authedUser).toBe(null);
    expect(auth.cb).toBeInstanceOf( Function );
})

test('initalizes properly', () => {
    const fn = () =>{ },
    fn2 = () =>{  };
    // set the tmp fn to the service
    auth.init(fn)
    // ensure the fn is set properly to the service
    expect(auth.cb).toBe( fn );

    expect(auth.cb).not.toBe( fn2 );
})

test('test signin', async () => {
  try {
    const res = await auth.signIn('abc', '123')
    expect(res.status).toBe('success');
  } catch (e) {
    expect(e.status).toBe('error');
  }

})