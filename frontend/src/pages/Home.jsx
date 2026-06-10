import { Link } from "react-router-dom";
import { ShoppingCart, Shield, Zap, ArrowRight, Star, Package, TrendingUp } from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    title: "Easy Shopping",
    desc: "Intuitive interface with smooth navigation and quick checkout flow.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    desc: "All transactions are protected. Your data and privacy matter to us.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized performance with instant load times and seamless updates.",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50K+", label: "Products" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9★", label: "Rating" },
];

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Star size={14} fill="currentColor" />
            Trusted by thousands
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6 animate-fade-in-up">
            Modern
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent px-2">
              E-Commerce
            </span>
            for Everyone
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Cartly is your modern shopping platform. Browse products, manage orders,
            and experience e-commerce reimagined for speed and simplicity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Link
              to="/auth/register"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-hover shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-card-border text-foreground font-medium hover:bg-secondary transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="relative px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-card-border rounded-2xl overflow-hidden border border-card-border">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card px-6 py-8 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="relative px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Powerful tools for buyers and sellers, all in one platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group relative bg-card border border-card-border rounded-2xl p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── For Sellers ─── */}
      <section className="relative px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-card-border rounded-3xl p-8 sm:p-12 lg:p-16">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium mb-5">
                <TrendingUp size={14} />
                Seller Program
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Start selling today
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                List your products, manage inventory, track orders — all from a
                powerful dashboard designed for growth.
              </p>
              <Link
                to="/auth/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 transition-all duration-300 shadow-lg"
              >
                Become a Seller
                <Package size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact / Footer ─── */}
      <footer className="relative px-4 pb-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="border-t border-card-border pt-10">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <ShoppingCart size={15} />
              </div>
              <span className="text-lg font-bold text-foreground">Cartly</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              &copy; {new Date().getFullYear()} Cartly. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <a href="mailto:support@cartly.com" className="hover:text-foreground transition-colors">
                support@cartly.com
              </a>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <a href="tel:+1234567890" className="hover:text-foreground transition-colors">
                +1 234 567 890
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
