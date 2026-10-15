import { useMemo, useRef, useState } from "react";
import Lightbox from "@/components/ui/Lightbox";
import GalleryTile from "./GalleryTile";
import { ratiosFor } from "./galleryUtils";

const PREFIX = "gallery";

/** Masonry (CSS columns) plus lightbox with focus return to the tile that opened it. */
export default function GalleryGrid({ items, allItems }) {
  const [index, setIndex] = useState(null);
  const tiles = useRef(new Map());
  const ratioById = useMemo(() => {
    const ratios = ratiosFor(allItems);
    return new Map(allItems.map((item, i) => [item.id ?? i, ratios[i]]));
  }, [allItems]);

  const slides = useMemo(
    () =>
      items.map((item, i) => ({
        id: item.id ?? i,
        src: item.image_url,
        alt: item.title,
        title: item.title,
      })),
    [items],
  );

  const close = () => {
    const current = slides[index];
    setIndex(null);
    // The Lightbox restores focus on unmount; Safari does not focus buttons on click,
    // so make sure the tile for the photo that was last shown takes focus afterwards.
    if (current) setTimeout(() => tiles.current.get(current.id)?.focus({ preventScroll: true }), 320);
  };

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item, i) => {
          const key = item.id ?? i;
          return (
            <GalleryTile
              key={key}
              ref={(node) => {
                if (node) tiles.current.set(key, node);
                else tiles.current.delete(key);
              }}
              item={item}
              index={i}
              ratio={ratioById.get(key)}
              prefix={PREFIX}
              onOpen={() => setIndex(i)}
            />
          );
        })}
      </div>
      <Lightbox
        items={slides}
        index={index}
        onClose={close}
        onIndexChange={setIndex}
        layoutIdPrefix={PREFIX}
      />
    </>
  );
}
