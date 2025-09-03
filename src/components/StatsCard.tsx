interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: string;
}

const StatsCard = ({ title, value, change, icon }: StatsCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-smoky-navy">{value}</p>
        {change && (
          <div className={`text-sm font-medium ${
            change.type === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change.type === 'increase' ? '↗' : '↘'} {Math.abs(change.value)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard; 