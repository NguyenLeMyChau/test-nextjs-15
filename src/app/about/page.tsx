'use client'

import { useRouter } from 'next/navigation'
import { Button } from 'react-bootstrap';

const About = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/");
    }

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                About
            </h1>

            <br />

            <button
                className='inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset'
                onClick={handleClick}>
                Use TailwindCSS
            </button>

            <br /> <br />


            <Button onClick={handleClick} variant="primary">Use Bootstrap</Button>

        </div>
    );
}

export default About;
