"use client";

import { EllipsisVertical } from "lucide-react";

type DropdownMenuProps = {
  onClick?: () => void;
};

export default function DropdownMenu({
  onClick,
}: DropdownMenuProps) {
  return (
    <button
      className="icon-button"
      onClick={onClick}
      aria-label="More options"
    >
      <EllipsisVertical size={18} />
    </button>
  );
}