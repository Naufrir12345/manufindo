"use client";
import React from 'react';
import { Calendar, CheckCircle2, Target } from 'lucide-react';

interface TimelineItem {
    sprint: string;
    week: string;
    deliverable: string;
    description: string;
    status: 'completed' | 'in-progress' | 'upcoming';
}

interface ProjectTimelineProps {
    timeline: TimelineItem[];
    useCaseTitle: string;
}

const ProjectTimeline = ({ timeline, useCaseTitle }: ProjectTimelineProps) => {
    return (
        <div className="mt-24 border-t border-slate-100 pt-20">
            <div className="text-center mb-16">
                <h3 className="text-3xl font-black text-slate-900 mb-4">
                    Project <span className="text-blue-600">Timeline</span>
                </h3>
                <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                    Rencana implementasi {useCaseTitle} dengan timeline sprint yang terstruktur dan jelas
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-200" />

                    <div className="space-y-8">
                        {timeline.map((item, idx) => {
                            const isEven = idx % 2 === 0;

                            return (
                                <div key={idx} className="relative">
                                    {/* Timeline Dot */}
                                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 items-center justify-center z-10">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.status === 'completed'
                                                ? 'bg-green-500 text-white'
                                                : item.status === 'in-progress'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-slate-200 text-slate-400'
                                            }`}>
                                            {item.status === 'completed' ? (
                                                <CheckCircle2 size={20} />
                                            ) : (
                                                <Target size={20} />
                                            )}
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`md:grid md:grid-cols-2 md:gap-8 ${isEven ? '' : 'md:grid-flow-dense'}`}>
                                        {/* Empty space for opposite side */}
                                        <div className={`hidden md:block ${isEven ? '' : 'md:col-start-2'}`} />

                                        {/* Content */}
                                        <div className={`${isEven ? '' : 'md:col-start-1 md:text-right'}`}>
                                            <div className={`bg-white rounded-2xl p-6 border-2 ${item.status === 'completed'
                                                    ? 'border-green-200 bg-green-50/30'
                                                    : item.status === 'in-progress'
                                                        ? 'border-blue-200 bg-blue-50/30'
                                                        : 'border-slate-100'
                                                } shadow-sm`}>
                                                {/* Sprint Badge */}
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 ${item.status === 'completed'
                                                        ? 'bg-green-100 text-green-700'
                                                        : item.status === 'in-progress'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    <Calendar size={14} />
                                                    <span className="text-xs font-bold uppercase tracking-wide">
                                                        {item.sprint} • {item.week}
                                                    </span>
                                                </div>

                                                {/* Deliverable */}
                                                <h4 className="text-lg font-bold text-slate-900 mb-2">
                                                    {item.deliverable}
                                                </h4>

                                                {/* Description */}
                                                <p className="text-sm text-slate-600 leading-relaxed">
                                                    {item.description}
                                                </p>

                                                {/* Status Indicator */}
                                                <div className="mt-4 pt-4 border-t border-slate-100">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${item.status === 'completed'
                                                                ? 'bg-green-500'
                                                                : item.status === 'in-progress'
                                                                    ? 'bg-blue-500'
                                                                    : 'bg-slate-300'
                                                            }`} />
                                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                                            {item.status === 'completed'
                                                                ? 'Completed'
                                                                : item.status === 'in-progress'
                                                                    ? 'In Progress'
                                                                    : 'Upcoming'
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectTimeline;
