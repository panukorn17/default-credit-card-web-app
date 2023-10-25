import React, { useEffect, useRef, ReactNode } from 'react';
type SectionProps = {
    children: ReactNode;
  };
const FadeOnScrollDiv: React.FC<SectionProps> = ({ children }) => {
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const targetElement = entry.target as HTMLDivElement;
                
                // Use the intersection ratio to adjust opacity smoothly
                targetElement.style.opacity = `${Math.pow(entry.intersectionRatio, 3)}`; // Using cube to fade faster 
                
            },
            {
                threshold: Array.from({ length: 100 }).map((_, i) => i / 100), // Array of thresholds from 0 to 1 at intervals of 0.01
            }
        );

        if (divRef.current) {
            observer.observe(divRef.current);
        }

        return () => {
            if (divRef.current) {
                observer.unobserve(divRef.current);
            }
        };
    }, []);

    return <div className="FadeOnScrollDiv" ref={divRef}>{children}</div>;
}

export default FadeOnScrollDiv;