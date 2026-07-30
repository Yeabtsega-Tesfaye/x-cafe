"use client";

type TabsProps = {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
};

export default function Tabs({
  tabs,
  active,
  onChange,
}: TabsProps) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`tab ${
            active === tab ? "active" : ""
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}