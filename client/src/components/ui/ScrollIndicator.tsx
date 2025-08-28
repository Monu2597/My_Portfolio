import { usePortfolio } from "../../lib/stores/usePortfolio";

export default function ScrollIndicator() {
  const { scrollProgress } = usePortfolio();

  return (
    <div className="scroll-indicator">
      <div className="scroll-progress">
        <div 
          className="scroll-bar"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>
      <div className="scroll-text">
        <span>Scroll to explore</span>
      </div>
    </div>
  );
}
