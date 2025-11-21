"use client"

import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import OrdenesTable from "../../components/OrdenesTable"
import { DNAParticles } from "../../components/DNAParticles"

export default function HomePage() {
  const handleLogout = () => {
    console.log("Logging out...")
    // Add logout logic here
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <DNAParticles />
      
      <Header />

      <div className="flex relative z-10">
        <Sidebar activeItem="home" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl lg:ml-0">
          <OrdenesTable />
        </main>
      </div>
    </div>
  )
}