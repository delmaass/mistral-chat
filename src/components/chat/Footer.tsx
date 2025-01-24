export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-0 text-sm opacity-60 text-onbase-primary">
      <p>
        Made with ❤️ in 🇫🇷 by{" "}
        <a href="https://delmaass.com" className="font-semibold">
          Louis Delmas
        </a>{" "}
        using{" "}
        <a href="https://mistral.ai" className="font-semibold">
          Mistral AI
        </a>
        ’s APIs.
      </p>
      <p>Output can contain errors. Please check important answers. </p>
    </footer>
  );
}
