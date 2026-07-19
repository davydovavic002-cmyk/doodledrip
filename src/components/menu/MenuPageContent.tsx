"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FilterChip, FilterChipGroup } from "@/components/ui/FilterChip";
import { FlavorPanel, MenuCard } from "@/components/menu/MenuCard";
import { MilkList } from "@/components/menu/MilkList";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menu";
import { useI18n } from "@/hooks/use-i18n";
import { cn } from "@/lib/utils";
import type { MenuCategory, MenuItem } from "@/types";

function itemsForCategory(category: MenuCategory): MenuItem[] {
  if (category === "all") return MENU_ITEMS;
  return MENU_ITEMS.filter((item) => item.category === category);
}

function showMilkList(category: MenuCategory): boolean {
  return category === "bar" || category === "seasonal";
}

/** Side detail panel only for Filter drinks (flavor radar). */
function showFlavorPanel(
  category: MenuCategory,
  item: MenuItem | null,
): boolean {
  if (!item?.flavor) return false;
  return category === "all" || category === "filter";
}

export function MenuPageContent(): React.JSX.Element {
  const { l, t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(
    MENU_ITEMS.find((i) => i.flavor) ?? null,
  );

  const filtered = itemsForCategory(activeCategory);
  const milkVisible = showMilkList(activeCategory);
  const detailVisible = showFlavorPanel(activeCategory, selectedItem);
  const hasSidebar = milkVisible || detailVisible;

  const handleCategory = (category: MenuCategory): void => {
    setActiveCategory(category);
    if (category === "filter" || category === "all") {
      const next = itemsForCategory(category).find((i) => i.flavor);
      setSelectedItem(next ?? null);
    } else {
      setSelectedItem(null);
    }
  };

  const handleSelect = (item: MenuItem): void => {
    if (!item.flavor) return;
    setSelectedItem(item);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:px-8">
      <FilterChipGroup label={t("a11y.menuFilter")} className="mb-6 sm:mb-10">
        {MENU_CATEGORIES.map((cat) => (
          <FilterChip
            key={cat.id}
            label={l(cat.label)}
            active={activeCategory === cat.id}
            onClick={() => handleCategory(cat.id)}
          />
        ))}
      </FilterChipGroup>

      <div
        className={cn(
          "grid gap-6 sm:gap-8",
          hasSidebar && "md:grid-cols-[1fr_minmax(240px,320px)] lg:grid-cols-3",
        )}
      >
        <div className={hasSidebar ? "lg:col-span-2" : undefined}>
          <LayoutGroup>
            <motion.div
              layout
              className={cn(
                "grid gap-3 sm:grid-cols-2 sm:gap-4",
                !hasSidebar && "lg:grid-cols-3",
              )}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((item, index) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    index={index}
                    isSelected={
                      Boolean(item.flavor) && selectedItem?.id === item.id
                    }
                    interactive={Boolean(item.flavor)}
                    onSelect={handleSelect}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>

        {hasSidebar ? (
          <div className="space-y-6 md:sticky md:top-24 md:self-start lg:col-span-1">
            {detailVisible ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedItem?.id ?? "empty"}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <FlavorPanel item={selectedItem} />
                </motion.div>
              </AnimatePresence>
            ) : null}

            {milkVisible ? <MilkList /> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
