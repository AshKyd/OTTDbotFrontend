const colours = {
  "Dark Blue": {
    color: "white",
    background: "blue",
  },
  "Pale Green": {
    color: "black",
    background: "lightgreen",
  },
  Pink: {
    color: "black",
    background: "pink",
  },
  Yellow: {
    color: "black",
    background: "yellow",
  },
  Red: {
    color: "white",
    background: "red",
  },
  "Light Blue": {
    color: "black",
    background: "lightblue",
  },
  Green: {
    color: "white",
    background: "green",
  },
  "Dark Green": {
    color: "white",
    background: "darkgreen",
  },
  Blue: {
    color: "white",
    background: "blue",
  },
  Cream: {
    color: "white",
    background: "#b87050",
  },
  Mauve: {
    color: "black",
    background: "#E0B0FF",
  },
  Purple: {
    color: "white",
    background: "purple",
  },
  Orange: {
    color: "white",
    background: "orange",
  },
  Brown: {
    color: "white",
    background: "brown",
  },
  Grey: {
    color: "white",
    background: "grey",
  },
  White: {
    color: "black",
    background: "lightgray",
  },
  Black: {
    color: "white",
    background: "black",
  },
};

const opposite = {
  black: "#fff4",
  white: "#0004",
};

export default function CompanyColour({ colour, children }) {
  const htmlColour = colour
    .replace("pale", "light")
    .replace(" ", "")
    .toLowerCase();
  return (
    <div
      className="company-colour"
      data-colour={colour}
      style={{
        ...colours[colour],
        textShadow: `1px 1px 0 ${opposite[colours[colour].color]}`,
        padding: "0.25rem 0.5rem",
        borderRadius: "0.2rem",
      }}
    >
      {children}
    </div>
  );
}
