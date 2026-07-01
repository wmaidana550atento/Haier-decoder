const { useState } = React;

function ResultCard({ result }) {
  const items = [
    { label: "Tipo de aparelho", value: result.tipoAparato },
    { label: "Fábrica", value: result.fabrica },
    { label: "Localização", value: result.ubicacionFabrica },
    { label: "Ano de fabrico", value: result.anio },
    { label: "Mês de fabrico", value: result.mes },
    { label: "Semana de fabrico", value: result.semana },
    { label: "Dia do mês", value: result.dia },
    { label: "Nº de série do dia", value: result.numeroSerieDia },
  ];

  return (
    <div className="card">
      <div className="result-title">Resultado para "{result.code}"</div>
      <span className="badge">{result.formato}</span>
      <div className="result-grid">
        {items.map((item) => (
          <div className="result-item" key={item.label}>
            <div className="label">{item.label}</div>
            <div className={"value" + (item.value == null ? " muted" : "")}>
              {item.value == null ? "Não disponível" : item.value}
            </div>
          </div>
        ))}
      </div>
      {result.warnings && result.warnings.length > 0 && (
        <div className="warnings">
          <div className="label">Avisos</div>
          <ul>
            {result.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Não foi possível descodificar o código.");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Não foi possível ligar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Descodificador de Número de Série</h1>
        <p>Identifica o tipo de aparelho, fábrica, ano, mês e semana de fabrico</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <input
              type="text"
              placeholder="Introduz o código de série"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={20}
              autoFocus
            />
            <button type="submit" disabled={loading}>
              {loading ? "A descodificar..." : "Descodificar"}
            </button>
          </div>
          <div className="hint">Aceita códigos de 16 dígitos (Candy/Hoover) ou 20 dígitos (Haier).</div>
        </form>
        {error && <div className="error-box">{error}</div>}
      </div>

      {result && <ResultCard result={result} />}

      <footer>Lidersat · Ferramenta interna de suporte técnico Haier</footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
