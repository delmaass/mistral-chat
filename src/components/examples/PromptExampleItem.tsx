type Props = {
  prompt: string;
  onPress: (prompt: string) => Promise<unknown>;
};

export default function PromptExampleItem({ prompt, onPress }: Props) {
  return (
    <button
      className="max-w-[16rem] bg-brand-orange bg-opacity-20 px-4 py-2 rounded-sm"
      onClick={() => onPress(prompt)}
    >
      <p className="font-medium">{prompt} →</p>
    </button>
  );
}
