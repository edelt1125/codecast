import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
//import { Thumbnail } from "@/components/thumbnail";

export const ResultBanner = ({ data }) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="flex gap-x-4 border rounded w-fit">
        <img src={data.user.imageUrl} width={150} height={100}/>
        <div className="space-y-1 mx-4 my-6">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer text-white hover:text-blue-500">
              {data.user.username}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(data.updatedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

