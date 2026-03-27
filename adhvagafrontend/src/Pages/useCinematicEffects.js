import { useEffect } from "react";

const updateActiveDots = (dots, sections) => {
  let currentId = "";
  const offset = window.scrollY + window.innerHeight * 0.35;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (offset >= top && offset < bottom) {
      currentId = section.id;
    }
  });

  dots.forEach((dot) => {
    const isActive = dot.getAttribute("href") === `#${currentId}`;
    dot.classList.toggle("active", isActive);
  });
};

const runParallax = () => {
  const parallaxImages = document.querySelectorAll(".cinematic-page .cine-parallax-img[data-parallax='true']");
  const viewportHeight = window.innerHeight;

  parallaxImages.forEach((img) => {
    const parent = img.closest(".cine-card");
    if (!parent) {
      return;
    }

    const rect = parent.getBoundingClientRect();
    if (rect.top < viewportHeight && rect.bottom > 0) {
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const move = (progress - 0.5) * 40;
      img.style.transform = `translateY(${move}px)`;
    }
  });
};

const runScrollRise = () => {
  const risingNodes = document.querySelectorAll(".cinematic-page [data-scroll-rise='true']");
  const viewportHeight = window.innerHeight;

  risingNodes.forEach((node) => {
    const parentSection = node.closest("[data-scroll-section='true']") || node.parentElement;
    if (!parentSection) {
      return;
    }

    const rect = parentSection.getBoundingClientRect();
    const rawProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const progress = Math.min(Math.max(rawProgress, 0), 1);
    const anchorMode = node.getAttribute("data-rise-anchor") || "edge";

    let motionProgress = progress;
    if (anchorMode === "center") {
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const maxDelta = (viewportHeight + rect.height) / 2;
      const centered = Math.min(Math.max((sectionCenter - viewportCenter) / maxDelta, -1), 1);
      motionProgress = (centered + 1) / 2;
    }

    const riseMode = node.getAttribute("data-rise-mode") || "enter";
    const opacityMode = node.getAttribute("data-rise-opacity-mode") || "linear";
    const riseDistance = Number(node.getAttribute("data-rise-distance") || 120);
    const startOpacity = Number(node.getAttribute("data-rise-opacity-start") || 0.72);
    const endOpacity = Number(node.getAttribute("data-rise-opacity-end") || 1);
    let y;

    if (riseMode === "symmetric") {
      // Move from +distance (bottom) to -distance (top) with equal range.
      y = (0.5 - motionProgress) * 2 * riseDistance;
    } else {
      y = (1 - motionProgress) * riseDistance;
    }

    let opacity;
    if (opacityMode === "symmetric") {
      const centerFactor = 1 - Math.abs(motionProgress - 0.5) * 2;
      opacity = startOpacity + (endOpacity - startOpacity) * centerFactor;
    } else {
      opacity = startOpacity + (endOpacity - startOpacity) * motionProgress;
    }

    node.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    node.style.opacity = `${opacity.toFixed(3)}`;
  });
};

export default function useCinematicEffects() {
  useEffect(() => {
    const page = document.querySelector(".cinematic-page");
    if (!page) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cursor = page.querySelector(".cine-cursor");
    const sections = Array.from(page.querySelectorAll("section[id]"));
    const dots = Array.from(page.querySelectorAll(".cine-dot"));
    const revealNodes = Array.from(page.querySelectorAll("[data-reveal]"));

    let removeHoverListeners = [];
    let onMouseMove;

    if (!prefersReducedMotion && cursor) {
      onMouseMove = (event) => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
      };

      document.addEventListener("mousemove", onMouseMove);

      const interactiveItems = page.querySelectorAll("button, a");
      removeHoverListeners = Array.from(interactiveItems).map((item) => {
        const handleEnter = () => {
          cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
          cursor.style.opacity = "0.45";
        };

        const handleLeave = () => {
          cursor.style.transform = "translate(-50%, -50%) scale(1)";
          cursor.style.opacity = "1";
        };

        item.addEventListener("mouseenter", handleEnter);
        item.addEventListener("mouseleave", handleLeave);

        return () => {
          item.removeEventListener("mouseenter", handleEnter);
          item.removeEventListener("mouseleave", handleLeave);
        };
      });
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealNodes.forEach((node) => {
      revealObserver.observe(node);
    });

    const onScroll = () => {
      if (dots.length && sections.length) {
        updateActiveDots(dots, sections);
      }

      if (!prefersReducedMotion) {
        runParallax();
        runScrollRise();
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (onMouseMove) {
        document.removeEventListener("mousemove", onMouseMove);
      }

      removeHoverListeners.forEach((removeListener) => removeListener());
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
