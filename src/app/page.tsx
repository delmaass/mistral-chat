import Footer from "@/components/chat/Footer";
import InputForm from "@/components/chat/InputForm";
import Examples from "@/components/examples/Examples";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col justify-center min-h-screen py-4 gap-4">
      <Examples />

      <InputForm />

      <Footer />
    </div>
  );
}
