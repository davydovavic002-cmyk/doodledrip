import { AppChrome } from "@/components/layout/AppChrome";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LocaleDocumentSync } from "@/components/layout/LocaleDocumentSync";
import { SkipToContent } from "@/components/layout/SkipToContent";

export interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps): React.JSX.Element {
  return (
    <AppChrome>
      <LocaleDocumentSync />
      <SkipToContent />
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </AppChrome>
  );
}
