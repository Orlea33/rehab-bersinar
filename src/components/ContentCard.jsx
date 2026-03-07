const ContentCard = ({ content, showConfidence = false, onClick }) => {
  return (
    <div className="content-card" onClick={onClick}>
      <div className="card-image">
        {content.imageUrl ? (
          <img src={content.imageUrl} alt={content.title} />
        ) : (
          <span>{content.icon}</span>
        )}
        {content.recommended && showConfidence && (
          <div className="card-badge recommended">TOP PICK</div>
        )}
      </div>
      <div className="card-content">
        <div className="card-meta">
          <span>⏱️ {content.duration}</span>
          <span>{content.type.toUpperCase()}</span>
        </div>
        <h3>{content.title}</h3>
        <p>{content.description}</p>
      </div>
      {showConfidence && content.confidence > 0 && (
        <div className="card-footer">
          <div className="confidence-score">
            <span>Match:</span>
            <div className="confidence-bar">
              <div className="confidence-fill" style={{ width: `${content.confidence}%` }}></div>
            </div>
            <span>{content.confidence}%</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentCard