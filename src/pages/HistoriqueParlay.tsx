import DashboardLayout from "@/components/DashboardLayout";

const HistoriqueParlay = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-white text-4xl font-bold">HISTORIQUE PARLAY DU JOUR</h1>
          <p className="text-white text-sm">
            Consultez l'historique des paris combinés de winabet.ai
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HistoriqueParlay;
