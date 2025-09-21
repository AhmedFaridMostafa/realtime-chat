"use client";

import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";
import { useSearch } from "@/contexts/SearchContext";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const { searchQuery, handleSearchChange } = useSearch();

  return (
    <form {...props} onSubmit={(e) => e.preventDefault()}>
      <SidebarGroup className="py-2">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search the friends..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
