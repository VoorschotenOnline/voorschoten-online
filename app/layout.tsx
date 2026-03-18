import "./styles.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voorschoten Online",
  description: "Alles wat speelt in Voorschoten, automatisch samengebracht."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <div className="wrap">
              <div>
                <h1 className="brand">Voorschoten Online</h1>
                <p className="tagline">Alles wat speelt in Voorschoten, automatisch samengebracht.</p>
              </div>
              <nav className="nav">
  <a href="/">Home</a>
  <a href="/agenda">Agenda</a>
  <a href="/persbericht">Persbericht</a>
<a href="/ai-demo">AI Demo</a>
</nav>
            </div>
          </header>
          <main className="wrap">{children}</main>
        </div>
      </body>
    </html>
  );
}