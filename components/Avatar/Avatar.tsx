interface AvatarProps {
  firstChar?: string;
  secondChar?: string;
  style?: object;
}

export const Avatar: React.FC<AvatarProps> = ({
  firstChar,
  secondChar,
  style,
}) => {
  const getFirstChar = () => {
    const first = firstChar?.charAt(0).toUpperCase();
    const second = secondChar ? secondChar.charAt(0).toUpperCase() : "";
    return first + second;
  };

  return (
    <div className="avatar-custom" style={style}>
      {getFirstChar()}
    </div>
  );
};
