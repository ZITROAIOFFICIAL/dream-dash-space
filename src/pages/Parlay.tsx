import DashboardLayout from "@/components/DashboardLayout";

const Parlay = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parlay</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos paris combinés
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Parlay;
