import palette from '../theme/palette';

const getColors = () => {
  const colors = [
    palette.primary.lighter,
    palette.primary.light,
    palette.primary.main,
    palette.primary.dark,
    palette.primary.darker
  ];
  colors.forEach((color, index) => colors.splice(index, 1, color.slice(1).toString()));
  return colors.toString();
};

export const boringAvatarGenerator = (text, model) => {
  const encodedText = encodeURIComponent(text);
  return `https://source.boringavatars.com/${model}/20/${encodedText}?colors=${getColors()}`;
};
