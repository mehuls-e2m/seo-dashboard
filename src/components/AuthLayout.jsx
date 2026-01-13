export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-primary-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/dark-logo-leadgear.png"
              alt="LEADGEAR"
              className="h-20 w-auto"
            />
          </div>
          {title && <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>}
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>

        <div className="bg-[#2a2a2a] rounded-xl p-8 border border-gray-800 shadow-lg">
          {children}
        </div>
      </div>
    </div>
  )
}


