import React from 'react';

const MicInput = ({ onSpeech }) => {
    return (
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors" onClick={() => console.log('Mic clicked')}>
            🎤
        </button>
    );
};

export default MicInput;
