import "./StatCard.css";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-content">
        <div>
          <h6 className="stat-title">{title}</h6>
          <h2
            className="stat-value"
            style={{ color: color }}
          >
            {value}
          </h2>
        </div>

        <div
          className="stat-icon"
          style={{ color: color }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;