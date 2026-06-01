const notices = [
  '🎉 Summer Robotics Camp 2025 — Registration Now Open!',
  '📚 New State-of-the-Art VR Lab Launching Next Semester',
  '🏆 Grade 8 Team Wins Regional Math Olympiad Gold!',
  '🎨 Annual Art & Design Showcase — This Friday at 5PM',
  '🚀 Apply Now for the 2024-25 Academic Year',
  '📖 Library Extended Hours — Now Open Until 8PM Weekdays',
  '🤖 AI Ethics Workshop — Register Before Seats Fill Up',
  '🌍 Global Model UN Competition — Representing Mind Masters!',
];

export default function NoticeSection() {
  const text = notices.join('   ✦   ');
  const doubled = `${text}   ✦   ${text}`;

  return (
    <div className='bg-[#fcdf46] border-b-4 border-black py-3 overflow-hidden relative'>
      <div
        className='flex animate-marquee whitespace-nowrap select-none'
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        <span className='font-black text-sm md:text-base text-[#483d00] pr-8'>
          {doubled}
        </span>
      </div>
      {/* Fade edges */}
      <div className='absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#fcdf46] to-transparent pointer-events-none z-10' />
      <div className='absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fcdf46] to-transparent pointer-events-none z-10' />
    </div>
  );
}
