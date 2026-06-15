import type { SVGProps } from "react";

type SocialBrand = "linkedin" | "twitter" | "whatsapp";

type SocialBrandIconProps = SVGProps<SVGSVGElement> & {
  brand: SocialBrand;
  size?: number;
};

const brandLabels: Record<SocialBrand, string> = {
  linkedin: "LinkedIn",
  twitter: "Twitter",
  whatsapp: "WhatsApp",
};

export function SocialBrandIcon({ brand, size = 20, ...props }: SocialBrandIconProps) {
  const label = brandLabels[brand];

  if (brand === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} role="img" aria-label={label} {...props}>
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.47v6.28ZM5.32 7.42a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.03H3.54V8.98H7.1v11.47ZM22.23 0H1.76C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.76 24h20.47c.97 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0Z"
        />
      </svg>
    );
  }

  if (brand === "twitter") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} role="img" aria-label={label} {...props}>
        <path
          fill="currentColor"
          d="M23.95 4.57a9.83 9.83 0 0 1-2.83.78 4.93 4.93 0 0 0 2.16-2.72 9.86 9.86 0 0 1-3.13 1.2 4.92 4.92 0 0 0-8.39 4.49A13.97 13.97 0 0 1 1.64 3.18a4.92 4.92 0 0 0 1.52 6.57 4.9 4.9 0 0 1-2.23-.62v.06a4.93 4.93 0 0 0 3.95 4.83 4.94 4.94 0 0 1-2.22.08 4.93 4.93 0 0 0 4.6 3.42A9.88 9.88 0 0 1 0 19.54a13.94 13.94 0 0 0 7.55 2.21c9.06 0 14.01-7.5 14.01-14.01l-.02-.64a10 10 0 0 0 2.46-2.55l-.05.02Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} role="img" aria-label={label} {...props}>
      <path
        fill="currentColor"
        d="M12.04 0C5.4 0 .01 5.38.01 12.02c0 2.12.56 4.19 1.62 6.01L0 24l6.12-1.6a12 12 0 0 0 5.91 1.5h.01c6.63 0 12.02-5.38 12.02-12.02C24.06 5.38 18.67 0 12.04 0Zm7.08 17.18c-.3.84-1.75 1.61-2.45 1.71-.63.09-1.43.13-2.31-.15-.53-.17-1.21-.39-2.09-.77-3.67-1.58-6.06-5.25-6.25-5.5-.18-.24-1.49-1.99-1.49-3.79s.94-2.69 1.28-3.06c.33-.36.73-.46.98-.46h.7c.22.01.53-.08.83.63.3.72 1.03 2.52 1.12 2.71.09.18.15.4.03.64-.12.25-.18.4-.36.61-.18.21-.38.47-.55.63-.18.18-.37.37-.16.73.21.36.93 1.54 2 2.49 1.37 1.22 2.53 1.6 2.89 1.78.36.18.58.15.79-.09.21-.25.91-1.06 1.15-1.42.24-.36.49-.3.83-.18.33.12 2.13 1 2.49 1.18.36.18.61.27.7.42.09.15.09.87-.21 1.71Z"
      />
    </svg>
  );
}
