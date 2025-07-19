import './style.css';

const SkeletonLoader = () => (
  <div className="skeleton-card">
    <div className="skeleton-image-grid">
      <div className="image-container">
        <div className="skeleton-sprite" />
        <div className="sprite-label" style={{ visibility: 'hidden' }}>
          Placeholder
        </div>
      </div>
      <div className="image-container">
        <div className="skeleton-sprite" />
        <div className="sprite-label" style={{ visibility: 'hidden' }}>
          Placeholder
        </div>
      </div>
      <div className="image-container">
        <div className="skeleton-sprite" />
        <div className="sprite-label" style={{ visibility: 'hidden' }}>
          Placeholder
        </div>
      </div>
      <div className="image-container">
        <div className="skeleton-sprite" />
        <div className="sprite-label" style={{ visibility: 'hidden' }}>
          Placeholder
        </div>
      </div>
    </div>
    <div className="skeleton-info">
      <div className="skeleton-title" />
      <div className="skeleton-types">
        <div className="skeleton-badge" />
        <div className="skeleton-badge" />
      </div>
      <div className="skeleton-details">
        <div className="skeleton-detail" />
        <div className="skeleton-detail" />
        <div className="skeleton-detail" />
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
