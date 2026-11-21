import type { Metadata } from "next";
import { Montserrat, Lato, Catamaran, VT323, Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const catamaran = Catamaran({
  variable: "--font-catamaran",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arthur Roberto | Desenvolvimento web",
  description:
    "Projetos de Arthur Roberto: interfaces com React e TypeScript, APIs e experimentos em segurança. Código, estudos e contato.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geist.variable} ${montserrat.variable} ${lato.variable} ${catamaran.variable} ${vt323.variable} h-full antialiased [--background:#09060F] [--foreground:#ededed]
        [scroll-behavior:smooth] [cursor:url("/cursor/Pointer.cur"),_default]
        [&_body]:[background:var(--background)] [&_body]:[color:var(--foreground)] [&_body]:[font-family:var(--font-catamaran),_sans-serif] [&_body]:[cursor:url("/cursor/Pointer.cur"),_default]
        [&_.cursor-default]:[cursor:url("/cursor/Pointer.cur"),_default]
        [&_.cursor-auto]:[cursor:url("/cursor/Pointer.cur"),_default]
        [&_a]:[cursor:url("/cursor/Link.cur"),_pointer]!
        [&_button]:[cursor:url("/cursor/Link.cur"),_pointer]!
        [&_[role="button"]]:[cursor:url("/cursor/Link.cur"),_pointer]!
        [&_input[type="submit"]]:[cursor:url("/cursor/Link.cur"),_pointer]!
        [&_input[type="button"]]:[cursor:url("/cursor/Link.cur"),_pointer]!
        [&_label[for]]:[cursor:url("/cursor/Link.cur"),_pointer]!
        [&_select]:[cursor:url("/cursor/Link.cur"),_pointer]!
        [&_summary]:[cursor:url("/cursor/Link.cur"),_pointer]!
        [&_.cursor-pointer]:[cursor:url("/cursor/Link.cur"),_pointer]!
        [&_a[target="_blank"]]:[cursor:url("/cursor/Link.cur"),_pointer]!
        [&_a[rel*="external"]]:[cursor:url("/cursor/Link.cur"),_pointer]!
        [&_a[href^="http"]:not([href*="localhost"])]:[cursor:url("/cursor/Link.cur"),_pointer]!
        [&_.cursor-external]:[cursor:url("/cursor/Link.cur"),_pointer]!
        [&_.cursor-wait]:[cursor:url("/cursor/Busy.cur"),_url("/cursor/Busy.ani"),_wait]!
        [&_[aria-busy="true"]]:[cursor:url("/cursor/Busy.cur"),_url("/cursor/Busy.ani"),_wait]!
        [&.is-loading]:[cursor:url("/cursor/Busy.cur"),_url("/cursor/Busy.ani"),_wait]!
        [&.is-loading_*]:[cursor:url("/cursor/Busy.cur"),_url("/cursor/Busy.ani"),_wait]!
        [&_.cursor-progress]:[cursor:url("/cursor/Work.cur"),_url("/cursor/Work.ani"),_progress]!
        [&_.is-working]:[cursor:url("/cursor/Work.cur"),_url("/cursor/Work.ani"),_progress]!
        [&_.cursor-grab]:[cursor:url("/cursor/Pan.cur"),_grab]!
        [&_.cursor-grab_canvas]:[cursor:url("/cursor/Pan.cur"),_grab]!
        [&_.cursor-grabbing]:[cursor:url("/cursor/Grabbing.cur"),_grabbing]!
        [&_.cursor-grabbing_canvas]:[cursor:url("/cursor/Grabbing.cur"),_grabbing]!
        [&_.cursor-grab:active]:[cursor:url("/cursor/Grabbing.cur"),_grabbing]!
        [&_.cursor-grab:active_canvas]:[cursor:url("/cursor/Grabbing.cur"),_grabbing]!
        [&_.active\\:cursor-grabbing:active]:[cursor:url("/cursor/Grabbing.cur"),_grabbing]!
        [&_input[type="text"]]:[cursor:url("/cursor/Text.cur"),_text]!
        [&_input[type="email"]]:[cursor:url("/cursor/Text.cur"),_text]!
        [&_input[type="password"]]:[cursor:url("/cursor/Text.cur"),_text]!
        [&_input[type="search"]]:[cursor:url("/cursor/Text.cur"),_text]!
        [&_input[type="url"]]:[cursor:url("/cursor/Text.cur"),_text]!
        [&_input[type="tel"]]:[cursor:url("/cursor/Text.cur"),_text]!
        [&_input[type="number"]]:[cursor:url("/cursor/Text.cur"),_text]!
        [&_textarea]:[cursor:url("/cursor/Text.cur"),_text]!
        [&_[contenteditable="true"]]:[cursor:url("/cursor/Text.cur"),_text]!
        [&_.cursor-text]:[cursor:url("/cursor/Text.cur"),_text]!
        [&_:disabled]:[cursor:url("/cursor/Unavailable.cur"),_not-allowed]!
        [&_[disabled]]:[cursor:url("/cursor/Unavailable.cur"),_not-allowed]!
        [&_[aria-disabled="true"]]:[cursor:url("/cursor/Unavailable.cur"),_not-allowed]!
        [&_.cursor-not-allowed]:[cursor:url("/cursor/Unavailable.cur"),_not-allowed]!
        [&_.cursor-help]:[cursor:url("/cursor/Help.cur"),_help]!
        [&_abbr[title]]:[cursor:url("/cursor/Help.cur"),_help]!
        [&_.cursor-move]:[cursor:url("/cursor/Move.cur"),_move]!
        [&_.cursor-crosshair]:[cursor:url("/cursor/Cross.cur"),_crosshair]!
        [&_.cursor-zoom-in]:[cursor:url("/cursor/Zoom-in.cur"),_zoom-in]!
        [&_.cursor-zoom-out]:[cursor:url("/cursor/Zoom-out.cur"),_zoom-out]!
        [&_.cursor-pin]:[cursor:url("/cursor/Pin.cur"),_pointer]!
        [&_.cursor-person]:[cursor:url("/cursor/Person.cur"),_pointer]!
        [&_.cursor-ns-resize]:[cursor:url("/cursor/Vert.cur"),_ns-resize]!
        [&_.cursor-ew-resize]:[cursor:url("/cursor/Horz.cur"),_ew-resize]!
        [&_.cursor-nwse-resize]:[cursor:url("/cursor/Dgn1.cur"),_nwse-resize]!
        [&_.cursor-nesw-resize]:[cursor:url("/cursor/Dgn2.cur"),_nesw-resize]!
        [&_a:focus-visible]:[outline:2px_solid_#B9F503] [&_a:focus-visible]:[outline-offset:4px]
        [&_button:focus-visible]:[outline:2px_solid_#B9F503] [&_button:focus-visible]:[outline-offset:4px]
        [@media(prefers-reduced-motion:reduce)]:[scroll-behavior:auto]!
        [@media(prefers-reduced-motion:reduce)]:[&_*]:[animation-duration:0.01ms]! [@media(prefers-reduced-motion:reduce)]:[&_*]:[animation-iteration-count:1]! [@media(prefers-reduced-motion:reduce)]:[&_*]:[transition-duration:0.01ms]!
        [@media(prefers-reduced-motion:reduce)]:[&_*::before]:[animation-duration:0.01ms]! [@media(prefers-reduced-motion:reduce)]:[&_*::before]:[animation-iteration-count:1]! [@media(prefers-reduced-motion:reduce)]:[&_*::before]:[transition-duration:0.01ms]!
        [@media(prefers-reduced-motion:reduce)]:[&_*::after]:[animation-duration:0.01ms]! [@media(prefers-reduced-motion:reduce)]:[&_*::after]:[animation-iteration-count:1]! [@media(prefers-reduced-motion:reduce)]:[&_*::after]:[transition-duration:0.01ms]!
      `}
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
