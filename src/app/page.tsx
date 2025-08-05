import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
      <p className="text-lg text-gray-700 mb-6">
        This is a simple example page.
      </p>
      <Button>Click Me</Button>
      <Button variant="secondary">Secondary Action</Button>
    </div>
  );
}
