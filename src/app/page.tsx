import React from 'react';
import Link from 'next/link';




const HomePage = () => {
    return (
        <div>
            <nav>
                <Link href={`/dashboard/audioplayer`}>audio - player</Link>
                <br></br>
                <Link href={`/dashboard/sentenceplayer`}>sentence - player</Link>
            </nav>
        </div>
    );
};

export default HomePage;
