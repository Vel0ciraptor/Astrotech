import './GlassCard.css';

export default function GlassCard({
  children,
  className = '',
  accent = false,
  color,
  noHover = false,
  style = {},
  onClick,
  ...props
}) {
  const classes = [
    'glass-card',
    accent && 'glass-card-accent',
    noHover && 'no-hover',
    className,
  ].filter(Boolean).join(' ');

  const cardStyle = color
    ? { ...style, '--card-color': color }
    : style;

  return (
    <div
      className={classes}
      style={cardStyle}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
