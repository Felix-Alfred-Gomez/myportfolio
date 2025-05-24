function EmailVerification({ onClose }) {
  return (
    <div className="modal-template" style={{ maxWidth:550 }}>
      <h2 style={{ marginBottom: "1.5rem" }}>Vérification de l'email</h2>
      <p>
        Un email de vérification a été envoyé à votre adresse email, veuillez
        vérifier votre boîte de réception. Vous pourrez ensuite vous connecter.
      </p>
      <button onClick={onClose}>
        Fermer
      </button>
    </div>
  );
}

export default EmailVerification;