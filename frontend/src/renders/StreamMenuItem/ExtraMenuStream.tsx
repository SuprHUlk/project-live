import CurrentStreamShow from "./EMS Folder/CurrentStreamShow";
import EmoteMenu from "./EMS Folder/EmoteMenu";
export default function ExtraMenuStream() {
  return (
    <>
      <div className="w-[25%] h-[92vh] bg-[#222225] ml-[0.5%]">
        <CurrentStreamShow />
        <EmoteMenu />
      </div>
    </>
  );
}
