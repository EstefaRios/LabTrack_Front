"use client"

import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import WelcomeSection from "../../components/WelcomeSection"
import ProfileCard from "../../components/ProfileCard"
import { DNAParticles } from "../../components/DNAParticles"
import React, { useEffect, useState } from 'react';
import { getPerfil } from '../../api/paciente';
import type { Perfil } from '../../api/paciente';
import { getPersonaIdFromToken } from '../../api/client';

export default function PerfilPage() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);

  useEffect(() => {
    console.log('🔍 [DEBUG] Iniciando carga de perfil...');
    const token = localStorage.getItem('token');
    console.log('🔍 [DEBUG] Token en localStorage:', token ? 'Existe' : 'No existe');
    
    const personaId = getPersonaIdFromToken();
    console.log('🔍 [DEBUG] PersonaId obtenido:', personaId);
    
    if (personaId) {
      console.log('🔍 [DEBUG] Llamando a getPerfil con personaId:', personaId);
      getPerfil(personaId)
        .then((data) => {
          console.log('✅ [DEBUG] Datos del perfil recibidos:', data);
          setPerfil(data);
        })
        .catch((error) => {
          console.error('❌ [DEBUG] Error al obtener perfil:', error);
        });
    } else {
      console.warn('⚠️ [DEBUG] No se pudo obtener personaId del token');
    }
  }, []);

  const handleLogout = () => {
    console.log("Logging out...")
    // Add logout logic here
  }

  // Preparar datos del perfil para el componente ProfileCard
  const profileData = perfil ? {
    tipoIdentificacion: perfil.tipo || "",
    numeroIdentificacion: perfil.numero || "",
    nombresCompleto: perfil.nombreCompleto || "",
    fechaNacimiento: perfil.fechaNacimiento || "",
    sexoBiologico: perfil.sexo || "",
    direccionResidencia: perfil.direccion || "",
    numeroCelular: perfil.celular || "",
    correoElectronico: perfil.correo || "",
  } : undefined;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <DNAParticles />
      
      <Header />

      <div className="flex relative z-10">
        <Sidebar activeItem="profile" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl">
          <div className="space-y-6">
            <WelcomeSection />
            <ProfileCard profileData={profileData} />
          </div>
        </main>
      </div>
    </div>
  )
}