import { TriangleAlert } from "lucide-react";

export default function NoCashBanner() {
  return (
    <aside
      aria-labelledby="no-cash-title"
      className="mx-auto flex max-w-3xl items-start gap-4 rounded-card border border-amber-200 bg-amber-50 p-5 md:p-6"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-chip bg-amber-100 text-amber-600">
        <TriangleAlert className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <h2 id="no-cash-title" className="font-bold text-amber-900">
          Important: We Do Not Promote Monetary Donations.
        </h2>
        <p className="mt-1 text-sm leading-6 text-amber-800/90">
          NepalWill exclusively accepts in-kind contributions: books, school supplies, laptops and
          infrastructure support. We do not solicit or encourage cash donations, so every item can be
          tracked from donor to student.
        </p>
      </div>
    </aside>
  );
}
