"use client";

import { useState } from "react";

export default function PersberichtPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    organization_name: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    title_original: "",
    body_original: "",
    source_url: ""
  });

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Persbericht verzonden:", form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="card">
        <h1 className="section-title">Persbericht ontvangen</h1>
        <p>Dank je. Het persbericht is opgeslagen in de demo en kan later automatisch door AI worden beoordeeld en herschreven.</p>
        <a href="/persbericht" className="badge" style={{ marginTop: 16 }}>
          Nieuw persbericht insturen
        </a>
      </section>
    );
  }

  return (
    <section className="card">
      <h1 className="section-title">Persbericht insturen</h1>
      <p className="meta" style={{ marginBottom: 20 }}>
        Stuur hier een persbericht in voor Voorschoten Online.
      </p>

      <form onSubmit={handleSubmit} className="article-list">
        <label>
          <div className="meta" style={{ marginBottom: 6 }}>Organisatie</div>
          <input
            name="organization_name"
            value={form.organization_name}
            onChange={updateField}
            required
            style={inputStyle}
          />
        </label>

        <label>
          <div className="meta" style={{ marginBottom: 6 }}>Contactpersoon</div>
          <input
            name="contact_name"
            value={form.contact_name}
            onChange={updateField}
            style={inputStyle}
          />
        </label>

        <label>
          <div className="meta" style={{ marginBottom: 6 }}>E-mailadres</div>
          <input
            type="email"
            name="contact_email"
            value={form.contact_email}
            onChange={updateField}
            required
            style={inputStyle}
          />
        </label>

        <label>
          <div className="meta" style={{ marginBottom: 6 }}>Telefoon</div>
          <input
            name="contact_phone"
            value={form.contact_phone}
            onChange={updateField}
            style={inputStyle}
          />
        </label>

        <label>
          <div className="meta" style={{ marginBottom: 6 }}>Titel</div>
          <input
            name="title_original"
            value={form.title_original}
            onChange={updateField}
            required
            style={inputStyle}
          />
        </label>

        <label>
          <div className="meta" style={{ marginBottom: 6 }}>Bronlink (optioneel)</div>
          <input
            name="source_url"
            value={form.source_url}
            onChange={updateField}
            style={inputStyle}
          />
        </label>

        <label>
          <div className="meta" style={{ marginBottom: 6 }}>Persberichttekst</div>
          <textarea
            name="body_original"
            value={form.body_original}
            onChange={updateField}
            required
            rows={10}
            style={textareaStyle}
          />
        </label>

        <button type="submit" style={buttonStyle}>
          Persbericht verzenden
        </button>
      </form>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  fontSize: 16
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  fontSize: 16,
  fontFamily: "inherit"
};

const buttonStyle: React.CSSProperties = {
  border: "none",
  background: "#111827",
  color: "#fff",
  padding: "14px 18px",
  borderRadius: 14,
  fontWeight: 600,
  cursor: "pointer"
};