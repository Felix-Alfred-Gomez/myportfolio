export default function BurgerIcon({ onClick, isOpen }) {
  return (
    <div
      className={`burger-icon${isOpen ? " open" : ""}`}
      onClick={onClick}
      aria-label="Ouvrir le menu"
      tabIndex={0}
      role="button"
      onKeyPress={e => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      <div />
      <div />
      <div />
    </div>
  );
}