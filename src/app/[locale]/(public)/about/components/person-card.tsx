import Image from "next/image";
import { ExternalLink, UserRound } from "lucide-react";
import { RichText } from "@/core/new-components/common";
import { localize } from "@/lib/localize";
import { PersonCardProps } from "../types";

export default function PersonCard({
  person,
  locale,
  profileLabel,
}: PersonCardProps) {
  return (
    <li className="group card-lift flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <div className="relative aspect-[4/5] overflow-hidden bg-line">
        {person.photo ? (
          <Image
            src={person.photo}
            alt=""
            fill
            sizes="(min-width: 80rem) 20vw, (min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 90vw"
            data-reveal-zoom
            className="object-cover duration-700 ease-out-quint motion-safe:transition-[scale] motion-safe:group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-muted">
            <UserRound
              aria-hidden="true"
              focusable="false"
              strokeWidth={1.25}
              className="size-1/3"
            />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5 p-5 lg:p-6">
        <h3 className="font-display text-title font-semibold text-ink hyphens-auto [overflow-wrap:anywhere]">
          <RichText text={localize(person.name, locale)} locale={locale} />
        </h3>
        <p className="font-medium text-blue">
          <RichText text={localize(person.role, locale)} locale={locale} />
        </p>
        {person.organisation ? (
          <p className="text-muted">
            <RichText
              text={localize(person.organisation, locale)}
              locale={locale}
            />
          </p>
        ) : null}
        {person.url ? (
          <a
            href={person.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue underline underline-offset-4 hover:text-blue-deep"
          >
            {profileLabel}
            <ExternalLink
              aria-hidden="true"
              focusable="false"
              className="size-4"
            />
          </a>
        ) : null}
      </div>
    </li>
  );
}
