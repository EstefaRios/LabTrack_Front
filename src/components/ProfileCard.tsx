"use client"

interface ProfileData {
  tipoIdentificacion: string
  numeroIdentificacion: string
  nombresCompleto: string
  fechaNacimiento: string
  sexoBiologico: string
  direccionResidencia: string
  numeroCelular: string
  correoElectronico: string
}

interface ProfileCardProps {
  profileData?: ProfileData
}

export default function ProfileCard({ profileData }: ProfileCardProps) {
  const formatDate = (s?: string) => {
    if (!s) return ""
    const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
    if (m) {
      const [_, y, mo, d] = m
      return `${d}/${mo}/${y}`
    }
    try {
      return new Date(s).toLocaleDateString()
    } catch {
      return s
    }
  }

  const defaultData: ProfileData = {
    tipoIdentificacion: "",
    numeroIdentificacion: "",
    nombresCompleto: "",
    fechaNacimiento: "",
    sexoBiologico: "",
    direccionResidencia: "",
    numeroCelular: "",
    correoElectronico: "",
  }

  const data = profileData || defaultData

  const profileFields = [
    {
      label: "TIPO DE IDENTIFICACIÓN",
      value: data.tipoIdentificacion,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      label: "NÚMERO DE IDENTIFICACIÓN",
      value: data.numeroIdentificacion,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
    },
    {
      label: "NOMBRES COMPLETO",
      value: data.nombresCompleto,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      label: "FECHA DE NACIMIENTO",
      value: formatDate(data.fechaNacimiento),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "SEXO BIOLÓGICO",
      value: data.sexoBiologico,
      icon: (
        <span className="w-5 h-5 flex items-center justify-center text-slate-500 text-lg font-medium">
          ⚥
        </span>
      ),
    },
    {
      label: "DIRECCIÓN DE RESIDENCIA",
      value: data.direccionResidencia,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      label: "NÚMERO DE CELULAR",
      value: data.numeroCelular,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    {
      label: "CORREO ELECTRÓNICO",
      value: data.correoElectronico,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-slate-100 rounded-lg">
          <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800">Información del Perfil</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profileFields.map((field, index) => (
          <div
            key={index}
            className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <div className="text-slate-600">{field.icon}</div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{field.label}</p>
                <p className="text-sm font-semibold text-slate-800 break-words">{field.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}