import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          position: 'relative',
        }}
      >
        {/* Hexagon Shape (Background) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 120"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <g transform="translate(10, 10)">
            <polygon
              points="50,5 93,28 93,72 50,95 7,72 7,28"
              fill="none"
              stroke="#5b4dff"
              strokeWidth="10"
            />
          </g>
        </svg>

        {/* Text "W" (Overlay using HTML instead of SVG <text>) */}
        <div
          style={{
            position: 'absolute',
            color: 'white',
            fontSize: 18, // Adjusted for 32x32 size (approx half of the viewBox scale)
            fontWeight: 900,
            fontFamily: 'sans-serif',
            marginTop: 2, // Optical alignment
          }}
        >
          W
        </div>
      </div>
    ),
    { ...size }
  );
}
