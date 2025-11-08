'use client';

import { useMemo, useState } from 'react';
import { recommendFromHabits, defaultHistory } from '../../lib/habits';

const COMPANIONS = ['alone','friends','partner','family'];
const TOD = ['morning','afternoon','evening','night'];
const WEATHER = ['clear','rainy','cloudy','snowy'];
const LOC = ['home','cinema','transport','outdoor'];
const MOOD = ['happy','neutral','sad','excited','romantic','tired'];

export default function DemoPage() {
  const [history, setHistory] = useState(defaultHistory());
  const [target, setTarget] = useState({ timeOfDay:'evening', weather:'clear', companion:'friends', location:'home', mood:'happy' });

  const recs = useMemo(() => recommendFromHabits({ history, targetContext: target, topK: 8 }), [history, target]);

  return (
    <main>
      <div className="hero">
        <h1>Interactive Habits Demo</h1>
        <p className="small">Compositional transfer: change one facet and see habit-based recommendations adapt.</p>
      </div>

      <div className="card-grid">
        <div className="card">
          <h3>Target context</h3>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr', gap:10}}>
            <LabeledSelect label="Time of day" value={target.timeOfDay} onChange={v=>setTarget(s=>({...s,timeOfDay:v}))} options={TOD} />
            <LabeledSelect label="Weather" value={target.weather} onChange={v=>setTarget(s=>({...s,weather:v}))} options={WEATHER} />
            <LabeledSelect label="Companion" value={target.companion} onChange={v=>setTarget(s=>({...s,companion:v}))} options={COMPANIONS} />
            <LabeledSelect label="Location" value={target.location} onChange={v=>setTarget(s=>({...s,location:v}))} options={LOC} />
            <LabeledSelect label="Mood" value={target.mood} onChange={v=>setTarget(s=>({...s,mood:v}))} options={MOOD} />
          </div>
        </div>

        <div className="card">
          <h3>Recommended behaviors</h3>
          <table className="table">
            <thead>
              <tr><th>Behavior</th><th>Score</th><th>Repetitions</th></tr>
            </thead>
            <tbody>
              {recs.map(r => (
                <tr key={r.behavior}>
                  <td><code>{r.behavior}</code></td>
                  <td>{r.score.toFixed(3)}</td>
                  <td>{r.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="small">Scores aggregate context similarity ? repetition ? reinforcement.</p>
        </div>
      </div>

      <div className="section">
        <h3 style={{marginTop:0}}>History</h3>
        <p className="small">Add observations (behavior + context + rating) to shape habits.</p>
        <HistoryEditor history={history} setHistory={setHistory} />
      </div>

      <div className="section">
        <h3 style={{marginTop:0}}>What this shows</h3>
        <ul>
          <li>Habits accumulate via repetition and positive reinforcement.</li>
          <li>Compositional transfer emerges by matching subsets of context facets.</li>
          <li>Changing one facet recomputes matches and shifts the ranking.</li>
        </ul>
      </div>
    </main>
  );
}

function LabeledSelect({ label, value, onChange, options }) {
  return (
    <label style={{display:'grid', gap:6}}>
      <span className="small">{label}</span>
      <select value={value} className="input" onChange={e=>onChange(e.target.value)}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function HistoryEditor({ history, setHistory }) {
  const [form, setForm] = useState({
    behavior: 'watch_comedy',
    timeOfDay: 'evening', weather: 'clear', companion: 'friends', location: 'home', mood: 'happy',
    reward: 5,
  });

  const add = () => {
    setHistory(prev => [
      ...prev,
      { behavior: form.behavior, reward: Number(form.reward), context: {
        timeOfDay: form.timeOfDay, weather: form.weather, companion: form.companion, location: form.location, mood: form.mood
      }}
    ]);
  };

  return (
    <div className="card">
      <div style={{display:'grid',gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:10}}>
        <LabeledText label="Behavior" value={form.behavior} onChange={v=>setForm(s=>({...s,behavior:v}))} />
        <LabeledSelect label="Time" value={form.timeOfDay} onChange={v=>setForm(s=>({...s,timeOfDay:v}))} options={TOD} />
        <LabeledSelect label="Weather" value={form.weather} onChange={v=>setForm(s=>({...s,weather:v}))} options={WEATHER} />
        <LabeledSelect label="Companion" value={form.companion} onChange={v=>setForm(s=>({...s,companion:v}))} options={COMPANIONS} />
        <LabeledSelect label="Location" value={form.location} onChange={v=>setForm(s=>({...s,location:v}))} options={LOC} />
        <LabeledSelect label="Mood" value={form.mood} onChange={v=>setForm(s=>({...s,mood:v}))} options={MOOD} />
        <LabeledSelect label="Reward (1-5)" value={String(form.reward)} onChange={v=>setForm(s=>({...s,reward:Number(v)}))} options={['1','2','3','4','5']} />
      </div>
      <div style={{marginTop:12}}>
        <button className="button" onClick={add}>Add observation</button>
      </div>
      <table className="table" style={{marginTop:12}}>
        <thead><tr><th>Behavior</th><th>Context</th><th>Reward</th></tr></thead>
        <tbody>
          {history.map((h,i)=> (
            <tr key={i}>
              <td><code>{h.behavior}</code></td>
              <td className="small">{Object.entries(h.context).map(([k,v])=>`${k}:${v}`).join(', ')}</td>
              <td>{h.reward}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LabeledText({ label, value, onChange }) {
  return (
    <label style={{display:'grid', gap:6}}>
      <span className="small">{label}</span>
      <input className="input" value={value} onChange={e=>onChange(e.target.value)} />
    </label>
  );
}
