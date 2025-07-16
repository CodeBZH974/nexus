import { Box } from '@mui/material';

const Logo = () => (
  <Box sx={{ width: 230, height: 80 }}>
    <svg width="100%" height="100%" viewBox="0 0 230 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#1A3A6D', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#00C49A', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g transform="translate(5, 15)">
        <text
          x="0"
          y="35"
          fontFamily="Montserrat, sans-serif"
          fontSize="30"
          fontWeight="bold"
          fill="#1A3A6D"
          style={{ fontVariant: 'small-caps' }}
        >
          Ne
        </text>
        <g transform="translate(45, 5)">
          <path
            d="M0 30 Q15 15, 30 0"
            stroke="#1A3A6D"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M0 0 Q15 15, 30 30"
            stroke="url(#logoGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
        </g>
        <text
          x="80"
          y="35"
          fontFamily="Montserrat, sans-serif"
          fontSize="30"
          fontWeight="bold"
          fill="#1A3A6D"
          style={{ fontVariant: 'small-caps' }}
        >
          us
        </text>
        <text
          x="125"
          y="35"
          fontFamily="Montserrat, sans-serif"
          fontSize="30"
          fontWeight="bold"
          fill="#4A5568"
        >
          Flow
        </text>
      </g>
    </svg>
  </Box>
);

export default Logo;
