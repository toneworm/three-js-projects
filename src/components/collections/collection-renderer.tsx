import Base from "@/components/building/base";
import Cladding from "@/components/building/cladding";
import KneeBrace from "@/components/building/knee-brace";
import Plate from "@/components/building/plate";
import Plinth from "@/components/building/plinth";
import Post from "@/components/building/post";
import Rafter from "@/components/building/rafter";
import StaddleStone from "@/components/building/staddle-stone";
import Studding from "@/components/building/studding";
import type { Collection, CollectionItem, Vec3 } from "@/types/building";

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
    case "plinth": {
      const { id, type, position, rotation, ...config } = item;
      return <Plinth {...mesh} {...config} />;
    }
    case "knee-brace": {
      const { id, type, position, rotation, ...config } = item;
      return <KneeBrace {...mesh} {...config} />;
    }
    case "staddle-stone": {
      const { id, type, position, rotation, ...config } = item;
      return <StaddleStone {...mesh} {...config} />;
    }
    case "base": {
      const { id, type, position, rotation, ...config } = item;
      return <Base {...mesh} {...config} />;
    }
    case "cladding": {
      const { id, type, position, rotation, ...config } = item;
      return <Cladding {...mesh} {...config} />;
    }
    case "studding": {
      const { id, type, position, rotation, ...config } = item;
      return <Studding {...mesh} {...config} />;
    }
  }
}

export function CollectionRenderer({ collection }: { collection: Collection }) {
  if (process.env.NODE_ENV !== "production") {
    const ids = collection.components?.map((c) => c.id) ?? [];
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupes.length) {
      console.error(`[${collection.name}] duplicate component ids:`, [
        ...new Set(dupes),
      ]);
    }
  }

  return (
    <group>
      {collection.components?.map((item) => (
        <CollectionComponent key={item.id} {...item} />
      ))}
    </group>
  );
}
