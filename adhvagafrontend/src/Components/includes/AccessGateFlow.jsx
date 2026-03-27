import { useEffect, useMemo, useState } from "react";

function AccessGateFrame({ src, title }) {
  return (
    <iframe
      src={src}
      title={title}
      style={{
        width: "100%",
        height: "100dvh",
        border: "0",
        display: "block",
        background: "#000",
      }}
      loading="eager"
      referrerPolicy="strict-origin-when-cross-origin"
      allow="fullscreen"
    />
  );
}

export default function AccessGateFlow({ onComplete }) {
  const [step, setStep] = useState(1);

  const frame = useMemo(() => {
    if (step === 1) {
      return { src: "/stitch-gate/step-1.html", title: "Access Gate Step 1" };
    }

    return { src: "/stitch-gate/step-2.html", title: "Access Gate Step 2" };
  }, [step]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      if (event.data === "adhvaga-gate-step-1-complete") {
        setStep(2);
      }

      if (event.data === "adhvaga-gate-step-2-complete") {
        onComplete();
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#000",
      }}
      aria-label="Access gate"
    >
      <AccessGateFrame src={frame.src} title={frame.title} />
    </div>
  );
}
