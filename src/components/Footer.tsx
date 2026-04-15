import Link from "next/link";

const footerLinks = {
  Explore: [
    { label: "Programs", href: "#programs" },
    { label: "Classes", href: "#schedule" },
    { label: "About", href: "#why-us" },
  ],
  Support: [
    { label: "Contact", href: "#contact" },
    { label: "Help Center", href: "#" },
    { label: "Privacy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full px-8 md:px-12 py-16 flex flex-col md:flex-row justify-between items-start bg-[#fcdf46] text-black border-t-4 border-black gap-12">
      {/* Brand */}
      <div className="flex-shrink-0 max-w-xs">
        <span
          className="text-2xl md:text-3xl font-black mb-4 block uppercase"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Mind Masters Edu Center
        </span>
        <p
          className="font-extrabold uppercase mb-8 text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Empowering the next generation of global innovators through radical
          education.
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-[#fcdf46] transition-colors"
            aria-label="Share"
          >
            <span className="material-symbols-outlined text-xl">share</span>
          </a>
          <a
            href="#"
            className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-[#fcdf46] transition-colors"
            aria-label="Email"
          >
            <span className="material-symbols-outlined text-xl">mail</span>
          </a>
          <a
            href="#"
            className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-[#fcdf46] transition-colors"
            aria-label="Instagram"
          >
            <span className="material-symbols-outlined text-xl">
              photo_camera
            </span>
          </a>
        </div>
      </div>

      {/* Links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 font-extrabold uppercase">
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section} className="flex flex-col gap-3">
            <span
              className="font-black text-base md:text-lg mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {section}
            </span>
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="opacity-90 hover:skew-x-2 hover:text-[#005f28] transition-all text-sm"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        {/* Copyright */}
        <div className="col-span-2 md:col-span-1 mt-4 md:mt-0 pt-6 md:pt-0 border-t-2 md:border-t-0 border-black/20">
          <p
            className="text-xs font-bold leading-relaxed"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            © 2024 Mind Masters Edu Center.
            <br />
            All Rights Reserved.
          </p>
          <p
            className="text-xs font-bold mt-2 text-black/60"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Transforming education, one student at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}
