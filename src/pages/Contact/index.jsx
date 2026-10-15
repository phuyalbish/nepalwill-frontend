import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Contact() {
  useDocumentTitle("Contact");
  return (
    <section className="container-page py-16 md:py-24">
      <SectionHeading
        as="h1"
        eyebrow="NepalWill"
        title="Get In"
        accent="Touch."
        subtitle="Whether you want to volunteer, donate materials or partner with us, we'd love to hear from you."
      />
      <div className="mt-14 grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div className="min-w-0 lg:pt-4">
          <ContactInfo />
        </div>
        <div className="min-w-0">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
