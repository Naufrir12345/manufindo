"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useMotionValue, useSpring, useInView } from 'framer-motion';

const Counter = ({ value }: { value: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
        return () => unsubscribe();
    }, [springValue]);

    return <span ref={ref}>{displayValue}</span>;
};

export default function StatsSection() {
    return (
        <section className="py-16 md:py-24 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

                    {/* Stat 1: Customer */}
                    <div className="space-y-2">
                        <h3 className="text-4xl md:text-5xl font-bold text-blue-600 flex justify-center items-center">
                            <Counter value={17} />
                            <span>+</span>
                        </h3>
                        <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Happy Customers</p>
                    </div>

                    {/* Stat 2: Projects */}
                    <div className="space-y-2">
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 flex justify-center items-center">
                            <Counter value={25} />
                            <span>+</span>
                        </h3>
                        <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Projects Completed</p>
                    </div>

                    {/* Stat 3: Cities */}
                    <div className="space-y-2">
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 flex justify-center items-center">
                            <Counter value={5} />
                            <span>+</span>
                        </h3>
                        <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Cities Covered</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
