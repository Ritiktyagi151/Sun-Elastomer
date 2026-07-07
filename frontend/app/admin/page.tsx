import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Admin Panel Dashboard",
  path: "/admin",
  description: "Secure, local-first administrative console for Sun Elastomers content management.",
  keywords: ["admin", "dashboard"],
});

export default function AdminPage() {
  return <AdminDashboard />;
}
