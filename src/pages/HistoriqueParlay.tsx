import DashboardLayout from "@/components/DashboardLayout";

const HistoriqueParlay = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Historique Parlay du jour</h1>
          <p className="text-muted-foreground mt-2">
            Consultez l'historique de vos paris combinés
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HistoriqueParlay;
