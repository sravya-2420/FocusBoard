
function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <p>{title}</p>

        <div className="stat-icon">
          {Icon && <Icon size={20} />}
        </div>
      </div>

      <h2>{value}</h2>
    </div>
  );
}

export default StatCard;
