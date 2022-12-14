import Head from "next/head";

import { DashboardContent } from "./components";

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Smart Evolution - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <DashboardContent />
    </div>
  );
}
