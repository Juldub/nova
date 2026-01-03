import React, { useEffect, useState } from 'react';
import { Experience, Education } from '../types';
import { cmsService } from '../services/cmsService';
import { Skeleton } from './Skeleton';

const CV: React.FC = () => {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      cmsService.getExperience(),
      cmsService.getEducation()
    ]).then(([expData, eduData]) => {
      setExperience(expData);
      setEducation(eduData);
      setLoading(false);
    });
  }, []);

  return (
    <section id="cv" className="py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-4xl font-bold mb-8">Career Journey</h2>
            <p className="text-slate-400 mb-12 text-lg">
              Passionate about building scalable frontend systems and pushing the boundaries of what's possible on the web.
            </p>
            <div className="space-y-4">
              <div className="glass-morphism p-6 rounded-2xl">
                <h4 className="font-bold text-lg mb-4 text-purple-400">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL', 'Redux', 'D3.js', 'Jest', 'Node.js'].map(skill => (
                    <span key={skill} className="bg-slate-800 px-3 py-1 rounded text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <button className="w-full bg-white text-slate-950 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Resume (PDF)</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mr-3 text-sm">
                  01
                </span>
                Experience
              </h3>
              <div className="space-y-8 border-l-2 border-slate-800 ml-4 pl-8">
                {loading ? (
                  [1, 2].map(i => (
                    <div key={i} className="space-y-2 pb-8">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  ))
                ) : experience.length > 0 ? (
                  experience.map(job => (
                    <div key={job.id} className="relative">
                      <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                        <h4 className="text-xl font-bold text-white">{job.role}</h4>
                        <span className="text-sm font-medium text-slate-500">{job.period}</span>
                      </div>
                      <p className="text-blue-400 font-medium mb-4">{job.company}</p>
                      <p className="text-slate-400 leading-relaxed">{job.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 italic">No experience entries found in Contentful.</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                 <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mr-3 text-sm">
                  02
                </span>
                Education
              </h3>
              <div className="space-y-8 border-l-2 border-slate-800 ml-4 pl-8">
                {loading ? (
                   [1].map(i => (
                    <div key={i} className="space-y-2 pb-4">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  ))
                ) : education.length > 0 ? (
                  education.map(edu => (
                    <div key={edu.id} className="relative">
                      <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-purple-500"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                        <h4 className="text-xl font-bold text-white">{edu.school}</h4>
                        <span className="text-sm font-medium text-slate-500">{edu.year}</span>
                      </div>
                      <p className="text-purple-400 font-medium">{edu.degree}</p>
                    </div>
                  ))
                ) : (
                   <p className="text-slate-500 italic">No education entries found in Contentful.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;