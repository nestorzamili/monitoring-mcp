import React from "react";

const PengawasanApip: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Pengawasan APIP</h2>
              <p className="text-gray-600">
                Welcome to your Pengawasan APIP. Here you can see an overview of
                your account and access your settings.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PengawasanApip;
