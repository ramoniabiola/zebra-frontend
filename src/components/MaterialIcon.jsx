const MaterialIcon = ({
  name,
  active = false,
  className = "",
}) => {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: `
          'FILL' ${active ? 1 : 0},
          'wght' ${400},
          'GRAD' 0,
          'opsz' 24
        `,
      }}
    >
      {name}
    </span>
  );
};

export default MaterialIcon;