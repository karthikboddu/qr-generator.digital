import React from 'react';
import { useParams } from 'react-router-dom';
import Generator from './Generator';
import { contentTypes } from '../data/contentTypes';
import NotFound from './NotFound';

const validSlugs = new Set(contentTypes.map(ct => `${ct.id}`));

function GeneratorPage() {
  const { slug } = useParams();

  // Handle dynamic slug paths
  if (!validSlugs.has(slug)) {
    return <NotFound />;
  }

  const currentContentType = contentTypes.find(ct => ct.id === slug);
  
  // This should not happen due to the check above, but for safety
  if (!currentContentType) {
    return <NotFound />;
  }

  return <Generator initialContentType={currentContentType.id} />;
}

export default GeneratorPage;
