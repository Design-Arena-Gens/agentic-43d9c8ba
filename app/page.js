export default function Page() {
  return (
    <main>
      <div className="hero">
        <h1>Compositional Generalization via Habits</h1>
        <p>
          A minimal, practical way to integrate symbolic habit rules with neural ranking for
          Contextual Awareness Recommender Systems (CARS), targeting LDOS-CoMoDa.
        </p>
      </div>

      <section className="section">
        <div className="card-grid">
          <div className="card">
            <h3>Habit principle</h3>
            <p>
              Habits = Context [ Behaviors ( Repetition + Positive Reinforcement ) ]
            </p>
          </div>
          <div className="card">
            <h3>Neuro-symbolic recipe</h3>
            <p>
              Neural scorer for (user, item, context) + differentiable rule regularizer enforcing
              cross-context transfer when contexts are compositionally similar.
            </p>
          </div>
          <div className="card">
            <h3>Try it</h3>
            <p>
              Explore the demo to see habit transfers across novel contexts.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <a className="button" href="/demo">Open interactive demo</a>
      </section>

      <section className="section">
        <h3 style={{marginTop:0}}>Offline training pipeline (Python)</h3>
        <p className="small">
          See the <code>ns_cars</code> folder for a ready-to-run PyTorch pipeline:
          compositionally split data, train a neural scorer with a habit rule regularizer,
          and evaluate CG metrics.
        </p>
      </section>
    </main>
  );
}
