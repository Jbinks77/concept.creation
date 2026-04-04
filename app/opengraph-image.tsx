import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CC Création — Redesign. Création. Impact.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#070c1a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blue glow top */}
        <div style={{
          position: "absolute",
          top: "-120px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(37,99,235,0.22) 0%, transparent 65%)",
          display: "flex",
        }} />

        {/* Blue glow bottom */}
        <div style={{
          position: "absolute",
          bottom: "-150px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 65%)",
          display: "flex",
        }} />

        {/* Top separator line */}
        <div style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1px",
          height: "80px",
          background: "linear-gradient(to bottom, transparent, rgba(59,130,246,0.5), transparent)",
          display: "flex",
        }} />

        {/* Eyebrow */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "28px",
        }}>
          <div style={{ width: "32px", height: "1px", background: "rgba(59,130,246,0.7)", display: "flex" }} />
          <span style={{
            fontFamily: "sans-serif",
            fontSize: "14px",
            letterSpacing: "0.42em",
            color: "rgba(59,130,246,0.9)",
            textTransform: "uppercase",
          }}>Studio Web Premium</span>
          <div style={{ width: "32px", height: "1px", background: "rgba(59,130,246,0.7)", display: "flex" }} />
        </div>

        {/* Main title */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0px",
          marginBottom: "32px",
        }}>
          <div style={{
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            fontSize: "88px",
            color: "#ffffff",
            letterSpacing: "0.02em",
            lineHeight: 1.05,
            display: "flex",
            gap: "0px",
          }}>
            Redesign.
          </div>
          <div style={{
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            fontSize: "88px",
            color: "rgba(255,255,255,0.28)",
            fontStyle: "italic",
            letterSpacing: "0.02em",
            lineHeight: 1.05,
            display: "flex",
          }}>
            Création. Impact.
          </div>
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: "sans-serif",
          fontWeight: 300,
          fontSize: "20px",
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: "48px",
          display: "flex",
        }}>
          Pour marques, indépendants et entreprises
        </div>

        {/* Bottom domain */}
        <div style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "sans-serif",
          fontSize: "16px",
          letterSpacing: "0.25em",
          color: "rgba(255,255,255,0.2)",
          textTransform: "uppercase",
          display: "flex",
        }}>
          conceptcreation.chagnat.fr
        </div>

        {/* Bottom separator line */}
        <div style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1px",
          height: "60px",
          background: "linear-gradient(to top, transparent, rgba(59,130,246,0.4), transparent)",
          display: "flex",
        }} />
      </div>
    ),
    { ...size }
  );
}
