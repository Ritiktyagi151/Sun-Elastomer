import Link from "next/link";

export type SidebarLink = {
  href: string;
  label: string;
};

export function Sidebar({ title, links }: { title: string; links: SidebarLink[] }) {
  return (
    <aside className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
      <nav className="mt-4 grid gap-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm font-bold text-muted hover:bg-peach hover:text-crimson">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
