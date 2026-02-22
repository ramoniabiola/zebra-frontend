const MaterialIcon = ({
  name,
  active = false,
  className = "",
  fill = 0,
}) => {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: `
          'FILL' ${fill},
          'wght' ${active ? 500 : 300},
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