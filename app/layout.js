import './globals.css';

export const metadata = {
  title: 'Neuro-Symbolic CARS ? Compositional Habits',
  description: 'Simple neuro-symbolic demo and reference pipeline for LDOS-CoMoDa CARS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div className="badge">Neuro-Symbolic CARS</div>
              <strong>Compositional Habits</strong>
            </div>
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/demo">Demo</a>
              <a href="https://github.com" target="_blank" rel="noreferrer">Code</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
