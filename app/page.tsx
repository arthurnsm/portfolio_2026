"use client";

import WireframeGlobe from "@/components/WireframeGlobe";
import PortfolioContent from "@/components/PortfolioContent";
import DecodedText from "@/components/DecodedText";
import Navbar from "@/components/navbar";
import { BsGithub } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa";
import Socialmedia from "@/components/socialmedia";
import Stack from "@/components/stack";
import { portfolio } from "@/data/portfolio";

export default function Home() {
  return (
    <div className={`min-h-screen w-full bg-[var(--background)] text-zinc-100 flex flex-col font-body selection:bg-[#5C29EA] selection:text-white overflow-x-hidden relative
        [&_.portfolio-content]:[--signal:#B9F503] [&_.portfolio-content]:[--card-radius:8px] [&_.portfolio-content]:[--page-gutter:20px] [&_.portfolio-content]:[--line:#272133] [&_.portfolio-content]:[position:relative] [&_.portfolio-content]:[z-index:20] [&_.portfolio-content]:[background:#09060F]
        [&_.content-width]:[width:100%] [&_.content-width]:[max-width:none] [&_.content-width]:[padding-inline:var(--page-gutter)]
        [&_.portfolio-section]:[padding-block:80px] [&_.portfolio-section]:[border-top:0] [&_.portfolio-section]:[scroll-margin-top:100px] [&_.portfolio-section]:[position:relative]
        [&_.system-label]:[font-family:var(--font-vt323),_monospace] [&_.system-label]:[font-weight:400] [&_.system-label]:[font-size:17px] [&_.system-label]:[line-height:1.25] [&_.system-label]:[letter-spacing:0.04em] [&_.system-label]:[color:#a1a1aa]
        [&_.tech-list]:[font-family:var(--font-vt323),_monospace] [&_.tech-list]:[font-weight:400] [&_.tech-list]:[display:flex] [&_.tech-list]:[flex-wrap:wrap] [&_.tech-list]:[gap:8px] [&_.tech-list]:[color:#b4bdb4] [&_.tech-list]:[font-size:15px]
        [&_.timeline-period]:[font-family:var(--font-vt323),_monospace] [&_.timeline-period]:[font-weight:400] [&_.timeline-period]:[color:#82a487] [&_.timeline-period]:[font-size:16px] [&_.timeline-period]:[width:100%]
        [&_.demo-note]:[font-family:var(--font-vt323),_monospace] [&_.demo-note]:[font-weight:400] [&_.demo-note]:[font-size:15px] [&_.demo-note]:[line-height:1.5] [&_.demo-note]:[color:#8c9a8c]
        [&_.copy-status]:[font-family:var(--font-vt323),_monospace] [&_.copy-status]:[font-weight:400] [&_.copy-status]:[font-size:15px] [&_.copy-status]:[color:#8ea491] [&_.copy-status]:[margin-top:9px] [&_.copy-status]:[min-height:23px]
        [&_.neon]:[color:var(--signal)]
        [&_.system-label.neon]:[color:var(--signal)]
        [&_.status-led]:[display:inline-block] [&_.status-led]:[flex-shrink:0] [&_.status-led]:[width:6px] [&_.status-led]:[height:6px] [&_.status-led]:[background:var(--signal)]
        [&_.section-index]:[display:inline-flex] [&_.section-index]:[justify-content:center] [&_.section-index]:[align-items:center] [&_.section-index]:[min-width:29px] [&_.section-index]:[height:25px] [&_.section-index]:[margin-right:10px] [&_.section-index]:[color:var(--signal)]
        [&_.section-heading]:[max-width:760px]
        [&_.section-title]:[font-size:clamp(1.75rem,_3.4vw,_3rem)] [&_.section-title]:[line-height:1.16] [&_.section-title]:[letter-spacing:-0.035em] [&_.section-title]:[margin-top:22px] [&_.section-title]:[font-family:var(--font-montserrat),_sans-serif] [&_.section-title]:[font-weight:700] [&_.section-title]:[color:#f4f4f5]
        [&_.section-description]:[color:#a1a1aa] [&_.section-description]:[font-size:18px] [&_.section-description]:[line-height:1.6] [&_.section-description]:[max-width:600px] [&_.section-description]:[margin-top:20px]
        [&_.section-heading-row]:[display:flex] [&_.section-heading-row]:[align-items:flex-start] [&_.section-heading-row]:[justify-content:space-between] [&_.section-heading-row]:[gap:30px]
        [&_.section-side-note]:[text-align:right] [&_.section-side-note]:[padding-top:4px] [&_.section-side-note]:[line-height:1.6] [&_.section-side-note]:[white-space:nowrap]
        [&_.section-workstation]:[background:#09060F]
        [&_.workstation-grid]:[display:grid] [&_.workstation-grid]:[grid-template-columns:1fr_1fr] [&_.workstation-grid]:[align-items:center] [&_.workstation-grid]:[gap:72px] [&_.workstation-grid]:[grid-template-areas:"model_copy"]
        [&_.about-intro]:[font-size:22px] [&_.about-intro]:[line-height:1.4] [&_.about-intro]:[margin-block:28px_18px] [&_.about-intro]:[color:#e4e4e7]
        [&_.body-copy]:[margin-block:13px] [&_.body-copy]:[color:#a1a1aa] [&_.body-copy]:[font-size:17px] [&_.body-copy]:[line-height:1.7]
        [&_.monitor-stage]:[height:clamp(380px,_36vw,_650px)] [&_.monitor-stage]:[position:relative]
        [&_.text-link]:[display:inline-flex] [&_.text-link]:[align-items:center] [&_.text-link]:[gap:9px] [&_.text-link]:[min-height:44px] [&_.text-link]:[color:#e4e4e7] [&_.text-link]:[font-family:var(--font-lato),_sans-serif] [&_.text-link]:[font-size:14px] [&_.text-link]:[transition:color_0.18s] [&_.text-link]:[text-align:left]
        [&_.text-link_svg]:[flex-shrink:0] [&_.text-link_svg]:[transition:transform_0.18s]
        [&_.text-link:hover]:[color:var(--signal)]
        [&_.text-link:focus-visible]:[color:var(--signal)]
        [&_.text-link:hover_svg]:[transform:translate(2px,_-2px)]
        [&_.project-toolbar]:[display:flex] [&_.project-toolbar]:[justify-content:space-between] [&_.project-toolbar]:[align-items:center] [&_.project-toolbar]:[flex-wrap:wrap] [&_.project-toolbar]:[gap:16px] [&_.project-toolbar]:[margin-block:32px_26px] [&_.project-toolbar]:[padding-bottom:18px]
        [&_.project-filters]:[display:flex] [&_.project-filters]:[flex-wrap:wrap] [&_.project-filters]:[gap:5px]
        [&_.project-filters_button]:[min-height:44px] [&_.project-filters_button]:[padding:10px_15px] [&_.project-filters_button]:[color:#a1a1aa] [&_.project-filters_button]:[font-family:var(--font-lato),_sans-serif] [&_.project-filters_button]:[font-size:14px] [&_.project-filters_button]:[border-radius:0] [&_.project-filters_button]:[border-bottom:1px_solid_transparent] [&_.project-filters_button]:[transition:background_0.2s,_color_0.2s,]
        [&_.project-filters_button[aria-pressed="true"]]:[color:var(--signal)] [&_.project-filters_button[aria-pressed="true"]]:[background:transparent]
        [&_.project-filters_button:hover]:[color:var(--signal)] [&_.project-filters_button:hover]:[border-color:#352849]
        [&_.project-grid]:[display:grid] [&_.project-grid]:[grid-template-columns:repeat(3,_1fr)] [&_.project-grid]:[gap:24px]
        [&_.project-card]:[display:flex] [&_.project-card]:[flex-direction:column] [&_.project-card]:[border-radius:var(--card-radius)] [&_.project-card]:[overflow:hidden] [&_.project-card]:[border:1px_solid_var(--line)] [&_.project-card]:[background:#0e100f] [&_.project-card]:[min-width:0] [&_.project-card]:[transition:border-color_0.2s,_transform_0.2s] [&_.project-card]:[animation:file-open_0.3s_ease-out_both]
        [&_.project-card:hover]:[border-color:#352849] [&_.project-card:hover]:[transform:translateY(-3px)]
        [&_.project-card:focus-within]:[border-color:#352849] [&_.project-card:focus-within]:[transform:translateY(-3px)]
        [&_.project-open]:[position:relative] [&_.project-open]:[display:block] [&_.project-open]:[width:100%] [&_.project-open]:[text-align:left] [&_.project-open]:[overflow:hidden]
        [&_.project-visual]:[height:270px] [&_.project-visual]:[position:relative] [&_.project-visual]:[overflow:hidden] [&_.project-visual]:[background:#0c100d]
        [&_.visual-open-label]:[display:flex] [&_.visual-open-label]:[align-items:center] [&_.visual-open-label]:[justify-content:space-between] [&_.visual-open-label]:[position:absolute] [&_.visual-open-label]:[left:0] [&_.visual-open-label]:[right:0] [&_.visual-open-label]:[bottom:0] [&_.visual-open-label]:[background:var(--signal)] [&_.visual-open-label]:[color:#071008] [&_.visual-open-label]:[padding:10px_16px] [&_.visual-open-label]:[font-family:var(--font-vt323),_monospace] [&_.visual-open-label]:[font-size:17px] [&_.visual-open-label]:[transform:translateY(100%)] [&_.visual-open-label]:[transition:transform_0.2s]
        [&_.project-open:hover_.visual-open-label]:[transform:translateY(0)]
        [&_.project-open:focus-visible_.visual-open-label]:[transform:translateY(0)]
        [&_.project-capture-frame]:[position:absolute] [&_.project-capture-frame]:[inset:0_0_36px] [&_.project-capture-frame]:[overflow:hidden] [&_.project-capture-frame]:[background:#e8d0b5]
        [&_.project-capture]:[object-fit:contain] [&_.project-capture]:[object-position:center] [&_.project-capture]:[transition:transform_0.45s_cubic-bezier(0.2,_0.65,_0.3,_1)]
        [&_.project-card:hover_.project-capture]:[transform:scale(1.025)]
        [&_.preview-caption]:[position:absolute] [&_.preview-caption]:[inset:auto_0_0] [&_.preview-caption]:[padding:8px_18px] [&_.preview-caption]:[color:#a6b3a8] [&_.preview-caption]:[background:#0c100df2] [&_.preview-caption]:[font-family:var(--font-vt323),_monospace] [&_.preview-caption]:[font-size:15px] [&_.preview-caption]:[line-height:1.3]
        [&_.source-preview]:[padding:50px_18px_44px] [&_.source-preview]:[display:flex] [&_.source-preview]:[align-items:center] [&_.source-preview]:[min-height:100%]
        [&_.source-filename]:[position:absolute] [&_.source-filename]:[inset:15px_18px_auto] [&_.source-filename]:[color:#89998d] [&_.source-filename]:[font-family:var(--font-vt323),_monospace] [&_.source-filename]:[font-size:16px] [&_.source-filename]:[overflow-wrap:anywhere]
        [&_.source-preview_pre]:[width:100%] [&_.source-preview_pre]:[white-space:pre-wrap] [&_.source-preview_pre]:[overflow-wrap:anywhere] [&_.source-preview_pre]:[font-family:ui-monospace,_SFMono-Regular,_Consolas,_monospace] [&_.source-preview_pre]:[font-size:12px] [&_.source-preview_pre]:[line-height:1.8] [&_.source-preview_pre]:[color:#c2d0c5]
        [&_.source-line]:[display:grid] [&_.source-line]:[grid-template-columns:20px_minmax(0,_1fr)] [&_.source-line]:[gap:12px]
        [&_.source-line_i]:[color:#526558] [&_.source-line_i]:[font-style:normal] [&_.source-line_i]:[user-select:none]
        [&_.source-line_code]:[font:inherit]
        [&_.source-line:first-child_code]:[color:#a0d7ad]
        [&_.project-note]:[border-left:1px_solid_#352849] [&_.project-note]:[padding-left:12px]
        [&_.project-card-content_>_.project-note]:[color:#c4cfc7] [&_.project-card-content_>_.project-note]:[font-size:14px] [&_.project-card-content_>_.project-note]:[line-height:1.5] [&_.project-card-content_>_.project-note]:[margin-block:0_22px]
        [&_.profile-interests]:[display:flex] [&_.profile-interests]:[flex-wrap:wrap] [&_.profile-interests]:[gap:8px_0] [&_.profile-interests]:[margin-top:25px] [&_.profile-interests]:[padding-top:18px] [&_.profile-interests]:[color:#a6b7aa] [&_.profile-interests]:[font-family:var(--font-vt323),_monospace] [&_.profile-interests]:[font-size:17px]
        [&_.profile-interests_li_+_li::before]:[content:"/"] [&_.profile-interests_li_+_li::before]:[color:#55715d] [&_.profile-interests_li_+_li::before]:[margin-inline:12px]
        [&_.project-card-content]:[flex:1] [&_.project-card-content]:[padding:24px] [&_.project-card-content]:[display:flex] [&_.project-card-content]:[flex-direction:column]
        [&_.project-card-content_h3]:[font-family:var(--font-montserrat),_sans-serif] [&_.project-card-content_h3]:[font-size:21px] [&_.project-card-content_h3]:[line-height:1.25] [&_.project-card-content_h3]:[font-weight:700] [&_.project-card-content_h3]:[margin-top:13px]
        [&_.project-card-content_>_p:not(.system-label):not(.project-note)]:[color:#a1a1aa] [&_.project-card-content_>_p:not(.system-label):not(.project-note)]:[font-size:16px] [&_.project-card-content_>_p:not(.system-label):not(.project-note)]:[line-height:1.6] [&_.project-card-content_>_p:not(.system-label):not(.project-note)]:[margin-block:16px_20px]
        [&_.tech-list_span]:[padding:2px_0]
        [&_.tech-list_span_+_span::before]:[content:"·"] [&_.tech-list_span_+_span::before]:[margin-right:8px] [&_.tech-list_span_+_span::before]:[color:#52765c]
        [&_.project-card-content_>_.text-link]:[margin-top:auto] [&_.project-card-content_>_.text-link]:[padding-top:20px]
        [&_.section-footnote]:[display:flex] [&_.section-footnote]:[align-items:center] [&_.section-footnote]:[flex-wrap:wrap] [&_.section-footnote]:[gap:16px_30px] [&_.section-footnote]:[padding-top:26px]
        [&_.section-footnote_>_p]:[color:#898f89] [&_.section-footnote_>_p]:[font-size:14px] [&_.section-footnote_>_p]:[max-width:420px] [&_.section-footnote_>_p]:[line-height:1.5]
        [&_.section-footnote_.text-link]:[margin-left:auto]
        [&_.experience-grid]:[display:grid] [&_.experience-grid]:[grid-template-columns:0.9fr_1.1fr] [&_.experience-grid]:[gap:90px]
        [&_.timeline-entry]:[padding-left:25px] [&_.timeline-entry]:[position:relative] [&_.timeline-entry]:[border-left:1px_solid_#352849]
        [&_.timeline-entry_summary]:[display:flex] [&_.timeline-entry_summary]:[flex-wrap:wrap] [&_.timeline-entry_summary]:[gap:8px] [&_.timeline-entry_summary]:[padding-block:20px] [&_.timeline-entry_summary]:[cursor:pointer] [&_.timeline-entry_summary]:[list-style:none]
        [&_.timeline-entry_summary::-webkit-details-marker]:[display:none]
        [&_.timeline-node]:[width:7px] [&_.timeline-node]:[height:7px] [&_.timeline-node]:[border:1px_solid_#352849] [&_.timeline-node]:[background:#09060F] [&_.timeline-node]:[position:absolute] [&_.timeline-node]:[top:27px] [&_.timeline-node]:[left:-4px] [&_.timeline-node]:[transition:background_0.2s] [&_.timeline-node]:[border-radius:50%]
        [&_.timeline-entry[open]_.timeline-node]:[background:var(--signal)]
        [&_.timeline-title]:[font-family:var(--font-montserrat),_sans-serif] [&_.timeline-title]:[font-size:18px] [&_.timeline-title]:[font-weight:600] [&_.timeline-title]:[flex:1] [&_.timeline-title]:[line-height:1.45]
        [&_.timeline-title_small]:[display:block] [&_.timeline-title_small]:[font-family:var(--font-lato),_sans-serif] [&_.timeline-title_small]:[color:#a1a1aa] [&_.timeline-title_small]:[font-size:14px] [&_.timeline-title_small]:[font-weight:400] [&_.timeline-title_small]:[margin-top:6px]
        [&_.timeline-body]:[padding-bottom:24px] [&_.timeline-body]:[color:#a1a1aa] [&_.timeline-body]:[font-size:16px] [&_.timeline-body]:[line-height:1.65] [&_.timeline-body]:[animation:file-open_0.25s_ease-out]
        [&_.timeline-body_li]:[margin-top:10px] [&_.timeline-body_li]:[padding-left:18px] [&_.timeline-body_li]:[position:relative]
        [&_.timeline-body_li:before]:[content:"↳"] [&_.timeline-body_li:before]:[color:#82a487] [&_.timeline-body_li:before]:[position:absolute] [&_.timeline-body_li:before]:[left:0]
        [&_.details-minus]:[display:none]
        [&_details[open]_>_summary_.details-minus]:[display:block]
        [&_details[open]_>_summary_.details-plus]:[display:none]
        [&_.section-contact]:[border-top:0] [&_.section-contact]:[padding-top:80px]
        [&_.contact-inner]:[padding:0]
        [&_.contact-inner_>_.system-label]:[display:flex] [&_.contact-inner_>_.system-label]:[align-items:center] [&_.contact-inner_>_.system-label]:[gap:9px] [&_.contact-inner_>_.system-label]:[text-transform:uppercase]
        [&_.contact-inner_h2]:[font-family:var(--font-montserrat),_sans-serif] [&_.contact-inner_h2]:[font-size:clamp(1.9rem,_4.1vw,_3.6rem)] [&_.contact-inner_h2]:[font-weight:700] [&_.contact-inner_h2]:[max-width:1000px] [&_.contact-inner_h2]:[line-height:1.15] [&_.contact-inner_h2]:[letter-spacing:-0.03em] [&_.contact-inner_h2]:[margin-top:24px]
        [&_.terminal-cursor]:[color:var(--signal)] [&_.terminal-cursor]:[animation:terminal-caret_1.2s_steps(1,_end)_infinite]
        [&_.contact-description]:[color:#a4b0a5] [&_.contact-description]:[font-size:19px] [&_.contact-description]:[line-height:1.5] [&_.contact-description]:[max-width:660px] [&_.contact-description]:[margin-top:23px]
        [&_.contact-address]:[display:flex] [&_.contact-address]:[align-items:center] [&_.contact-address]:[justify-content:space-between] [&_.contact-address]:[gap:8px] [&_.contact-address]:[max-width:900px] [&_.contact-address]:[margin-top:34px] [&_.contact-address]:[padding-block:13px]
        [&_.contact-address_>_a]:[display:flex] [&_.contact-address_>_a]:[gap:12px] [&_.contact-address_>_a]:[align-items:center] [&_.contact-address_>_a]:[font-family:var(--font-vt323),_monospace] [&_.contact-address_>_a]:[font-size:clamp(1.35rem,_3.2vw,_2.75rem)] [&_.contact-address_>_a]:[color:var(--signal)] [&_.contact-address_>_a]:[overflow-wrap:anywhere] [&_.contact-address_>_a]:[line-height:1.15] [&_.contact-address_>_a]:[min-width:0]
        [&_.contact-address_>_a_svg]:[flex-shrink:0]
        [&_.icon-button]:[display:inline-flex] [&_.icon-button]:[flex-shrink:0] [&_.icon-button]:[align-items:center] [&_.icon-button]:[justify-content:center] [&_.icon-button]:[width:44px] [&_.icon-button]:[height:44px] [&_.icon-button]:[border-radius:50%] [&_.icon-button]:[border:0] [&_.icon-button]:[color:#bbcebe] [&_.icon-button]:[background:transparent] [&_.icon-button]:[transition:background_0.2s,_color_0.2s]
        [&_.icon-button:hover]:[background:#263e2b] [&_.icon-button:hover]:[color:var(--signal)]
        [&_.contact-links]:[display:flex] [&_.contact-links]:[flex-wrap:wrap] [&_.contact-links]:[gap:14px_28px] [&_.contact-links]:[margin-top:24px]
        [&_.contact-links_a]:[display:inline-flex] [&_.contact-links_a]:[align-items:center] [&_.contact-links_a]:[gap:8px] [&_.contact-links_a]:[color:#b7c6b9] [&_.contact-links_a]:[font-size:15px] [&_.contact-links_a]:[min-height:44px]
        [&_.contact-links_a:hover]:[color:var(--signal)]
        [&_.portfolio-footer]:[display:flex] [&_.portfolio-footer]:[align-items:center] [&_.portfolio-footer]:[flex-wrap:wrap] [&_.portfolio-footer]:[gap:16px_30px] [&_.portfolio-footer]:[justify-content:space-between] [&_.portfolio-footer]:[padding-block:30px] [&_.portfolio-footer]:[color:#8c958d] [&_.portfolio-footer]:[font-size:14px]
        [&_.footer-brand]:[font-family:var(--font-montserrat),_sans-serif] [&_.footer-brand]:[font-weight:700] [&_.footer-brand]:[font-size:20px] [&_.footer-brand]:[color:#d4d4d8] [&_.footer-brand]:[min-height:44px] [&_.footer-brand]:[display:flex] [&_.footer-brand]:[align-items:center]
        [&_.portfolio-footer_.system-label]:[font-size:14px]
        [&_.case-dialog]:[position:fixed] [&_.case-dialog]:[inset:0] [&_.case-dialog]:[margin:auto] [&_.case-dialog]:[width:min(850px,_calc(100%_-_28px))] [&_.case-dialog]:[max-height:88svh] [&_.case-dialog]:[background:#0d110e] [&_.case-dialog]:[color:#ededed] [&_.case-dialog]:[border:1px_solid_#352849] [&_.case-dialog]:[border-radius:var(--card-radius)] [&_.case-dialog]:[padding:0] [&_.case-dialog]:[overscroll-behavior:contain]
        [&_.case-dialog::backdrop]:[background:#000c] [&_.case-dialog::backdrop]:[backdrop-filter:blur(5px)]
        [&_body:has(.case-dialog[open])]:[overflow:hidden]
        [&_.dialog-top]:[display:flex] [&_.dialog-top]:[align-items:center] [&_.dialog-top]:[justify-content:space-between] [&_.dialog-top]:[gap:15px] [&_.dialog-top]:[position:sticky] [&_.dialog-top]:[top:0] [&_.dialog-top]:[background:#17201a] [&_.dialog-top]:[padding:10px_15px] [&_.dialog-top]:[z-index:2]
        [&_.dialog-top_.system-label]:[font-size:14px]
        [&_.dialog-content]:[padding:32px] [&_.dialog-content]:[display:flex] [&_.dialog-content]:[flex-direction:column] [&_.dialog-content]:[gap:22px]
        [&_.dialog-content_.project-visual]:[flex-shrink:0] [&_.dialog-content_.project-visual]:[height:auto] [&_.dialog-content_.project-visual]:[min-height:280px] [&_.dialog-content_.project-visual]:[border:1px_solid_#352849] [&_.dialog-content_.project-visual]:[border-radius:4px]
        [&_.dialog-content_.visual-image]:[aspect-ratio:1440_/_920] [&_.dialog-content_.visual-image]:[min-height:0]
        [&_.dialog-content_.source-preview]:[padding-block:60px]
        [&_.dialog-content_.source-preview_pre]:[font-size:14px]
        [&_.case-chapter_h3]:[font-family:var(--font-vt323),_monospace] [&_.case-chapter_h3]:[color:#83b48b] [&_.case-chapter_h3]:[font-size:19px]
        [&_.case-chapter_p]:[margin-top:8px] [&_.case-chapter_p]:[font-size:18px] [&_.case-chapter_p]:[line-height:1.7] [&_.case-chapter_p]:[color:#b0bdb2]
        [&_.reveal-enabled]:[opacity:0.75] [&_.reveal-enabled]:[transform:translateY(8px)] [&_.reveal-enabled]:[transition:opacity_0.22s_ease-out,_transform_0.22s_cubic-bezier(0.2,_0.65,_0.3,_1)]
        [&_.reveal-enabled[data-visible="true"]]:[opacity:1] [&_.reveal-enabled[data-visible="true"]]:[transform:none]
        [&_.hero-copy-enter]:[animation:text-register_0.2s_steps(8,_end)_both]
        [@media(max-width:1100px)]:[&_.workstation-grid]:[gap:40px]
        [@media(max-width:1100px)]:[&_.experience-grid]:[gap:40px]
        [@media(max-width:1100px)]:[&_.project-grid]:[grid-template-columns:repeat(2,_1fr)]
        [@media(max-width:1100px)]:[&_.contact-inner]:[padding:0]
        [@media(max-width:767px)]:[&_.portfolio-section]:[padding-block:58px]
        [@media(max-width:767px)]:[&_.workstation-grid]:[grid-template-columns:1fr] [@media(max-width:767px)]:[&_.workstation-grid]:[gap:32px] [@media(max-width:767px)]:[&_.workstation-grid]:[grid-template-areas:"copy"_"model"]
        [@media(max-width:767px)]:[&_.experience-grid]:[grid-template-columns:1fr] [@media(max-width:767px)]:[&_.experience-grid]:[gap:36px]
        [@media(max-width:767px)]:[&_.monitor-stage]:[height:auto] [@media(max-width:767px)]:[&_.monitor-stage]:[aspect-ratio:1] [@media(max-width:767px)]:[&_.monitor-stage]:[max-height:420px]
        [@media(max-width:767px)]:[&_.section-description]:[font-size:17px]
        [@media(max-width:767px)]:[&_.section-side-note]:[display:none]
        [@media(max-width:767px)]:[&_.section-heading-row]:[gap:18px]
        [@media(max-width:767px)]:[&_.section-heading-row_>_svg]:[display:none]
        [@media(max-width:767px)]:[&_.project-grid]:[grid-template-columns:1fr] [@media(max-width:767px)]:[&_.project-grid]:[gap:24px]
        [@media(max-width:767px)]:[&_.project-card-content]:[padding:22px]
        [@media(max-width:767px)]:[&_.project-card-content_h3]:[font-size:23px]
        [@media(max-width:767px)]:[&_.project-filters]:[gap:2px]
        [@media(max-width:767px)]:[&_.project-filters_button]:[padding-inline:10px] [@media(max-width:767px)]:[&_.project-filters_button]:[font-size:13px]
        [@media(max-width:767px)]:[&_.project-toolbar_>_.system-label]:[display:none]
        [@media(max-width:767px)]:[&_.section-footnote]:[gap:12px]
        [@media(max-width:767px)]:[&_.section-footnote_.text-link]:[margin-left:0]
        [@media(max-width:767px)]:[&_.section-contact]:[padding-top:58px]
        [@media(max-width:767px)]:[&_.contact-inner]:[padding:0]
        [@media(max-width:767px)]:[&_.contact-description]:[font-size:17px]
        [@media(max-width:767px)]:[&_.contact-address_>_a]:[gap:5px]
        [@media(max-width:767px)]:[&_.contact-address_>_a_svg]:[display:none]
        [@media(max-width:767px)]:[&_.contact-links]:[gap:8px_23px]
        [@media(max-width:767px)]:[&_.portfolio-footer]:[justify-content:flex-start] [@media(max-width:767px)]:[&_.portfolio-footer]:[gap:12px_24px]
        [@media(max-width:767px)]:[&_.portfolio-footer_>_.system-label]:[width:100%]
        [@media(max-width:767px)]:[&_.dialog-content]:[padding:24px_20px]
        [@media(max-width:380px)]:[&_.project-card-content]:[padding:18px]
        [@media(max-width:380px)]:[&_.contact-inner]:[padding-inline:0]
        [@media(hover:none)]:[&_.visual-open-label]:[transform:none] [@media(hover:none)]:[&_.visual-open-label]:[padding-block:6px] [@media(hover:none)]:[&_.visual-open-label]:[font-size:14px] [@media(hover:none)]:[&_.visual-open-label]:[background:#16351e] [@media(hover:none)]:[&_.visual-open-label]:[color:#b5dfbe] [@media(hover:none)]:[&_.visual-open-label]:[display:none]
        [@media(prefers-reduced-motion:reduce)]:[&_.reveal-enabled]:[opacity:1] [@media(prefers-reduced-motion:reduce)]:[&_.reveal-enabled]:[transform:none]
        [@media(prefers-reduced-motion:reduce)]:[&_.hero-copy-enter]:[clip-path:none]
        [@media(prefers-reduced-motion:reduce)]:[&_.terminal-cursor]:[animation:none]
        [@media(min-width:640px)]:[&_.portfolio-content]:[--page-gutter:40px]
        [@media(min-width:768px)]:[&_.portfolio-content]:[--page-gutter:48px]
        [@media(min-width:1024px)]:[&_.portfolio-content]:[--page-gutter:64px]
        [@media(min-width:1280px)]:[&_.portfolio-content]:[--page-gutter:144px]
        [&_.profile-copy]:[grid-area:copy] [&_.profile-copy]:[width:100%] [&_.profile-copy]:[max-width:700px] [&_.profile-copy]:[justify-self:end]
        [&_.workstation-model]:[grid-area:model] [&_.workstation-model]:[min-width:0]
        [&_.model-hint]:[font-family:var(--font-vt323),_monospace] [&_.model-hint]:[font-size:15px] [&_.model-hint]:[color:#717c74] [&_.model-hint]:[text-align:center] [&_.model-hint]:[margin-top:-16px]
        [&_.experience-demo]:[margin-top:22px]
        [&_.section-github]:[padding-block:55px]
        [&_.contact-area]:[max-width:none]
        [@media(max-width:767px)]:[&_.workstation-model]:[width:100%] [@media(max-width:767px)]:[&_.workstation-model]:[max-width:540px] [@media(max-width:767px)]:[&_.workstation-model]:[margin-inline:auto]
        [@media(max-width:767px)]:[&_.section-workstation]:[padding-top:28px]
        [@media(max-width:767px)]:[&_.section-github]:[padding-block:42px]
        [@media(prefers-reduced-motion:reduce)]:[&_.project-card:hover]:[transform:none]
        [@media(prefers-reduced-motion:reduce)]:[&_.project-card:focus-within]:[transform:none]
        [@media(max-width:767px)]:[&_.project-visual]:[height:250px]
        [@media(max-width:767px)]:[&_.source-preview_pre]:[font-size:11px]
        [@media(max-width:767px)]:[&_.source-line]:[gap:8px] [@media(max-width:767px)]:[&_.source-line]:[grid-template-columns:16px_minmax(0,_1fr)]
        [@media(max-width:767px)]:[&_.dialog-content_.source-preview_pre]:[font-size:11px]
        [@media(prefers-reduced-motion:reduce)]:[&_.project-card:hover_.project-capture]:[transform:none]
      `}>
      {/* Top Mask Overlay with Gradient */}
   

      {/* Floating Top Navigation Bar */}
      <div className="fixed top-[max(12px,env(safe-area-inset-top))] md:top-[20px] left-0 right-0 z-50 flex justify-center px-5 sm:px-10 md:px-12 lg:px-16 xl:px-[144px] pointer-events-none">
        <Navbar />
      </div>

      {/* Main Portfolio Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Hero Section - Full Screen with Balanced 3D Globe */}
        <section
          id="about"
          className="w-full min-h-svh flex flex-col lg:flex-row items-center justify-between px-5 sm:px-10 md:px-12 lg:px-16 xl:px-[144px] pt-28 pb-10 lg:py-0 relative overflow-hidden scroll-mt-24"
        >
          {/* Permanent Subtle Grid Background (Layered at z-0 so it is always 100% visible) */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div
              className="h-full w-full bg-[linear-gradient(to_right,rgba(92,41,234,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(92,41,234,0.16)_1px,transparent_1px)] bg-size-[44px_44px] opacity-30"
            />
            {/* Smooth Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_20%,#09060F_88%)]" />
          </div>

          {/* Subtle Matrix glow backdrop */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/5 h-4/5 bg-[#5C29EA]/5 rounded-full blur-3xl z-0 pointer-events-none" />

          {/* Left Column (Content) */}
          <div className="w-full lg:w-[62%] xl:w-[64%] flex flex-col items-start justify-center gap-6 sm:gap-7 z-20 py-0 pointer-events-auto lg:mt-20">
            <h1 className="text-[clamp(2.25rem,9vw,4.5rem)] lg:text-[clamp(3.5rem,5.8vw,7rem)] font-title font-bold tracking-tight text[#DBDBDB] leading-[1.06] ">
              <span className="block">
                <DecodedText text={portfolio.profile.name} />
              </span>
              <span className="bg-[#5C29EA] block w-fit max-w-full px-4 py-1.5 sm:px-5 sm:py-2 mt-3 rounded-sm">
                <span className="text-white text-[clamp(1.15rem,4.8vw,2.25rem)] lg:text-[clamp(1.5rem,2.8vw,3rem)] font-subtitle font-black tracking-tight block">
                  <DecodedText text={portfolio.profile.role} delay={160} />
                </span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl xl:text-[1.55rem] font-body text-[#DBDBDB] max-w-2xl xl:max-w-3xl leading-relaxed hero-copy-enter">
              Construo interfaces web modernas de alta fidelidade com React,
              Next.js e TypeScript, unindo precisão visual em UI/UX a
              arquiteturas robustas e performáticas.
            </p>

            <div className="flex w-full flex-col min-[420px]:flex-row flex-wrap items-stretch min-[420px]:items-center gap-3 sm:gap-5 pt-2 sm:pt-8 lg:pt-16 ">
              <a
                href="#contact"
                className="text-center px-6 py-4 sm:px-10 sm:py-4.5 rounded-xl bg-[#5C29EA] font-title border-4 hover:border-[#5C28EA] hover:text-[#DBDBDB] border-transparent font-bold text-base sm:text-lg lg:text-xl hover:bg-[#4920BC] transition-all cursor-pointer active:scale-95"
              >
                Entrar em Contato
              </a>
              <a
                href="#projects"
                className="justify-center px-6 py-4 sm:px-9 sm:py-4.5 rounded-xl  border-transparent bg-[#5C29EA]  hover:text-[#DBDBDB] font-bold hover:bg-[#4920BC] hover:border-[#5C28EA] border-4 font-title text-base sm:text-lg lg:text-xl transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                Ver meus Projetos
              </a>
            </div>

            <div className="flex w-full justify-center md:justify-start flex-row items-center gap-4 mt-3 ">
              <Socialmedia
                url={portfolio.profile.github}
                icon={BsGithub}
                label="GitHub"
              />
              <Socialmedia
                url={`mailto:${portfolio.profile.email}`}
                icon={BiLogoGmail}
                label="E-mail"
              />
              <Socialmedia
                url={portfolio.profile.linkedin}
                icon={FaLinkedinIn}
                label="LinkedIn"
              />
            </div>
          </div>

          {/* Right Column - 3D Globe anchored to right */}
          <div className="relative mt-4 w-full max-w-[420px] aspect-square lg:aspect-auto lg:mt-0 lg:max-w-none lg:absolute lg:right-[180px] xl:right-[200px] lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-[50%] lg:w-[860px] xl:w-[1260px] 2xl:w-[1560px] lg:h-[860px] xl:h-[1260px] 2xl:h-[1560px] flex-shrink-0 flex items-center justify-center pointer-events-auto z-10 group opacity-0 animate-globe-in [animation-delay:300ms]">
            <WireframeGlobe color="#5C29EA" />
          </div>
        </section>

        <PortfolioContent />
      </div>
    </div>
  );
}
