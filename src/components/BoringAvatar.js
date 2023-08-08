import React from 'react'
import Avatar from 'boring-avatars'
import palette from '../theme/palette';

const BoringAvatar = ({ name, variant = 'marble', size = 40 }) => (
  <Avatar
    size={size}
    name={name}
    variant={variant}
    colors={[
      palette.primary.lighter,
      palette.primary.light,
      palette.primary.main,
      palette.primary.dark,
      palette.primary.darker
    ]}
  />
);

export default BoringAvatar;