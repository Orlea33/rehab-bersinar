import { useState } from 'react';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import MLFeature from '../components/MLFeature';
import FeaturedContent from '../components/FeaturedContent';
import ComparisonSection from '../components/ComparisonSection';
import ContentDetailModal from '../components/ContentDetailModal'; // impor modal

const Home = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (content) => {
    setSelectedContent(content);
    setShowModal(true);
  };

  return (
    <>
      <Hero />
      <StatsBar />
      <MLFeature />
      <FeaturedContent onCardClick={handleCardClick} /> {/* kirim fungsi */}
      <ComparisonSection />
      {showModal && (
        <ContentDetailModal content={selectedContent} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Home;