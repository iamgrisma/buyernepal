import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { slug } = useParams();
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">Category: {slug}</h1>
        <p className="text-muted-foreground mt-4">Category page coming soon...</p>
      </div>
    </div>
  );
}
