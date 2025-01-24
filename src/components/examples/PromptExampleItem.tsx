type Props = {
  prompt: string;
};

export default function PromptExampleItem({ prompt }: Props) {
  return (
    <div className="max-w-[16rem] bg-brand-orange bg-opacity-20 px-4 py-2 rounded-sm">
      <p className="font-medium">{prompt} →</p>
    </div>
  );
}
