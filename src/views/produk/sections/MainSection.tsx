import Link from "next/link";

type MainSectionProps = {
  items: Array<{ id: number; name: string }>;
};

const MainSection = ({ items }: MainSectionProps) => {
  return (
    <main className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Daftar Produk</h2>
        <p className="text-sm text-slate-500">Pilih produk untuk lihat detail</p>
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <p className="text-lg font-bold text-slate-800">{item.name}</p>
            <p className="mt-1 text-sm text-slate-500">Kategori umum</p>
            <Link
              href={`/produk/${item.id}`}
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Lihat Detail
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default MainSection;
