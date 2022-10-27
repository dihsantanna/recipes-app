import { string } from 'prop-types';
import React from 'react';

export default function Video({ src }) {
  const allow = `accelerometer; autoplay; clipboard-write;
  encrypted-media; gyroscope; picture-in-picture`;
  const videoReplace = src
    ? src.replace(/watch\?v=/, 'embed/') : '';
  return (
    <iframe
      src={ videoReplace }
      title="YouTube video player"
      frameBorder="0"
      allow={ allow }
      allowFullScreen
      data-testid="video"
      className="video"
    />
  );
}

Video.propTypes = {
  src: string.isRequired,
};
