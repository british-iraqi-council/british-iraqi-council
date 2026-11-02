import { SectionProps } from "./section-props";

export default function Section({ children, id, className }: SectionProps) {
  return (
    <section id={id} className={className}>
      <div className="shell">{children}</div>
    </section>
  );
}
