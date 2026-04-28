import React from 'react';

// Common icon properties
const iconProps = (size = 24, color = 'currentColor', strokeWidth = 2) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "icon-svg"
});

export const Icons = {
  Globe: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Cpu: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="15" x2="23" y2="15" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="15" x2="4" y2="15" />
    </svg>
  ),
  Bot: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  ),
  Zap: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Settings: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  LineChart: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <path d="M3 3v18h18" />
      <path d="M18 9l-5 5-2-2-5 5" />
    </svg>
  ),
  Gem: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M11 3L8 9l3 12" />
      <path d="M13 3l3 6-3 12" />
      <path d="M2 9h20" />
    </svg>
  ),
  Workflow: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M7 10v4h7" />
      <path d="M14 10V6h-4" />
    </svg>
  ),
  LayoutDashboard: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <rect x="3" y="3" width="7" height="9" />
      <rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" />
      <rect x="3" y="16" width="7" height="5" />
    </svg>
  ),
  Briefcase: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Rocket: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3.5 3.5" />
      <path d="M20.2 3.8a4.56 4.56 0 0 0-6.4 0 12 12 0 0 0-1.9 10.3l-2.6 2.6c-.7.7-1 1.7-.7 2.6a1 1 0 0 0 1.2.7c1-.3 2-.6 2.6-1.2l2.6-2.6a12 12 0 0 0 10.3-1.9 4.56 4.56 0 0 0 0-6.4z" />
      <path d="M15 9l-2 2" />
      <path d="M9 15l2 2" />
    </svg>
  ),
  Mail: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Code2: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <path d="M18 16l4-4-4-4" />
      <path d="M6 8l-4 4 4 4" />
      <path d="M14.5 4l-5 16" />
    </svg>
  ),
  Users: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Smartphone: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  ArrowLeft: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  X: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Plus: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Check: ({ size, color, strokeWidth }) => (
    <svg {...iconProps(size, color, strokeWidth)}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
};
