
function StatCard({ title, value, icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <p>{title}</p>

        <div
          className="stat-icon"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>

      <h2>{value}</h2>
    </div>
  );
}

export default StatCard;
