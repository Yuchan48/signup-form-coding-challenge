import React from 'react'

const Description: React.FC = () => {
    return (
        <div data-testid="desc_container" className="description">
            <h1 data-testid="desc_h1">Learn to code by watching others</h1>
            <p data-testid="desc_p">See how experienced developers solve problems in real-time. Watching scripted
                tutorials is great, but understanding how developers think is invaluable.</p>
        </div>
    );
}

export default Description;
