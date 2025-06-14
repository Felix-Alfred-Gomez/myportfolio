import { LuLink } from "react-icons/lu";

export default function CopyPortfolioLinkButton({ onClick }) {
  return (
    <button
      className="button-template copy-url"
      onClick={onClick}
      title="Copier le lien public"
      style={{ left: 20, bottom: 160 }}
    >
      <LuLink className="button-template-icon" />
    </button>
  );
}
