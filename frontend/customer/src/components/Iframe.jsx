import React from 'react';

function Iframe({ src, width, height, style, allowFullScreen, loading, referrerPolicy }) {
    return (
        // eslint-disable-next-line jsx-a11y/iframe-has-title
        <iframe
            src={src}
            width={width}
            height={height}
            style={style}
            allowFullScreen={allowFullScreen}
            loading={loading}
            referrerPolicy={referrerPolicy}
            frameBorder="0"
        ></iframe>
    );
}

export default Iframe;
