import { ClipboardList, Gift, GraduationCap, LineChart, ShieldCheck, Truck } from "lucide-react";

export const KPIS = [
  { id: "items", to: 500, suffix: "+", label: "Total In-Kind Items", tone: "text-success" },
  { id: "schools", to: 15, label: "Schools Reached", tone: "text-purple" },
  { id: "money", to: 0, prefix: "NPR ", label: "Monetary Received", tone: "text-ink-700" },
  { id: "util", to: 100, suffix: "%", label: "Utilization Rate", tone: "text-success" },
];

export const STEPS = [
  {
    icon: Gift,
    title: "Donor Contributes",
    text: "A supporter gives physical materials: books, laptops, stationery or uniforms. No cash is accepted.",
  },
  {
    icon: ClipboardList,
    title: "NepalWill Receives and Logs",
    text: "Every item is catalogued with donor, date and quantity, and the donor gets a receipt.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Check and Sorting",
    text: "Materials are inspected and sorted: books by reading level, electronics tested, supplies grouped.",
  },
  {
    icon: Truck,
    title: "Distribution to Schools",
    text: "Items go to partner schools by need, with delivery photos and a signed acknowledgment.",
  },
  {
    icon: GraduationCap,
    title: "Students Receive Resources",
    text: "Teachers confirm receipt and tell us how the resources are being used in class.",
  },
  {
    icon: LineChart,
    title: "Impact Tracking",
    text: "We follow learning outcomes, attendance and engagement, then publish the results here.",
  },
];

export const STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "delivered", label: "Delivered" },
  { id: "in_transit", label: "In transit" },
];

export const STATUS_BADGE = {
  delivered: { variant: "success", label: "Delivered" },
  in_transit: { variant: "warning", label: "In transit" },
};
