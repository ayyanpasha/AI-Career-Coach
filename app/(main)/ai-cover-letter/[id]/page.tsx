import React from 'react'

interface CoverLetterProps {
    params: {
        id: string;
    };
}

const CoverLetter: React.FC<CoverLetterProps> = async ({ params }) => {
    // await console.log(params.id);
    return (
        <div>{params.id}</div>
    )
}

export default CoverLetter
