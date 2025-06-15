import { LuLink } from "react-icons/lu";

export default function CopyPortfolioLinkButton({ onClick }) {
  return (
    <button
      className="button-template copy-url"
      onClick={onClick}
      title="Copier le lien public"
    >
      <LuLink className="button-template-icon" />
    </button>
  );
}
