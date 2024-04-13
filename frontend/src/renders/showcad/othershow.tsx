import { useEffect, useState } from "react";
import { liveStreams } from "../../services/dashboard-service";

interface Props {
  openAlert: (message: string, isDanger: boolean) => void;
}

export default function othershow({ openAlert }: Props) {
  const [streams, setStreams] = useState<
    {
      category: string;
      description: string;
      title: string;
      username: string;
      _id: string;
      tags: string[];
    }[]
  >([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await liveStreams("Other");
        if (result.length !== 0) {
          setStreams(result);
        } else {
          //do something is nobody is live
        }
      } catch (error) {
        openAlert("Error Occured: Please reload the page.", true);
      }
    };
    fetch();
  }, []);
  return (
    <div className="w-[82%] h-[92vh] absolute top-[8vh] left-[18%] flex justify-center items-center bg-[#0E0E10]">
      othershow
    </div>
  );
}
