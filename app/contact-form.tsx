"use client";

import { EMAIL } from "./content";

// No backend: the form hands the message to the visitor's mail client.
export function ContactForm() {
  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = String(data.get("subject") || "Hello");
    const body = `${data.get("message")}\n\n${data.get("name")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="form" onSubmit={send} aria-label="Contact form">
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="subject">Subject</label>
        <input id="subject" name="subject" type="text" placeholder="Internship, co-op, collab…" />
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required />
      </div>
      <div className="btn-row">
        <button type="submit" className="btn">
          Send message
        </button>
        <span className="form-note">Opens your mail app</span>
      </div>
    </form>
  );
}
