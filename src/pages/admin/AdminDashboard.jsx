import { FiFileText, FiEye, FiUsers, FiMessageCircle } from "react-icons/fi";
import StatCard from "../../components/admin/StatCard";
import "./AdminDashboard.css";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Posts",
      value: "1,000",
      subtitle: "+992 published",
      icon: <FiFileText />,
    },
    {
      title: "Total Views",
      value: "34.5k",
      subtitle: "+12.5% from last week",
      icon: <FiEye />,
    },
    {
      title: "Total Users",
      value: "573",
      subtitle: "+201 new this month",
      icon: <FiUsers />,
    },
    {
      title: "Comments",
      value: "50",
      subtitle: "+120 today",
      icon: <FiMessageCircle />,
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Dashboard</h2>
          <p className="dashboard-subtitle">
            Welcome back, Ali! Here&apos;s what&apos;s happening with your
            content today.
          </p>
        </div>

        <button className="dashboard-report-btn">View Reports</button>
      </div>

      <div className="dashboard-stats-grid">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="dashboard-charts-grid">
        <div className="dashboard-chart-card dashboard-chart-large">
          <div className="dashboard-chart-header">
            <div>
              <h3>Weekly Analytics</h3>
              <p>Track performance and publishing activity over time</p>
            </div>
          </div>

          <div className="chart-placeholder">
            <div className="chart-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>Chart will go here</p>
          </div>
        </div>

        <div className="dashboard-chart-card dashboard-chart-small">
          <div className="dashboard-chart-header">
            <div>
              <h3>Content Distribution</h3>
              <p>Posts split by content category</p>
            </div>
          </div>

          <div className="chart-placeholder chart-placeholder-circle">
            <div className="fake-donut"></div>
            <p>Pie / donut chart will go here</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;