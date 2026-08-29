import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ButtonMotion from "@/components/ButtonMotion";
import Preloader from "@/components/Preloader";
import WorkCaseTransition from "@/components/work/WorkCaseTransition";
import PreviewBanner from "@/components/admin/PreviewBanner";

/**
 * Public site chrome. Split out of the root layout so `/admin` renders without
 * the marketing header, footer and page-reveal animations.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PreviewBanner />
      <Preloader />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <ButtonMotion />
      <WorkCaseTransition />
    </>
  );
}
