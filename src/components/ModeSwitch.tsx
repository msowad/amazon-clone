import { selectColorMode, setMode, toggleMode } from '@/src/app/colorMode';
import { DarkMode, LightMode } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  //
}

const ModeSwitch: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectColorMode);

  useEffect(() => {
    dispatch(setMode());
  }, [dispatch]);

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={() => dispatch(toggleMode())}
      className='link'
    >
      {darkMode ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export default ModeSwitch;
