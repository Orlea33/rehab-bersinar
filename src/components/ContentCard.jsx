import { Clock, Play, FileText, Image as ImageIcon } from 'lucide-react';

const renderTypeIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'video':
      return <Play size={24} style={{ color: 'white' }} />;
    case 'artikel':
      return <FileText size={24} style={{ color: 'white' }} />;
    case 'infografis':
      return <ImageIcon size={24} style={{ color: 'white' }} />;
    default:
      return null;
  }
};

const ContentCard = ({ content, showConfidence = false, onClick }) => {
  return (
    <div className="content-card" onClick={onClick}>
      <div className="card-image">
        {content.imageUrl ? (
          <img src={content.imageUrl} alt={content.title} />
        ) : (
          <div className="content-type-icon-fallback" style={{ background: 'var(--primary)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justify: 'center' }}>
            {renderTypeIcon(content.type)}
          </div>
        )}
        {content.recommended && showConfidence && (
          <div className="card-badge recommended">TOP PICK</div>
        )}
      </div>
      <div className="card-content">
        <div className="card-meta">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} /> {content.duration} menit
          </span>
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