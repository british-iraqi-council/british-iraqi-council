import { ContactDetailsProps } from "../types";

export default function ContactDetails({ items }: ContactDetailsProps) {
  return (
    <ul className="flex flex-col gap-4 rounded-3xl bg-ivory p-6 sm:p-10">
      {items.map((item) => (
        <li key={item.kind} className="text-base">
          {item.href ? <a href={item.href}>{item.text}</a> : item.text}
        </li>
      ))}
    </ul>
  );
}
