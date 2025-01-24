import Icon from "@/components/Icon";
import PromptExampleItem from "@/components/examples/PromptExampleItem";

const promptExamples = [
  {
    id: 1,
    prompt: "Explain quantum computing in simple terms",
  },
  { id: 2, prompt: "Got any creative ideas for a 10 years old’s birthday?" },
  { id: 3, prompt: "How do I make a HTTP request in Javascript?" },
];

type Props = {
  onPressItem: (prompt: string) => Promise<unknown>;
};

export default function Examples({ onPressItem }: Props) {
  return (
    <main className="gap-4 flex flex-1 flex-col items-center justify-center">
      <Icon />
      <h2 className="text-lg font-semibold">Examples</h2>
      <div className="flex flex-col gap-2">
        {promptExamples.map(({ id, prompt }) => (
          <PromptExampleItem key={id} prompt={prompt} onPress={onPressItem} />
        ))}
      </div>
    </main>
  );
}
