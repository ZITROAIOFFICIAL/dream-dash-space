import DashboardLayout from "@/components/DashboardLayout";

const Boutique = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Boutique</h1>
          <p className="text-muted-foreground mt-2">
            Découvrez nos produits et services
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Boutique;
