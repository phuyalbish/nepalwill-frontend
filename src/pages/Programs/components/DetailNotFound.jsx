import { SearchX } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

/** Friendly 404 panel for a slug that does not exist. Shared by the program and event detail pages. */
export default function DetailNotFound({ title, description, backTo, backLabel }) {
  return (
    <div className="container-page py-20 md:py-28">
      <EmptyState
        icon={SearchX}
        title={title}
        description={description}
        action={
          <Button to={backTo} variant="dark">
            {backLabel}
          </Button>
        }
      />
    </div>
  );
}
