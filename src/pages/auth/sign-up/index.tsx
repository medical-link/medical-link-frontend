import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { titleAtom } from '~/store';

const SignUpPage = () => {
  const setTitleAtom = useSetAtom(titleAtom);

  useEffect(() => {
    setTitleAtom('의료정보');
    return () => setTitleAtom('');
  }, []); return (<div>abcd</div>);
};

export default SignUpPage;
