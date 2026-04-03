type HeroSectionProps = {
  title: string;
  subtitle: string;
};

const HeroSection = ({ title, subtitle }: HeroSectionProps) => {
  return (
    <section className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-6 text-white shadow-md sm:px-7 sm:py-9">
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">Katalog Produk</p>
      <h1 className="mt-2 text-2xl font-bold leading-tight sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-blue-50 sm:text-base">{subtitle}</p>
    </section>
  );
};

export default HeroSection;
