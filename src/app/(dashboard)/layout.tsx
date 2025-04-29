import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Upload", href: "/upload" },
  { label: "Timeline", href: "/timeline" },
  { label: "Audio", href: "/audio" },
  { label: "Subtitles", href: "/subtitles" },
  { label: "Overlay", href: "/overlay" },
  { label: "Preview", href: "/preview" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (<>
    <div className="flex min-h-screen">
       
        <aside className="w-70  bg-background  bg-blue-200 border-r p-6 space-y-6">
        <h2 className="text-4xl font-bold mb-8">Editor Panel</h2>
        <nav className="flex flex-col gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-2xl text-muted-foreground hover:text-primary transition font-medium"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-background bg-blue-100">{children}</main>
    </div>
    </>
  );
}
