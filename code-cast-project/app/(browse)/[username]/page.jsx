import { notFound } from "next/navigation";
import { getUserByUsername } from "@/lib/user-services";
import LiveKitStream from "@/components/livekitStream";
import { isFollowingUser } from "@/lib/follow-service";
import { Actions } from "./_components/actions";

const UserPage = async ({ params }) => {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);

  return (
    <>
      <div className="bg-gray-900 min-h-screen flex justify-center"> {/* Center only horizontally */}
        <div className="flex flex-col items-center mt-8"> {/* Center the stream */}
          <LiveKitStream
            room={user?.username + "'s stream"}
            isLive={user.stream.isLive} // Pass the isLive status of the stream
            style={{ width: '800px', height: '450px' }}
          />
          {/* Actions Component placed directly below the stream, left-aligned */}
          <div className="self-start mt-4 w-full" style={{ maxWidth: '800px' }}> {/* Constrain width and align left */}
            <Actions userId={user.id} isFollowing={isFollowing}/>
          </div>
        </div>
      </div>
    </>
  );
};


export default UserPage;
