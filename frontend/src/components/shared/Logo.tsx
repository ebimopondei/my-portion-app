import { Link } from "react-router-dom"

interface LogoProps {
  variant?: 'default' | 'text-only' | 'mobile'
  className?: string
  linkTo?: string
}

const Logo = ({ variant = 'default', className = '', linkTo = '/' }: LogoProps) => {
  if (variant === 'text-only') {
    return (
      <Link to={linkTo} className={`flex items-center ${className}`}>
        <h1 className="text-2xl font-bold text-green-600">Portions</h1>
      </Link>
    )
  }

  if (variant === 'mobile') {
    return (
      <Link to={linkTo} className={`flex items-center space-x-2 ${className}`}>
        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <span className="text-xl font-semibold text-gray-900">Portion</span>
      </Link>
    )
  }

  return (
    <Link to={linkTo} className={`flex items-center ${className}`}>
      <img src="/logo.png" width={140} height={36} alt="portion-logo" />
    </Link>
  )
}

export default Logo 