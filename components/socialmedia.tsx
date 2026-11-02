import { IconType } from 'react-icons';

interface SocialmediaProps {
  url: string;
  icon: IconType;
  label?: string;
  className?: string;
}

export default function Socialmedia({ url, icon: Icon, label, className = "" }: SocialmediaProps) {
  return (
    <a
      href={url || "#"}
      target={url ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={label || "Link de rede social"}
      title={label}
      className={`inline-flex items-center justify-center p-3.5 sm:p-4 border-2 border-[#262626] bg-zinc-900/40 text-[#6C6A6A] rounded-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#00e038] hover:text-[#00e038] active:translate-y-0 cursor-pointer ${className}`}
    >
      <Icon size={56} className="w-12 h-12 sm:w-14 sm:h-14" />
    </a>
  );
}