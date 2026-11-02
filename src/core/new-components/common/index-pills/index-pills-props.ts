export interface IndexItem {
  id: string;
  label: string;
}

export interface IndexPillsProps {
  items: readonly IndexItem[];
  title: string;
  locale: string;
}
