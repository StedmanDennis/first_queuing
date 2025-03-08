import TeamPitView from "@/components/TeamPitView";

export default function Home() {
  return (
    <div>
      <TeamPitView teams={[{teamNumber: 3981, highlightColor: '#ff0000'}]}></TeamPitView>
    </div>
  );
}
