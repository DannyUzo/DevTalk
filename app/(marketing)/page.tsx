import { Heroes } from "./_components/heroes";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col mt-20 items-center justify-center">
        <Heroes />
      </div>
      <Footer />
    </main>
  );
}
