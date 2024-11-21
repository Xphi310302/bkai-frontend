interface PerformanceMetricProps {
  label: string;
  value: string;
  color: string;
  subtext?: string;
}

export function PerformanceMetric({
  label,
  value,
  color,
  subtext,
}: PerformanceMetricProps) {
  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
      {subtext && <div className="text-xs text-gray-400 mt-1">{subtext}</div>}
    </div>
  );
}
