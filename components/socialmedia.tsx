import { IconType } from "react-icons";

interface SocialmediaProps {
  url: string;
  icon: IconType;
  label?: string;
  className?: string;
}

export default function Socialmedia({
  url,
  icon: Icon,
  label,
  className = "",
}: SocialmediaProps) {
  return (
    <a
      href={url || "#"}
      target={url ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={label || "Link de rede social"}
      title={label}
      className={`inline-flex items-center justify-center p-3 sm:p-4 border-0 bg-transparent text-zinc-400 rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:text-[#00e038] active:translate-y-0 cursor-pointer ${className}`}
    >
      <Icon size={56} className="w-7 h-7 sm:w-14 sm:h-14" />
    </a>
  );
}
