import ProdNavbar from './ui/ProdNavbar';
import Footer from './ui/Footer';

export default function ProductionLayout({ children }) {
  return (
    <div className="prod-layout">
      <ProdNavbar />
      <main className="prod-main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
