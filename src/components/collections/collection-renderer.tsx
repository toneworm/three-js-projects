// components/collections/collection-renderer.tsx
import type { Collection, CollectionItem, Vec3 } from "@/types/building";
import Post from "@/components/building/post";
import Plate from "@/components/building/plate";
import Rafter from "@/components/building/rafter";

function CollectionComponent(item: CollectionItem) {
  const mesh = {
    position: item.position,
    rotation: item.rotation ?? ([0, 0, 0] as Vec3),
  };

  switch (item.type) {
    case "post": {
      const { id, type, position, rotation, ...config } = item;
      return <Post {...mesh} {...config} />;
    }
    case "plate": {
      const { id, type, position, rotation, ...config } = item;
      return <Plate {...mesh} {...config} />;
    }
    case "rafter": {
      const { id, type, position, rotation, ...config } = item;
      return <Rafter {...mesh} {...config} />;
    }
  }
}

export function CollectionRenderer({ collection }: { collection: Collection }) {
  return (
    <group>
      {collection.components.map((item) => (
        <CollectionComponent key={item.id} {...item} />
      ))}
    </group>
  );
}
