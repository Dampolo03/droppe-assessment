import { Avatar } from "../Avatar/Avatar";

export const Header = () => {
  return (
    <header className="main-header">
      <div>
        <h2>Droppe</h2>
        <h2>XMAS</h2>
      </div>
      <div>
        <div className="help">Help</div>
        <Avatar firstChar="Milly" secondChar="Spencer" />
      </div>
    </header>
  );
};
