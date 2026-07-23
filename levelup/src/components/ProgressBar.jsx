function ProgressBar({ progress }) {
  return (
    <div style={{ marginTop: "40px" }}>
      <h3>Progresso Geral</h3>

      <div className="progress">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p>{progress}%</p>
    </div>
  );
}

export default ProgressBar;